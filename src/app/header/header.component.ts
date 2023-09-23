import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data/data-storage.service';
import { RecipeService } from '../recipes/service/recipe.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private dataService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {}

  //

  isDropdownOpen = false;
  isFetchDataOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleFetchData() {
    this.isFetchDataOpen = !this.isFetchDataOpen;
  }

  onSaveData() {
    this.dataService.storeRecipes();
  }
  onFetchData() {
    console.log('fetch data');
    this.dataService.fetchRecipes().subscribe();
  }
}
