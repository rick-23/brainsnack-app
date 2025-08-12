import { setCards, setTopics, setLoading, setError } from "./reducer";
import API from "../utils/apiUtils";
import { AppDispatch } from "./store";

export const fetchCards = async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const response = await API.get("/api/cards");
    dispatch(setCards(response.data));
  } catch (error: unknown) {
    // More robust error typing
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An unknown error occurred"));
    }
  }
};

export const fetchTopics = async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const response = await API.get("/api/topics");
    dispatch(setTopics(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError("An unknown error occurred"));
    }
  }
};
