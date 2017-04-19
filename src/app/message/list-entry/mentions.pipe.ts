import { Pipe, PipeTransform } from '@angular/core';

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
  transform(text: string, mentions: any[]): string {
    console.log(mentions, text);
    return text;
  }
}
