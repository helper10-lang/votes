// app/api/voters/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../lib/connectdb";
import Voter from "../../model/voter";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || ""; // optional
  const voters = await Voter.findOne({
    voterName: new RegExp(name, "i"),
  });

  return NextResponse.json(voters);
}
