import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TopicType } from "../data/topic";
import { CardType } from "../data/card";

interface MyState {
  loading: boolean;
  error: string | null;
  cards: CardType[];
  topics: TopicType[];
}

const initialState: MyState = {
  cards: [],
  topics: [],
  loading: false,
  error: null,
};

const slicer = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.error = action.payload ? action.payload : null;
    },
    addCard(state, action) {
      state.cards.push(action.payload);
    },
    removeCard(state, action) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    setTopics(state, action) {
      state.topics = action.payload;
    },
    addTopic(state, action) {
      if (!state.topics.find((topic) => topic.name === action.payload.name)) {
        state.topics.push(action.payload);
      }
    },
  },
});

export const {
  setCards,
  setLoading,
  setError,
  addCard,
  removeCard,
  setTopics,
  addTopic,
} = slicer.actions;

export default slicer.reducer;
