import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/model/ingredients.model';
import { ShoppingListService } from './service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  currentIndex!: number;
  ingredients!: Ingredients[];

  constructor(private shoppingListService: ShoppingListService) {}

  onEditElement(i: number) {
    console.log(i);
    this.shoppingListService.startedEditing.next(i);
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getAllIngredients();
  }

  onDelete(index: number) {
    console.log(index);
    this.shoppingListService.deleteIngredient(index);
  }
}
