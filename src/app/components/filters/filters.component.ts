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
  @Output() applyFilters = new EventEmitter();

  displayedBrands: string[] = [];
  selectedBrands: string[] = ['all'];
  priceMin: number | null = null;
  priceMax: number | null = null;

  constructor(private filterState: FilterStateService) {}

  ngOnChanges(): void {
    this.updateDisplayedBrands();
  }

  updateDisplayedBrands(): void {
    const selectedSet = new Set(this.selectedBrands);
    const nonSelected = this.availableBrands.filter((brand) => !selectedSet.has(brand));

    this.displayedBrands = ['all', ...this.selectedBrands.filter((b) => b !== 'all'), ...nonSelected];
  }

  isChecked(brand: string): boolean {
    return this.selectedBrands.includes(brand);
  }

  toggleBrand(brand: string): void {
    if (brand === 'all') {
      this.selectedBrands = ['all'];
    } else {
      const index = this.selectedBrands.indexOf(brand);
      if (index > -1) {
        this.selectedBrands.splice(index, 1);
      } else {
        this.selectedBrands.push(brand);
      }

      if (this.selectedBrands.length === 0) {
        this.selectedBrands.push('all');
      } else {
        const allIndex = this.selectedBrands.indexOf('all');
        if (allIndex > -1) {
          this.selectedBrands.splice(allIndex, 1);
        }
      }
    }

    this.updateDisplayedBrands();
  }

  onApply(): void {
    this.filterState.updateFilters({
      priceMin: this.priceMin,
      priceMax: this.priceMax,
      brand: this.selectedBrands,
    });
    this.applyFilters.emit();
  }

  onReset(): void {
    this.filterState.resetFilters();
    this.selectedBrands = ['all'];
    this.priceMin = null;
    this.priceMax = null;
    this.updateDisplayedBrands();
  }
}