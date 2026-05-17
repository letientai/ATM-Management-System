import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Atm } from '../../models/atm.model';

@Component({
  selector: 'app-atm-table',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, MatPaginatorModule],
  templateUrl: './atm-table.html',
  styleUrl: './atm-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtmTable {
  // Inputs - Outputs
  readonly atmList = input.required<Atm[]>();
  readonly loading = input<boolean>(false);
  readonly onEdit = output<Atm>();
  readonly onDelete = output<Atm>();

  // Table state
  readonly pageSize = signal(5);
  readonly pageIndex = signal(0);
  readonly pageSizeOptions = [5, 10, 20, 50];
  readonly pagedData = computed(() => {
    const data = this.atmList() ?? [];
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();

    return data.slice(start, end);
  });

  readonly displayedColumns: string[] = ['atmName', 'manufacturer', 'type', 'serialNumber', 'image', 'actions'];

  readonly isEmpty = computed(() => {
    if (this.loading()) {
      return false;
    }

    const data = this.atmList() ?? [];
    return data.length === 0;
  });


  handlePageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  handleEdit(atm: Atm): void {
    this.onEdit.emit(atm);
  }

  handleDelete(atm: Atm): void {
    this.onDelete.emit(atm);
  }
}
