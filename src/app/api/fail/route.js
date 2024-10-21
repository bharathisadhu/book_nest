import { NextResponse } from "next/server";
export async function POST(req, res) {
  // database operations
  // b2b 3rd party secure call
  // fail log
  return NextResponse.redirect(new URL("/fail", req.url), 303);
}