import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { DataStorageService } from '../shared/data/data-storage.service';
import { RecipeService } from '../recipes/service/recipe.service';
import { Subscription, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../shared/services/language.service';
import { AuthService } from '../auth/auth/service/auth.service';
const LANG_STORAGE_KEY = 'selectedLanguage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  selectedLanguage: string = 'en';

  private userSub!: Subscription;

  constructor(
    private dataService: DataStorageService,
    private recipeService: RecipeService,
    private translate: TranslateService,
    private lang: LanguageService,
    private authService: AuthService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    // Sprawdź, czy wybrany język jest zapisany w localStorage
    this.userSub = this.authService.user.subscribe((user) => {
      console.log(user);
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
    const storedLanguage = localStorage.getItem(LANG_STORAGE_KEY);
    if (storedLanguage) {
      this.selectedLanguage = storedLanguage;
      this.lang.switchLanguage(this.selectedLanguage);
    }
  }
  switchLanguage() {
    this.lang.switchLanguage(this.selectedLanguage);
    localStorage.setItem(LANG_STORAGE_KEY, this.selectedLanguage);
  }
  //
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

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
