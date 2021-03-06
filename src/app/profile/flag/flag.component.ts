import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Country } from '../country';

/**
 * Component for displaying a user's flag
 */
@Component({
  selector: 'flag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img *ngIf="countryCode"
      [title]="country(countryCode)"
      srcset="
        /assets/img/flags/16/{{ countryCode.toLowerCase() }}.png 1x,
        /assets/img/flags/32/{{ countryCode.toLowerCase() }}.png 2x
      "
      src="/assets/img/flags/16/{{ countryCode.toLowerCase() }}.png"
    >
  `
})
export class FlagComponent {

  @Input() countryCode: string;

  /**
   * Gets country name by code
   * @param  {string} code Country code
   * @return {string}      Country name
   */
  country(code: string): string {
    return Country.list
      .filter(country => country.code === code)
      .map(res => res.name)
      .reduce(res => res);
  }
}
