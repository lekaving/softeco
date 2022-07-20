import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { DetailStore, DetailState } from './detail.store';

@Injectable({ providedIn: 'root' })
export class DetailQuery extends Query<DetailState> {

  detail$ = this.select(state => state.data);

  constructor(protected override store: DetailStore) {
    super(store);
  }

}
