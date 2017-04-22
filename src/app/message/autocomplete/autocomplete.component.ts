import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: [
    './autocomplete.component.styl'
  ]
})

export class AutocompleteComponent implements OnChanges {
  @Input() query: string = '';

  @Output() public select: EventEmitter<any> = new EventEmitter<any>();

  opened: boolean;
  loading: boolean;
  users: any[];
  selectedIndex: number = 0;

  constructor(public messageService: MessageService) {}

  ngOnChanges() {
    if (this.query) {
      this.opened = true;
      this.loading = true;
      this.messageService.autocomplete(this.query)
        .map(res => res.json())
        .subscribe(res => {
          this.users = res;
          this.loading = false;

          if (res) {
            this.opened = true;
          }
        });
    } else {
      this.opened = false;
      this.loading = false;
      this.users = [];
    }
  }

  submit(index = -1) {
    if (!this.users) {
      return;
    }

    if (index > -1 ) {
      this.selectedIndex = index;
    }

    const selectedUser = this.users[this.selectedIndex];
    this.select.emit(this.users[this.selectedIndex]);
    this.close();
  }

  public isOpened(): boolean {
    return this.opened && this.users.length > 0;
  }

  public open() {
    this.opened = true;
  }

  public close() {
    this.opened = false;
  }

  public moveUp() {
    if (!this.users) {
      return;
    }

    const temp = --this.selectedIndex;
    this.selectedIndex = temp === -1 ? this.users.length - 1 : temp;
  }

  public moveDown() {
    if (!this.users) {
      return;
    }

    this.selectedIndex = ++this.selectedIndex % this.users.length;
  }

  public keyEvents(evt) {
    if (!this.users) {
      return;
    }

    const charCode = evt.which || evt.keyCode;

    if (charCode === 13 || charCode === 9) { // Enter or Tab
      evt.preventDefault();
      this.submit();
    } else
    if (charCode === 38) { // UP
      evt.preventDefault();
      this.moveUp();
    } else
    if (charCode === 40) { // DOWN
      evt.preventDefault();
      this.moveDown();
    } else
    if (charCode === 27) { // ESC
      evt.preventDefault();
      this.close();
    }
  }
}
