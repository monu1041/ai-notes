import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import { getLocalNote, getLatestLocalNoteId } from "@/lib/local-notes";
// import HomeToast from "@/components/HomeToast";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || getLatestLocalNoteId() || "";

  const note = noteId ? getLocalNote(noteId) : null;

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton />
        <NewNoteButton />
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />

      {/* <HomeToast /> */}
    </div>
  );
}

export default HomePage;