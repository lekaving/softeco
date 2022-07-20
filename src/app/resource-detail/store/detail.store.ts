import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {Resource} from "../../resource-list/store/resource.model";

export interface DetailState {
  data: Resource | null;
}

export function createInitialState(): DetailState {
  return {
    data: null
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'detail'})
export class DetailStore extends Store<DetailState> {

  constructor() {
    super(createInitialState());
  }

}
