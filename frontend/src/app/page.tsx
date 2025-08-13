"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCards, fetchTopics } from "./store/fetchCardsAndTopics";
import { AppDispatch } from "./store/store";
import Topic from "./components/Topic";
import "./styles/homePage.css";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchTopics(dispatch);
    fetchCards(dispatch);
  }, [dispatch]);

  return (
    <div className="home-container">
      <Topic />
    </div>
  );
}
