import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TopicType } from "../data/topic";
import { CardType } from "../data/card";

interface MyState {
  loadingTopics: boolean;
  loadingCards: boolean;
  error: string | null;
  cards: CardType[];
  topics: TopicType[];
}

const initialState: MyState = {
  cards: [],
  topics: [],
  loadingTopics: false,
  loadingCards: false,
  error: null,
};

const slicer = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
      state.loadingCards = false;
      state.error = null;
    },
    setLoadingTopics(state) {
      state.loadingTopics = true;
      state.error = null;
    },
    setLoadingCards(state) {
      state.loadingCards = true;
      state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.loadingCards = false;
      state.loadingTopics = false;
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
      state.loadingTopics = false;
      state.error = null;
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
  setLoadingCards,
  setLoadingTopics,
  setError,
  addCard,
  removeCard,
  setTopics,
  addTopic,
} = slicer.actions;

export default slicer.reducer;
