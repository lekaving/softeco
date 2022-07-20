import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ResourceService} from "../../store/resource.service";
import {ResourceQuery} from "../../store/resource.query";
import {MatTableDataSource} from "@angular/material/table";
import {Resource} from "../../store/resource.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {distinctUntilChanged, filter, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ResourceStore} from "../../store/resource.store";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'email', 'first_name'];
  dataSource!: MatTableDataSource<Resource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  destroyed$ = new Subject();

  constructor(private service: ResourceService, private query: ResourceQuery, private router: Router, private store: ResourceStore) {
  }

  ngAfterViewInit() {
    this.service.get().subscribe()
    this.query.list$.pipe(
      takeUntil(this.destroyed$),
      filter(res => !!res.length),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
    this.store.reset();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toDetail(id: string) {
    this.router.navigate(['detail', id])
  }

}
