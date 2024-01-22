import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingListService } from '../service/shopping-list.service';
import {
  FormArray,
  UntypedFormControl,
  UntypedFormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/model/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingName: string = '';
  amount?: number;
  sub!: Subscription;
  formControl!: UntypedFormGroup;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredients;
  constructor(
    private snackBar: MatSnackBar,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.formControl = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      amount: new UntypedFormControl(null, [Validators.required]),
    });
    console.log(this.formControl.valid);

    this.sub = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        console.log(this.editedItem);
        this.formControl.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  onClear() {
    this.editMode = false;
    this.formControl.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    console.log(this.formControl.value);
    const { name, amount } = this.formControl.value;
    console.log(name);
    console.log(amount);
    console.log(this.formControl.valid);
    console.log(this.formControl);

    if (name == null) {
      this.snackBar.open('Add Name!', 'OK', {
        duration: 3000, // Czas wyświetlania w milisekundach
        panelClass: ['custom-snackbar'],
      });
      return;
    } else if (amount == null || amount <= 0) {
      this.snackBar.open('The number must be greater than zero!', 'OK', {
        duration: 3000, // Czas wyświetlania w milisekundach
        panelClass: ['custom-snackbar'],
      });
      return;
    }

    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        this.formControl.value
      );

      console.log(this.editedItem);
    } else {
      const newItem = {
        name: name,
        amount: amount,
      };
      this.shoppingListService.addIngredient(newItem);

      this.ingName = '';
      this.amount = undefined;
    }

    this.editMode = false;
    this.formControl.reset();
  }
}
