import { createLocalNote } from "@/lib/local-notes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("noteId") || crypto.randomUUID();
  const note = createLocalNote(noteId);

  return NextResponse.json({
    noteId: note.id,
  });
}