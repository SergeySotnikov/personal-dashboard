import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-bookmark-tile',
  templateUrl: './bookmark-tile.component.html',
  styleUrls: ['./bookmark-tile.component.scss'],
})
export class BookmarkTileComponent implements OnInit {
  @Input('bookmark') bookmark: Bookmark = new Bookmark('', '');
  titleIconSrc: string = '';

  faviconError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.titleIconSrc = this.bookmark.url + '/favicon.ico';
  }
}
