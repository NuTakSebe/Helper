import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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
    .map((res:Response)  => {
      let groups = [];
      let itemList = res.json();
      console.log(itemList);
      for(let index in itemList){
        if(itemList[index].group === true){
          groups.push(itemList[index])
        }
      }
      return groups;
    })
  }

  postItem(token: string, storeUuid: string, item: object){
    console.log(token, storeUuid, [item]);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', token);

    return this.http
      .post("https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products", [item], {headers: headers})
        .map((resp:Response)=>resp.json())
          .catch((error:any) =>{return Observable.throw(error);});

  }

  deleteItem(token: string, storeUuid: string, itemUuid: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', token);

    let options = new RequestOptions({ headers: headers });
    return this.http
      .post("https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products/delete", {"uuid": itemUuid}, options)
        .map((resp:Response)=>resp.json())
          .catch((error:any) =>{return Observable.throw(error);});

  }

  buildObjectTree(treeData, key, parentKey){
    var keys = [];
    treeData.map(function(x){
        x.Children = [];
        keys.push(x[key]);
    });
    var roots = treeData.filter(function(x){return keys.indexOf(x[parentKey])==-1});
    var nodes = [];
    roots.map(function(x){nodes.push(x)});
    while(nodes.length > 0)
    {

        var node = nodes.pop();
        var children =  treeData.filter(function(x){return x[parentKey] == node[key]});
        children.map(function(x){
            node.Children.push(x);
            nodes.push(x)
        });
    }
    if (roots.length==1) return roots[0];
    return roots;
  }

}
