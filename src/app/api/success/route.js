import { NextResponse } from "next/server";
export async function POST(req, res) {
  // database operations
  // b2b 3rd party secure call
  // success log
  return NextResponse.redirect(new URL("/success", req.url), 303);
}