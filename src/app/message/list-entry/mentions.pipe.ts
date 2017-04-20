import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'mention'})
export class MentionsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, mentions: any) {
    mentions.map(m => {
      text = text.replace(
        new RegExp('@' + m.name, 'g'),
        `<a style="text-decoration:none;font-weight:bold;color:#000;" href="/profile/${m._id}">@${m.name}</a>`
      );
    });

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
