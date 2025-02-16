
import { Pipe, PipeTransform } from '@angular/core';
import { GuidPipe } from './guid.pipe';
import { CurrencyPipe } from './currency.pipe';

@Pipe({
  name: 'dynamic',
  standalone: true
})
export class DynamicPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe, private guidpipe: GuidPipe) {}
  transform(value: string | null | undefined, pipeName: string | null, ...args: any[]): any {
    console.log(pipeName)
    switch (pipeName) {
      case 'currency':
        return this.currencyPipe.transform(value);
      case 'guid':
        return this.guidpipe.transform(value);
      default:
        return value;
    }
  }

}
