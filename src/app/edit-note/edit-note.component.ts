import { NoteService } from './../shared/note.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  showValidationErrors: boolean = false;
  note: Note | undefined = new Note('', '');

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.note = this.noteService.getNote(id);
    });
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      this.showValidationErrors = true;
      return;
    }
    this.noteService.updateNote(this.note?.id, form.value);
    this.router.navigateByUrl('notes');
  }

  onDeleteNote() {
    this.noteService.deleteNote(this.note?.id);
    this.router.navigateByUrl('notes');
  }
}
