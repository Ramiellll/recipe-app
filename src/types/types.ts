export type Preferences = {
  area: string;
  ingredient: string;
};

export type Area = {
  strArea: string;
}

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strSource: string;
};

export type Ingredient = {
  idIngredient: string;
  strDescription: string;
  strIngredient: string;
  strThumb: string;
  strType: string;
};
