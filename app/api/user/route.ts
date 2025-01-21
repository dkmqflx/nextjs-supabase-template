import { userResponse } from "@/entities/prefetch/api/types";
import { BaseResponse } from "@/shared/api/types";
import { NextResponse } from "next/server";

export async function GET() {
  const useResponse: BaseResponse<userResponse[]> = {
    code: "200",
    message: "Request successful",
    data: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      {
        id: 3,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
    ],
  };

  return NextResponse.json(useResponse);
}
