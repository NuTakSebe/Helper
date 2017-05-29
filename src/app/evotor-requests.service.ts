import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EvotorRequestsService {

  constructor(private http:Http) { }

  getStores(token: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', token);

    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://api.evotor.ru/api/v1/inventories/stores/search', options)

  }

  getItems(token: string, storeUuid: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', token);

    let options = new RequestOptions({ headers: headers });
    return this.http.get("https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products", options)

  }

  getGroups(token: string, storeUuid: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', token);

    let options = new RequestOptions({ headers: headers });
    return this.http
    .get("https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products", options)
    .map(res => {
      let groups = [];
      let itemList = res.json().data;
      for(let index in itemList){
          if(itemList[index].group){
            groups.push(itemList[index])
          }
      }
      return groups;
    })
  }

  postItem(token: string, storeUuid: string, item: object){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', token);

    let options = new RequestOptions({ headers: headers });
    return this.http
      .post("http://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products", item, options)
        .map((resp:Response)=>resp.json())
          .catch((error:any) =>{return Observable.throw(error);});

  }

  deleteItem(token: string, storeUuid: string, itemUuid: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', token);

    let options = new RequestOptions({ headers: headers });
    return this.http
      .post("http://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products/delete", {"uuid": itemUuid}, options)
        .map((resp:Response)=>resp.json())
          .catch((error:any) =>{return Observable.throw(error);});

  }

}
