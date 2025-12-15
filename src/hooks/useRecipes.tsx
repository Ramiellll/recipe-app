import { useQuery } from "@tanstack/react-query";
import {
  fetchIngredients,
  fetchMealsByIngredient,
  fetchMealById,
  fetchAreas,
} from "../api/mealdb";
import { useDebounce } from "./useDebounce";
import type { Ingredient } from "../types/types";

export const useIngredients = () => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
    staleTime: 1000 * 60 * 60,
  });
};

export const useAreas = () => {
  return useQuery({
    queryKey: ["areas"],
    queryFn: fetchAreas,
    staleTime: 1000 * 60 * 60,
  });
};

export const useRecipeRecommendation = (
  ingredient: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["meal", ingredient],
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: async () => {
      const meals = await fetchMealsByIngredient(ingredient);
      if (!meals) {
        return null;
      }
      const selected = meals[Math.floor(Math.random() * meals.length)];
      if (!selected) {
        return null;
      }
      return fetchMealById(selected.idMeal);
    },
  });
};

export const useIngredientSearch = (term: string) => {
  const debouncedTerm = useDebounce(term, 300);

  return useQuery({
    queryKey: ["ingredient-search", debouncedTerm],
    enabled: debouncedTerm.length >= 2,
    queryFn: async () => {
      const ingredients = await fetchIngredients();
      return ingredients
        .filter((i: Ingredient) =>
          i.strIngredient.toLowerCase().includes(debouncedTerm.toLowerCase())
        )
        .slice(0, 6);
    },
    staleTime: 1000 * 60 * 60,
  });
};
