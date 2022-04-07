import { v4 as uuidv4 } from 'uuid';

export class Bookmark {
  id: string;
  constructor(public name: string, public url: string) {
    this.id = uuidv4();
  }
}
