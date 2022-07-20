import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailComponent} from './detail.component';
import {DetailService, IncomeData} from "../../store/detail.service";
import {DetailQuery} from "../../store/detail.query";
import {RouterTestingModule} from "@angular/router/testing";
import {filter, of} from "rxjs";
import {DetailStore} from "../../store/detail.store";
import {ActivatedRoute} from "@angular/router";

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: jasmine.SpyObj<DetailService>;
  let query: DetailQuery;
  let store: DetailStore;

  const mock: IncomeData = {
    data: {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg"
    },
    support: null
  };

  beforeEach(async () => {
    service = jasmine.createSpyObj('DetailService', ['get'])
    service.get.and.returnValue(of(mock))
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DetailComponent],
      providers: [
        {provide: DetailService, useValue: service},
        DetailQuery,
        DetailStore,
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                id: '1'
              }
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    query = TestBed.inject(DetailQuery);
    store = TestBed.inject(DetailStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load detail', (done) => {
    expect(service.get).toHaveBeenCalledWith('1');
    store.update({
      data: mock.data
    })
    query.detail$.pipe(filter(res => !!res)).subscribe({
      next: result => {
        expect(result).toEqual(mock.data);
        done();
      }
    })
  })
});
