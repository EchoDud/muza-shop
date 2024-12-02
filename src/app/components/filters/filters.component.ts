import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterStateService } from '../../shared/services/filter-state.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule],
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
      selectedList.length = 0;
      selectedList.push('all');
    } else {
      const index = selectedList.indexOf(value);
      if (index > -1) {
        selectedList.splice(index, 1);
      } else {
        selectedList.push(value);
      }
      if (selectedList.length === 0) {
        selectedList.push('all');
      } else {
        const allIndex = selectedList.indexOf('all');
        if (allIndex > -1) {
          selectedList.splice(allIndex, 1);
        }
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