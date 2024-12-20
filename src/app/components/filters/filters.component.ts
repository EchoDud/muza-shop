import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FilterStateService } from '../../shared/services/filter-state.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class FiltersComponent {
  @Input() availableBrands: string[] = [];
  @Input() availableCategories: string[] = [];
  @Input() availableModels: string[] = [];
  @Input() availableColors: string[] = [];
  @Output() applyFilters = new EventEmitter();

  displayedCategories: string[] = [];
  displayedBrands: string[] = [];
  displayedModels: string[] = [];
  displayedColors: string[] = [];
  selectedCategories: string[] = ['all'];
  selectedBrands: string[] = ['all'];
  selectedModels: string[] = ['all'];
  selectedColors: string[] = ['all'];
  priceMin: number | null = null;
  priceMax: number | null = null;

  constructor(private filterState: FilterStateService) {}

  ngOnInit(): void {
    this.filterState.filterState$.subscribe((filters) => {
      this.selectedCategories = filters.category;
      this.updateDisplayedOptions();
    });
  }

  ngOnChanges(): void {
    this.updateDisplayedOptions();
  }

  updateDisplayedOptions(): void {
    this.displayedCategories = this.updateDisplayedList(this.availableCategories, this.selectedCategories);
    this.displayedBrands = this.updateDisplayedList(this.availableBrands, this.selectedBrands);
    this.displayedModels = this.updateDisplayedList(this.availableModels, this.selectedModels);
    this.displayedColors = this.updateDisplayedList(this.availableColors, this.selectedColors);
  }

  updateDisplayedList(available: string[], selected: string[]): string[] {
    const selectedSet = new Set(selected);
    const nonSelected = available.filter((item) => !selectedSet.has(item));
    return ['all', ...selected.filter((item) => item !== 'all'), ...nonSelected];
  }

  toggleSelection(value: string, selectedList: string[]): void {
    if (value === 'all') {
      if (selectedList.length === 1 && selectedList[0] === 'all') {
        return; // Если "Все" уже выбрано, не изменяем
      }
      selectedList.length = 0;
      selectedList.push('all');
    } else {
      const index = selectedList.indexOf(value);
      if (index > -1) {
        selectedList.splice(index, 1);
      } else {
        selectedList.push(value);
      }
      // Если "Все" был выбран и больше нет других элементов, убираем "Все"
      const allIndex = selectedList.indexOf('all');
      if (allIndex > -1 && selectedList.length > 1) {
        selectedList.splice(allIndex, 1);
      }
    }
    this.updateDisplayedOptions();
  }

  onApply(): void {
    this.filterState.updateFilters({
      category: this.selectedCategories,
      brand: this.selectedBrands,
      model: this.selectedModels,
      color: this.selectedColors,
      priceMin: this.priceMin,
      priceMax: this.priceMax,
    });
    this.applyFilters.emit();
  }

  onReset(): void {
    this.filterState.resetFilters();
    this.selectedCategories = ['all'];
    this.selectedBrands = ['all'];
    this.selectedModels = ['all'];
    this.selectedColors = ['all'];
    this.priceMin = null;
    this.priceMax = null;
    this.updateDisplayedOptions();
  }
}
