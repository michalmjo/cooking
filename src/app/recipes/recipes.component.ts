import { Component, OnInit } from '@angular/core';
import { Recipe } from './model/recipe.model';
import { RecipeService } from './service/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  item!: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}
}
