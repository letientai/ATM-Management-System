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

  private debounceTimeout?: ReturnType<typeof setTimeout>;

  private readonly DEBOUNCE_TIME = 300;

  onSearchKeywordChange(value: string): void {
    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      this.searchKeyword.set(value);
    }, this.DEBOUNCE_TIME);
  }

  onAddNewAtm(): void {
  }
}
