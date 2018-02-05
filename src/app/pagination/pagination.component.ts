import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Constants } from '../constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  public firstPage: number = Constants.PaginationConstants.FirstPage;

  @Input() currentPage: number;
  @Input() countOfElements: number;
  @Input() elementsperPage: number;
  @Input() loading: boolean;
  @Input() pagesToShow: number;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();
  @Output() loadAll = new EventEmitter<boolean>();
  constructor() { }

  //Go specific Page (calls another method insde component where pagination used)
  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onFirst(firstPage: number): void {
    this.goPage.emit(this.firstPage);
  }

  //Go to last page
  onLast(): void {
    this.goPage.emit(this.totalPages());
  }

  //Go previous Page (calls another method insde component where pagination used)
  onPrev(): void {
    this.goPrev.emit(true);
  }

  //Go next Page (calls another method insde component where pagination used)
  onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  showAll(){
    this.loadAll.emit(true)
  }

  // Amount of all the pages
  totalPages(): number {
    return Math.ceil(this.countOfElements / this.elementsperPage) || 0;
  }

  //Get last page
  lastPage(): boolean {
    return this.elementsperPage * this.currentPage > this.countOfElements;
  }

  showedAll(): boolean {
    return this.elementsperPage == this.countOfElements;
  }


  //Get mass of pages which will be shown in Pagination if pagesToShow = 3
  //There will be  < 1 2 3 > . If current page 5 of 10 there will be < 4 5 6 >
  getPages(): number[] {
    const countOfPages = this.totalPages();
    const pagesToShow = 3;
    const pages: number[] = [];

    pages.push(this.currentPage || 1);

    for (let i = 0; i < (pagesToShow - 1); i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < countOfPages) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }

    pages.sort((a, b) => a - b);
    return pages;
  }

}
