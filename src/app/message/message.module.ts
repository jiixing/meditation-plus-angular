import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { MessageComponent } from './message.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MessageListEntryComponent } from './list-entry/message-list-entry.component';
import { EmojiModule } from '../emoji';
import { ProfileModule } from '../profile';
import { MomentModule } from 'angular2-moment';
import { MentionsPipe } from './list-entry/mentions.pipe';

@NgModule({
  imports: [
    SharedModule,
    ProfileModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    EmojiModule,
    MomentModule
  ],
  declarations: [
    MessageComponent,
    MessageListEntryComponent,
    AutocompleteComponent,
    MentionsPipe
  ],
  exports: [
    MessageComponent,
    MessageListEntryComponent,
    AutocompleteComponent
  ]
})
export class MessageModule { }
