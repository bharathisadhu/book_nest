import { NextResponse } from "next/server";
export async function POST(req, res) {
  // database operations
  // b2b 3rd party secure call
  // cancel log
  return NextResponse.redirect(new URL("/cancel", req.url), 303);
}