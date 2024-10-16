import { StateCreator } from "zustand";

export interface ConfirmationState {
  isConfirmed: boolean;

  setIsConfirmed: (value: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationState> = (
  set
) => ({
  isConfirmed: true,

  setIsConfirmed: (value) => set({ isConfirmed: value }),
});
