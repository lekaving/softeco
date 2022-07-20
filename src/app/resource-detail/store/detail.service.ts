import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {DetailStore} from './detail.store';
import {Observable} from "rxjs";
import {Resource} from "../../resource-list/store/resource.model";

export type IncomeData = {data: Resource, support: unknown}

@Injectable({providedIn: 'root'})
export class DetailService {

  constructor(private detailStore: DetailStore, private http: HttpClient) {
  }


  get(id: string): Observable<IncomeData> {
    return this.http.get<IncomeData>('https://reqres.in/api/users', {params: {id}}).pipe(tap(({data}) => {
      this.detailStore.update({data});
    }));
  }

}
