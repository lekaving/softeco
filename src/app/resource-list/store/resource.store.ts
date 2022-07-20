import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {Resource} from "./resource.model";
import {Pagination} from "../../models/pagination.model";

export interface ResourceState {
  list: Resource[];
  pagination: Partial<Pagination<Resource>>;
}

export function createInitialState(): ResourceState {
  return {
    list: [],
    pagination: {
      page: 1,
      per_page: 1,
      total: 1,
      total_pages: 1
    }
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'resource', resettable: true})
export class ResourceStore extends Store<ResourceState> {

  constructor() {
    super(createInitialState());
  }

}
