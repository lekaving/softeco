import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ResourceStore, ResourceState } from './resource.store';

@Injectable({ providedIn: 'root' })
export class ResourceQuery extends Query<ResourceState> {

  list$ = this.select(state => state.list);

  constructor(protected override store: ResourceStore) {
    super(store);
  }

}
