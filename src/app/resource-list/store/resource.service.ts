import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Resource} from './resource.model';
import {ResourceStore} from './resource.store';
import {Pagination} from "../../models/pagination.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ResourceService {

  constructor(private resourceStore: ResourceStore, private http: HttpClient) {
  }


  get(): Observable<Pagination<Resource>> {
    const params = {
      page: 1,
      per_page: 5
    }
    return this.http.get<Pagination<Resource>>('https://reqres.in/api/users', {params})
      .pipe(tap(({data, page, per_page, total, total_pages}) => {
        this.resourceStore.update({list: data, pagination: {page, per_page, total, total_pages}});
      }));
  }
}
