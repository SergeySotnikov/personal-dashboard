import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss'],
})
export class EditBookmarkComponent implements OnInit {
  bookmark: Bookmark = new Bookmark('', '');

  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.bookmark = this.bookmarkService.getBookmark(id);
    });
  }

  onFormSubmit(form: NgForm) {
    this.bookmarkService.updateBookmark(this.bookmark.id, form.value);
    this.notificationService.show('Bookmark updated!');
  }
  onDeleteBookmark() {
    this.bookmarkService.deleteBookmark(this.bookmark.id);
    this.router.navigate(['../'], { relativeTo: this.route });
    this.notificationService.show('Bookmark deleted!');
  }
}
