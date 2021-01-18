import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreateService } from './create.service';
import { IStockExchange } from '../../intefaces/stock-exchange.interface';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  public id: string;
  public loading: boolean;
  private stockExchange: IStockExchange;
  private getSubscription: Subscription;
  private createSubscription: Subscription;

  constructor(
    public service: CreateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loading = this.id !== null;
  }

  ngOnInit(): void {
    if (this.loading) {
      this.getStock();
    }
  }

  ngOnDestroy(): void {
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
  }

  private getStock() {
    this.getSubscription = this.service
      .get(this.id)
      .subscribe((res: { err: boolean, code: number, data: { stock_exchange: IStockExchange } }) => {
        this.loading = false;
        if (res.code === 200) {
          this.service.initForms(res.data.stock_exchange);
        }
      });
  }

  public create(): void {
    if (this.service.form.valid) {
      this.stockExchange = {
        name: this.service.name.value,
        description: this.service.description.value,
        symbol: this.service.symbol.value,
        market_values: this.service.marketValues,
        created: new Date()
      };
      this.createSubscription = this.service
        .create(this.stockExchange)
        .subscribe((res: { err: boolean, code: number, data: { stock_exchange: IStockExchange } }) => {
          if (res.code === 201) {
            this.router.navigateByUrl('/');
          }
        });
    }
  }
  public update(): void {
    if (this.service.form.valid) {
      const stockExchange: Partial<IStockExchange> = {
        name: this.service.name.value,
        description: this.service.description.value,
        market_values: this.service.marketValues,
      };
      this.createSubscription = this.service
        .patch(this.id, stockExchange)
        .subscribe((res: { err: boolean, code: number, data: { stock_exchange: IStockExchange } }) => {
          if (res.code === 200) {
            this.router.navigateByUrl('/');
          }
        });
    }
  }
}
