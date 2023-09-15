import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../service/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipes!: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    console.log(this.recipes);
  }
}
