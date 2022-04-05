import { v4 as uuidv4 } from 'uuid';
export class Note {
  constructor(public id: string, public title: string, public content: string) {
    this.id = uuidv4();
  }
}
