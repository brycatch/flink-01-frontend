import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStockExchange } from '../../intefaces/stock-exchange.interface';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private limit: number;
  private skip: number;
  private stockSubscription: Subscription;
  public stockExchanges: IStockExchange[];

  constructor(
    private service: WelcomeService
  ) {
    this.limit = 5;
    this.skip = 0;
    this.stockExchanges = [];
  }

  ngOnInit() {
    this.getStockList();
  }

  ngOnDestroy() {
    if (this.stockSubscription) {
      this.stockSubscription.unsubscribe();
    }
  }

  private getStockList(clear = false) {
    this.stockExchanges = clear ? [] : this.stockExchanges;
    this.stockSubscription =
      this
        .service
        .stockList(this.limit, this.skip)
        .subscribe((res: { err: boolean, code: number, data: { length: number, stockExchanges: IStockExchange[] } }) => {
          this.stockExchanges.push(...res.data.stockExchanges);
        });
  }


  public setPaginationItems($event: any): void {
    this.limit = Number($event.target.value) || 8;
    this.skip = 0;
    this.getStockList(true);
  }

}
