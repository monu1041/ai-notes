"use server";

import { handleError } from "@/lib/utils";
import {
  createLocalNote,
  deleteLocalNote,
  getLocalNotes,
  updateLocalNote,
} from "@/lib/local-notes";

import openai from "@/lib/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const createNoteAction = async (noteId: string) => {
  try {
    createLocalNote(noteId);
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    updateLocalNote(noteId, text);
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteNoteAction = async (noteId: string) => {
  try {
    deleteLocalNote(noteId);
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const askAIAboutNotesAction = async (
  question: string,
) => {
  const notes = getLocalNotes();

  if (notes.length === 0) {
    return "You don't have any notes yet.";
  }

  const formattedNotes = notes
    .map(
      (note) => `
Text:
${note.text}
`,
    )
    .join("\n\n");

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `
You answer questions only using the user's notes.

Return clean HTML only.

Never use markdown.

User Notes:

${formattedNotes}
`,
    },
    {
      role: "user",
      content: question,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "qwen2.5:7b",
    messages,
  });

  return completion.choices[0].message.content ?? "No response";
};