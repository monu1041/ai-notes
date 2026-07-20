"use server";

import { handleError } from "@/lib/utils";
import {
  createLocalNote,
  deleteLocalNote,
  getLocalNotes,
  updateLocalNote,
} from "@/lib/local-notes";

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

export const askAIAboutNotesAction = async () => {
  const notes = getLocalNotes();

  if (notes.length === 0) {
    return "You don't have any notes yet.";
  }

  return `You currently have ${notes.length} local note${notes.length === 1 ? "" : "s"}.`;
};