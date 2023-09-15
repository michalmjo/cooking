import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  allRecipes!: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeService.recipeChange.subscribe((recipes: Recipe[]) => {
      this.allRecipes = recipes;
    });
    this.allRecipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
