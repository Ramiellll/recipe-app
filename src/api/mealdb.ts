import type { Area, Ingredient, Meal } from "../types/types";

const baseUrl = import.meta.env.VITE_MEAL_DB_BASE_API;

export const fetchAreas = async (): Promise<Area[]> => {
  const res = await fetch(`${baseUrl}/list.php?a=list`);
  const data = await res.json();
  return data.meals;
}

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  const res = await fetch(`${baseUrl}/list.php?i=list`);
  const data = await res.json();
  return data.meals;
}

export const fetchMealsByArea = async (area: string): Promise<Meal[]> => {
  const res = await fetch(`${baseUrl}/filter.php?a=${area}`);
  const data = await res.json();
  return data.meals;
}

export const fetchMealsByIngredient = async (ingredient: string): Promise<Meal[]> => {
  const res = await fetch(`${baseUrl}/filter.php?i=${ingredient}`);
  const data = await res.json();
  return data.meals;
}

export const fetchMealById = async (id: string): Promise<Meal> => {
  const res = await fetch(`${baseUrl}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals[0];
}
