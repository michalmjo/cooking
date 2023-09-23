import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/app/recipes/service/recipe.service';
import { Recipe } from 'src/app/recipes/model/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  apiUrl = `https://cooking-app-1978a-default-rtdb.firebaseio.com/`;

  storeRecipes() {
    console.log('store recipes');
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<any>(`${this.apiUrl}recipes.json`, recipes)
      .subscribe((data) => console.log(data));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.apiUrl}recipes.json`).pipe(
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
