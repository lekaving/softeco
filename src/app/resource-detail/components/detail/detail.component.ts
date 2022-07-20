import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DetailService} from "../../store/detail.service";
import {DetailQuery} from "../../store/detail.query";
import {MatTableDataSource} from "@angular/material/table";
import {Resource} from "../../../resource-list/store/resource.model";
import {filter, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name'];
  dataSource!: MatTableDataSource<Resource>;
  destroyed$ = new Subject();

  constructor(private service: DetailService, private query: DetailQuery, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.service.get(id).subscribe();
    this.query.detail$.pipe(takeUntil(this.destroyed$), filter(res => !!res))
      .subscribe(res => this.dataSource = new MatTableDataSource<Resource>([res as Resource]))
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  back() {
    this.router.navigate([''])
  }

}
