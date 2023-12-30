import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ISquare} from "@/app/types/square";

interface MainState {
  squares: ISquare[];
}

const initialState: MainState = {
  squares: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addSquareAction: (state, action: PayloadAction<ISquare>) => {
      state.squares.push(action.payload);
    },
    saveSquaresAction: (state, action: PayloadAction<ISquare[]>) => {
      state.squares = action.payload;
    },
    resetSquaresAction: (state) => {
      state.squares = [];
    },
    updateSquareAction: (state, action: PayloadAction<{index: number, square: ISquare}>) => {
      const {index, square} = action.payload
      state.squares[index] = {
        ...state.squares[index],
        ...square
      };
    },
  },
});

export const { addSquareAction, updateSquareAction, saveSquaresAction, resetSquaresAction } = mainSlice.actions;

export default mainSlice.reducer;
