import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [];
  bookmark: Bookmark = new Bookmark('', '');

  constructor() {}

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string | null) {
    this.bookmarks.forEach((bookmark) => {
      if (bookmark.id === id) {
        this.bookmark = bookmark;
      }
    });
    return this.bookmark;
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
  }

  updateBookmark(id: any, updatedFields: Partial<Bookmark>) {
    let bookmark = this.getBookmark(id);
    Object.assign(bookmark, updatedFields);
  }

  deleteBookmark(id: string | undefined) {
    const bookmarkIndex = this.bookmarks.findIndex(
      (bookmark) => bookmark.id === id
    );
    if (bookmarkIndex === -1) {
      return;
    }
    this.bookmarks.splice(bookmarkIndex, 1);
  }
}
