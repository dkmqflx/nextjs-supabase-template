import { userResponse } from "@/entities/prefetch/api/types";
import { BaseResponse } from "@/shared/api/types";
import { NextResponse } from "next/server";

export async function POST() {
  const errorResponse: BaseResponse<userResponse[]> = {
    code: "400",
    message: "Bad Request: Invalid request body or missing data.",
    data: [],
  };

  return NextResponse.json(errorResponse, { status: 400 });
}
