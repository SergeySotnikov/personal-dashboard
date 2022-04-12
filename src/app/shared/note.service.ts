import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy {
  notes: Note[] = [];
  note: Note = new Note('', '');
  storageListenSub: Subscription = new Subscription();

  constructor() {
    this.loadStateLocalStorage();

    this.storageListenSub = fromEvent(window, 'storage').subscribe(
      (event: any) => {
        if (event.key === 'notes') {
          this.loadStateLocalStorage();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) {
      this.storageListenSub.unsubscribe();
    }
  }

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

    this.saveStateLocalStorage();
  }

  updateNote(id: any, updatedFields: Partial<Note>) {
    let note = this.getNote(id);
    Object.assign(note!, updatedFields);
    this.saveStateLocalStorage();
  }

  deleteNote(id: string | undefined) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return;
    }
    this.notes.splice(noteIndex, 1);
    this.saveStateLocalStorage();
  }
  //save and load data from localStorage

  saveStateLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadStateLocalStorage() {
    try {
      const notesInLocalStorage = JSON.parse(
        localStorage.getItem('notes') || `[]`
      );
      this.notes.length = 0;
      this.notes.push(...notesInLocalStorage);
    } catch (error) {
      console.log('There was an error retrieving the notes from localStorage');
      console.log(error);
    }
  }
}
