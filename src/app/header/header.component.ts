import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data/data-storage.service';
import { RecipeService } from '../recipes/service/recipe.service';
import { map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string = 'en';

  constructor(
    private dataService: DataStorageService,
    private recipeService: RecipeService,
    private translate: TranslateService,
    private lang: LanguageService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {}
  switchLanguage() {
    this.lang.switchLanguage(this.selectedLanguage);
  }
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
