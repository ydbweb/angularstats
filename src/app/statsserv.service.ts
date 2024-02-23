import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsservService {

  constructor(private httpClient : HttpClient) { }

  baseUrl:string = "https://ydbweb.com:8181/angularstatsspring/";

  getMainItems() {
    return this.httpClient.get(this.baseUrl+ "mainitems" + '/');
  }

  getChoiceItems(mainitemid : string) {
    return this.httpClient.get(this.baseUrl+ "items?" +"mainitemid=" + mainitemid + '/');
  }

  getItemsAndMainItemName(itemid : string) {
    return this.httpClient.get(this.baseUrl+ "mainitemanditemname?" +"&itemid=" + itemid + '/');
  }

  getChoiceItemsNames(mainitemid : string) {
    return this.httpClient.get(this.baseUrl+ "oneitemsnames?" +"mainitemid=" + mainitemid + '/');
  }

  getChoiceItemsDatas(mainitemid : string,itemid : string) {
    return this.httpClient.get(this.baseUrl+ "oneitemsdata?" +"mainitemid=" + mainitemid +"&itemid=" + itemid + '/');
  }

  getItemsAndData(mainitemid : string) {
    return this.httpClient.get(this.baseUrl+ "itemsanddata?" +"mainitemid=" + mainitemid + '/');
  }
}
