import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest/rest.service';
import { IMarketValue, IStockExchange } from '../../intefaces/stock-exchange.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  public form: FormGroup;
  private symbolRegex: RegExp;
  public marketValues: IMarketValue[];

  constructor(
    private restService: RestService
  ) {
    this.symbolRegex = new RegExp(/^[A-Za-z\$\.]{1,6}$/);
    this.marketValues = [];
    this.initForms();
    this.createMarketValues();
  }

  public initForms(iStockExchange: IStockExchange = null): void {
    if (iStockExchange) {
      this.form = new FormGroup({
        name: new FormControl(iStockExchange.name, [Validators.required]),
        description: new FormControl(iStockExchange.description, [Validators.required]),
        symbol: new FormControl({ value: iStockExchange.symbol, disabled: true })
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        symbol: new FormControl('', [Validators.pattern(this.symbolRegex), Validators.required], [this.symbolIsTakenAsyncValidator()])
      });
    }
  }

  private symbolIsTakenAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const url = `stock-exchange/symbol/${control.value}/exist`;
      return this.restService.get(url).pipe(
        map((res: { data: { exist: boolean } }) => res.data.exist ? { symbolIsTaken: true } : null)
      );
    };
  }

  private createMarketValues(): void {
    for (let index = 0; index < 50; index++) {
      const marketValue: IMarketValue = {
        date: new Date(),
        value: Math.random() * 10000
      };
      this.marketValues.push(marketValue);
    }
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public get description(): AbstractControl {
    return this.form.get('description');
  }

  public get symbol(): AbstractControl {
    return this.form.get('symbol');
  }

  public get(id: string) {
    return this.restService.get(`stock-exchange/${id}`);
  }

  public create(stockExchange: IStockExchange) {
    const body = { stock_exchange: JSON.stringify(stockExchange) };
    return this.restService.post('stock-exchange/', body);
  }

  public patch(id: string, stockExchange: Partial<IStockExchange>) {
    const body = { stock_exchange: JSON.stringify(stockExchange) };
    return this.restService.patch(`stock-exchange/${id}`, body);
  }
}
