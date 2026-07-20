export type LocalNote = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
};

type LocalNotesGlobal = typeof globalThis & {
  __localNotesStore?: LocalNote[];
};

const getStore = (): LocalNote[] => {
  const globalWithStore = globalThis as LocalNotesGlobal;

  if (!globalWithStore.__localNotesStore) {
    globalWithStore.__localNotesStore = [];
  }

  return globalWithStore.__localNotesStore;
};

export const createLocalNote = (noteId: string) => {
  const store = getStore();
  const now = new Date().toISOString();
  const note: LocalNote = {
    id: noteId,
    text: "",
    createdAt: now,
    updatedAt: now,
    authorId: "local-user",
  };

  store.unshift(note);
  return note;
};

export const getLocalNote = (noteId: string) => {
  return getStore().find((note) => note.id === noteId) ?? null;
};

export const getLocalNotes = () => {
  return [...getStore()].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
};

export const updateLocalNote = (noteId: string, text: string) => {
  const store = getStore();
  const existingNote = store.find((note) => note.id === noteId);

  if (existingNote) {
    existingNote.text = text;
    existingNote.updatedAt = new Date().toISOString();
    return existingNote;
  }

  return createLocalNote(noteId);
};

export const deleteLocalNote = (noteId: string) => {
  const store = getStore();
  const index = store.findIndex((note) => note.id === noteId);

  if (index >= 0) {
    store.splice(index, 1);
  }
};

export const getLatestLocalNoteId = () => {
  return getLocalNotes()[0]?.id ?? null;
};
