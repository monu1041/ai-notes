import { getLatestLocalNoteId } from "@/lib/local-notes";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    newestNoteId: getLatestLocalNoteId(),
  });
}