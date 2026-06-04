import { NextResponse } from "next/server";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export function apiSuccess<T>(data: T, message?: string, status = 200) {
  const body: ApiResponse<T> = { success: true, data };
  if (message) body.message = message;
  return NextResponse.json(body, { status });
}

export function apiError(error: string, status = 400) {
  const body: ApiResponse<never> = { success: false, error };
  return NextResponse.json(body, { status });
}
