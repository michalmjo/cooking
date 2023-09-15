import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/model/recipe.model';
import { Ingredients } from 'src/app/shared/model/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredients: Ingredients[] = [
    new Ingredients('Apple', 5),
    new Ingredients('Banana', 10),
  ];
  constructor() {}

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) {
    console.log(index);
    this.ingredients.splice(index, 1);
  }

  addIngredients(newItem: Recipe) {
    if (newItem.ingredients) {
      for (const ingredient of newItem.ingredients) {
        const name = ingredient.name;
        const amount = ingredient.amount;
        const newIngredient = new Ingredients(name, amount);
        this.ingredients.push(newIngredient);
      }
    }
  }

  getAllIngredients() {
    return this.ingredients;
  }

  addIngredient(e: Ingredients) {
    const name = e.name;
    const amount = e.amount;
    const newIngredient = new Ingredients(name, amount);
    this.ingredients.push(newIngredient);
  }

  updateIngredient(index: number, newIngredient: Ingredients) {
    console.log(index);
    console.log(newIngredient);
    this.ingredients[index] = newIngredient;
  }
}
