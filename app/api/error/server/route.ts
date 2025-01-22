import { BaseResponse } from "@/shared/api/types";
import { NextResponse } from "next/server";

export async function POST() {
  const errorResponse: BaseResponse<null> = {
    code: "500",
    message: "Internal Server Error: Something went wrong on the server.",
    data: null,
  };

  return NextResponse.json(errorResponse, { status: 500 });
}
