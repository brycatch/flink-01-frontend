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
  private listSubscription: Subscription;
  private deleteSubscription: Subscription;
  public stockExchanges: IStockExchange[];

  constructor(
    private service: WelcomeService
  ) {
    this.limit = 5;
    this.skip = 0;
    this.stockExchanges = [];
  }

  ngOnInit(): void {
    this.getStockList();
  }

  ngOnDestroy(): void {
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  private getStockList(clear = false) {
    this.stockExchanges = clear ? [] : this.stockExchanges;
    this.listSubscription =
      this
        .service
        .stockList(this.limit, this.skip)
        .subscribe((res: { err: boolean, code: number, data: { length: number, stockExchanges: IStockExchange[] } }) => {
          this.stockExchanges.push(...res.data.stockExchanges);
        });
  }

  remove(id: string): void {
    this.deleteSubscription = this.service
      .delete(id)
      .subscribe((res: { err: boolean }) => {
        if (!res.err) {
          this.getStockList(true);
        }
      });
  }

  public setPaginationItems($event: any): void {
    this.limit = Number($event.target.value) || 8;
    this.skip = 0;
    this.getStockList(true);
  }

}
