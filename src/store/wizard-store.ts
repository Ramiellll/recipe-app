import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WizardState {
  area: string;
  ingredient: string;
  activeStep: number;
  setActiveStep: (step: number) => void;
  setArea: (area: string) => void;
  setIngredient: (ingredient: string) => void;
}

export const useWizardStore = create<WizardState>()(
  persist<WizardState>(
    (set) => ({
      area: "",
      ingredient: "",
      activeStep: 0,
      setActiveStep: (activeStep: number) => set({ activeStep }),
      setArea: (area: string) => set({ area }),
      setIngredient: (ingredient: string) => set({ ingredient }),
    }),
    {
      name: "wizard-storage",
    }
  )
);
