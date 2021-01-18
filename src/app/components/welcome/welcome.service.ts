import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../../services/rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private urlBase = 'stock-exchange';

  constructor(
    private restService: RestService
  ) { }


  public stockList(limit: number = 8, skip: number = 0) {
    const query = `limit=${limit}&skip=${skip}`;
    return this.restService.get(`${this.urlBase}/list?${query}`);
  }
}
