import { Component, effect, input, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Atm, AtmFormModal } from '../../models/atm.model';
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

import { form, FormField, FormRoot, required } from '@angular/forms/signals';

@Component({
  selector: 'app-atm-dialog-form',
  imports: [CommonModule, FormsModule, MatButton, MatFormFieldModule, FormField, FormRoot],
  templateUrl: './atm-dialog-form.html',
  styleUrl: './atm-dialog-form.scss',
})
export class AtmDialogForm {
  isOpen = input(false);
  atmData = input<Atm | null>(null);
  loading = input(false);

  save = output<AtmFormModal>();
  close = output<void>();

  private readonly initialForm: AtmFormModal = {
    atmName: '',
    manufacturer: '',
    type: '',
    serialNumber: '',
    image: '',
  };

  formModel = signal<AtmFormModal>(this.initialForm);
  formData = form(this.formModel, (path) => {
    required(path.atmName, {
      message: 'ATM Name is required'
    });

    required(path.manufacturer, {
      message: 'Manufacturer is required'
    });

    required(path.serialNumber, {
      message: 'Serial Number is required'
    });
  }, {
    submission: {
      action: async (field) => {
        const form = field();
        if (!form.invalid()) {
          this.save.emit(field().value())
        }
      },
    },
  },);

  constructor() {

    effect(() => {
      const isOpen = this.isOpen();
      const data = this.atmData();
      if (!isOpen) return;
      untracked(() => {
        this.formModel.set(
          data
            ? {
              atmName: data.atmName ?? '',
              manufacturer: data.manufacturer ?? '',
              type: data.type ?? '',
              serialNumber: data.serialNumber ?? '',
              image: data.image ?? '',
            }
            : this.initialForm
        );
        this.formData().reset(); //Reset form state (touched, dirty, errors,...)
      });
    });
  }

  onSave() {
  }

  onClose() {
    this.close.emit();
  }
}
