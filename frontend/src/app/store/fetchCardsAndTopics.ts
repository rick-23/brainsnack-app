import {
  setCards,
  setTopics,
  setLoadingCards,
  setLoadingTopics,
  setError,
} from "./reducer";
import API from "../utils/apiUtils";
import { AppDispatch } from "./store";

export const fetchCards = async (dispatch: AppDispatch) => {
  dispatch(setLoadingCards());
  try {
    const response = await API.get("/api/cards");
    console.log("Fetched cards:", response.data);
    dispatch(setCards(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An unknown error occurred"));
    }
  }
};

export const fetchTopics = async (dispatch: AppDispatch) => {
  dispatch(setLoadingTopics());
  try {
    const response = await API.get("/api/topics");
    console.log("Fetched topics:", response.data);
    dispatch(setTopics(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An unknown error occurred"));
    }
  }
};
