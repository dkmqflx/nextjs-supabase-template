import { NextRequest, NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/shared/lib/supabaseServer';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET!;

export async function GET(req: NextRequest) {
  // ✅ Fix: Use `searchParams` instead of `req.query`
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  try {
    // 🔹 Step 1: Exchange the code for an access token
    const tokenRes = await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
      { method: 'POST' },
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(`/sign-in?error=failed_token`);
    }

    // 🔹 Step 2: Get user profile from Naver API
    const userRes = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userRes.json();
    if (!userData.response) {
      return NextResponse.json({ error: 'Failed to get user data' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    const { email, nickname } = userData.response;

    // 🔹 Step 3: Sign in or sign up in Supabase
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      return NextResponse.redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
    }

    // 🔹 Step 4: Update user metadata with nickname (display name)
    const { error: updateError } = await supabase.auth.updateUser({
      data: { display_name: nickname }, // ✅ Store nickname in metadata
    });

    if (updateError) {
      console.error('Failed to update user metadata:', updateError);
      return NextResponse.redirect(`/sign-in?error=${encodeURIComponent(updateError.message)}`);
    }

    return NextResponse.redirect(`${origin}`);
  } catch (error) {
    // return the user to an error page with instructions
    console.error('Naver OAuth Error:', error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
