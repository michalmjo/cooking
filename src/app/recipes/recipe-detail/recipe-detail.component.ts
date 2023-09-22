import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Ingredients } from 'src/app/shared/model/ingredients.model';
import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  elementRecipe!: Recipe;
  id!: number;

  showRecipe = false;
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.elementRecipe = this.recipeService.getRecipe(this.id);
    });
  }

  toggleRecipe() {
    console.log(this.showRecipe);
    this.showRecipe = !this.showRecipe;
  }

  addToShoppinglist(item: Recipe) {
    console.log(item);

    this.shoppingListService.addIngredients(item);
  }

  onEditRecipe = () => {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  };
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
