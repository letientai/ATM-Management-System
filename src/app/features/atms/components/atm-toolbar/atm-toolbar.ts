import { ChangeDetectionStrategy, Component, Input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-atm-toolbar',
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './atm-toolbar.html',
  styleUrl: './atm-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtmToolbar {
  searchKeyword = model<string>('');
  private debounceTimeout: number | null = null;

  onSearchKeywordChange(_keyword: string): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.searchKeyword.set(_keyword);
    }, 300);
  }

  onAddNewAtm(): void {
    // Placeholder for add ATM action.
  }
}
