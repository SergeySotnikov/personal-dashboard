import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements OnDestroy {
  bookmarks: Bookmark[] = [];
  bookmark: Bookmark = new Bookmark('', '');
  storageListenSub: Subscription = new Subscription();

  constructor() {
    this.loadStateLocalStorage();

    this.storageListenSub = fromEvent(window, 'storage').subscribe(
      (event: any) => {
        if (event.key === 'bookmarks') {
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
    this.saveStateLocalStorage();
  }

  updateBookmark(id: any, updatedFields: Partial<Bookmark>) {
    let bookmark = this.getBookmark(id);
    Object.assign(bookmark, updatedFields);
    this.saveStateLocalStorage();
  }

  deleteBookmark(id: string | undefined) {
    const bookmarkIndex = this.bookmarks.findIndex(
      (bookmark) => bookmark.id === id
    );
    if (bookmarkIndex === -1) {
      return;
    }
    this.bookmarks.splice(bookmarkIndex, 1);
    this.saveStateLocalStorage();
  }

  //save and load data from localStorage

  saveStateLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadStateLocalStorage() {
    try {
      const bookmarksInLocalStorage = JSON.parse(
        localStorage.getItem('bookmarks') || `[]`
      );
      this.bookmarks.length = 0;
      this.bookmarks.push(...bookmarksInLocalStorage);
    } catch (error) {
      console.log('There was an error retrieving the notes from localStorage');
      console.log(error);
    }
  }
}
