import { Component, OnInit } from '@angular/core';
import { IStockExchange } from '../../intefaces/stock-exchange.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public stockExchanges: IStockExchange[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getDummyStock();
  }

  // tslint:disable-next-line:typedef
  private getDummyStock() {
    const stockDummy: IStockExchange = {
      _id: 'asd',
      name: 'nombre',
      description: 'description',
      symbol: 'QWE',
      market_values: [],
      created: new Date()
    };

    this.stockExchanges.push(stockDummy, stockDummy, stockDummy, stockDummy, stockDummy, stockDummy, stockDummy);
  }

  public setPaginationItems($event: any): void {
    console.log($event.target.value);
  }

}
