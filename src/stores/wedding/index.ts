// Crear el store

import { create } from "zustand";
import { createPersonSlice, type PersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
import { createGuestSlice, type GuestSlice } from "./guest.slice";
import { createDateSlice, type DateSlice } from "./date.slice";
import {
  createConfirmationSlice,
  type ConfirmationState,
} from "./confirmation.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationState;

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  }))
);
