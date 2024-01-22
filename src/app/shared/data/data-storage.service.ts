import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from 'src/app/recipes/service/recipe.service';
import { Recipe } from 'src/app/recipes/model/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  apiUrl = `https://cooking-app-1978a-default-rtdb.firebaseio.com/`;

  storeRecipes() {
    console.log('store recipes');
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<any>(`${this.apiUrl}recipes.json`, recipes)
      .subscribe((data) => console.log(data));
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user);
        return this.http.get<Recipe[]>(`${this.apiUrl}recipes.json`, {
          params: new HttpParams().set('auth', user?.Token || ''),
        });
      }),
      map((recipes) => {
        return recipes.map((recipes) => {
          return {
            ...recipes,
            ingredients: recipes.ingredients ? recipes.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
