import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Ingredients } from 'src/app/shared/model/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();

  private allRecipes: Recipe[] = [
    new Recipe(
      'A tekst',
      'Descr',
      'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=1380&t=st=1691489540~exp=1691490140~hmac=e4cdc80ed111eada4838e10f25ae1727f707903cfb04cc2f2fdc1dfdbc7dcd63',
      [
        new Ingredients('Ingredients Name one', 12),
        new Ingredients('Ingredients Name two', 2),
      ]
    ),
    new Recipe(
      'Tekst second',
      'Desc second',
      'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=1380&t=st=1691489540~exp=1691490140~hmac=e4cdc80ed111eada4838e10f25ae1727f707903cfb04cc2f2fdc1dfdbc7dcd63',
      [
        new Ingredients('Ingredients Name one', 4),
        new Ingredients('Ingredients Name two', 42),
      ]
    ),
  ];

  constructor() {}

  getRecipe(id: number) {
    return this.allRecipes[id];
  }

  getRecipes() {
    return this.allRecipes.slice();
  }
}
