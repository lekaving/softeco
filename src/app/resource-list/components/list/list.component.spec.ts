import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListComponent} from './list.component';
import {ResourceService} from "../../store/resource.service";
import {ResourceQuery} from "../../store/resource.query";
import {filter, of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {ResourceStore} from "../../store/resource.store";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: jasmine.SpyObj<ResourceService>;
  let query: ResourceQuery;
  let store: ResourceStore;

  const resourceMock = {
    page: 1,
    per_page: 2,
    total: 12,
    total_pages: 6,
    data: [{
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg"
    }, {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg"
    }],
    support: {
      url: "https://reqres.in/#support-heading",
      text: "To keep ReqRes free, contributions towards server costs are appreciated!"
    }
  };

  beforeEach(async () => {
    service = jasmine.createSpyObj('ResourceService', ['get']);

    service.get.and.returnValue(of(resourceMock));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ListComponent],
      providers: [
        {provide: ResourceService, useValue: service},
        ResourceQuery,
        ResourceStore
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    query = TestBed.inject(ResourceQuery);
    store = TestBed.inject(ResourceStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(query).toBeTruthy();
  });

  it('should load data', (done) => {
    expect(service.get).toHaveBeenCalled();
    store.update({
      list: resourceMock.data,
      pagination: {
        page: resourceMock.page,
        per_page: resourceMock.per_page,
        total: resourceMock.total,
        total_pages: resourceMock.total_pages
      }
    });
    query.list$.pipe(filter(res => !!res.length)).subscribe({
      next: result => {
        expect(result).toEqual(resourceMock.data);
        done();
      },
    });
  })
});
