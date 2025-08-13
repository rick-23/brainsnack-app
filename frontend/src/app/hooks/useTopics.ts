import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import API from "../utils/apiUtils";
import { setTopics, setError } from "../store/reducer";
import { TopicType } from "../data/topic";
import React from "react";

export const useTopics = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data } = await API.get("/api/topics");
      dispatch(setTopics(data));
      return data;
    },
  });

  React.useEffect(() => {
    if (isError && error) {
      console.error("Error fetching topics:", error);
      dispatch(setError((error as Error).message));
    }
  }, [isError, error, dispatch]);

  const addTopic = useMutation({
    mutationFn: async (newTopic: TopicType) => {
      const response = await API.post("/api/topics", newTopic);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error: any) => {
      console.error("Error adding topic:", error);
      dispatch(setError(error.message));
    },
  });

  return {
    topics: data,
    isLoading,
    isError,
    error,
    addTopic,
  };
};
