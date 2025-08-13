import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import API from "../utils/apiUtils";
import { setCards, setError } from "../store/reducer";
import { CardType } from "../data/card";

export const useCards = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const { data } = await API.get("/api/cards");
      dispatch(setCards(data));
      return data;
    },
  });

  React.useEffect(() => {
    if (isError && error) {
      console.error("Error fetching cards:", error);
      dispatch(setError((error as Error).message));
    }
  }, [isError, error, dispatch]);

  const updateCardStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: CardType["status"];
    }) => {
      const response = await API.patch(`/api/cards/${id}`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error: any) => {
      console.error("Error updating card status:", error);
      dispatch(setError(error.message));
    },
  });

  const addCard = useMutation({
    mutationFn: async (newCard: Omit<CardType, "id">) => {
      const response = await API.post("/api/cards", newCard);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error: any) => {
      console.error("Error adding new card:", error);
      dispatch(setError(error.message));
    },
  });

  return {
    cards: data,
    isLoading,
    isError,
    error,
    updateCardStatus,
    addCard,
  };
};
