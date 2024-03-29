import { Ingredients } from 'src/app/shared/model/ingredients.model';

export class Recipe {
  constructor(
    public name: string,
    public desc: string,
    public imagePath?: string,
    public ingredients?: Ingredients[]
  ) {}
}
