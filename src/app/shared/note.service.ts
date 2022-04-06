import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[] = [];
  note: Note = new Note('', '');

  getNotes() {
    return this.notes;
  }

  getNote(id: string | null) {
    this.notes.forEach((note) => {
      if (note.id === id) {
        this.note = note;
      }
    });
    return this.note;
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(id: any, updatedFields: Partial<Note>) {
    let note = this.getNote(id);
    Object.assign(note!, updatedFields);
  }

  deleteNote(id: string | undefined) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return;
    }
    this.notes.splice(noteIndex, 1);
  }

  constructor() {}
}
