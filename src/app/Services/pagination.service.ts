import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService implements MatPaginatorIntl {

  /*
    service handle pagination label using angular material
  */

  changes = new Subject<void>();

  firstPageLabel = `First page`;
  itemsPerPageLabel = ``;
  lastPageLabel = `Last page`;


  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }
}
