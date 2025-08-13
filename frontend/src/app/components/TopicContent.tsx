"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../data/card";
import { useCards } from "../hooks/useCards";
import Card from "./Card";
import { AppDispatch } from "../store/store";
import { fetchCards } from "../store/fetchCardsAndTopics";
import "../styles/topicPage.css";

interface TopicContentProps {
  topicName: string;
}

export default function TopicContent({ topicName }: TopicContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const allCards = useSelector((state: any) => state.brainSnack.cards);

  const [filter, setFilter] = useState<
    "all" | "completed" | "incomplete" | "review"
  >("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { updateCardStatus } = useCards();

  const topicCards = useMemo(() => {
    return allCards.filter((card: CardType) => card.topic === topicName);
  }, [allCards, topicName]);

  const filteredCards = useMemo(() => {
    if (filter === "all") return topicCards;
    return topicCards.filter((card: CardType) => card.status === filter);
  }, [filter, topicCards]);

  useEffect(() => {
    if (allCards.length === 0) {
      dispatch(fetchCards);
    }
  }, [dispatch, allCards.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter, topicName]);

  const handleStatusChange = (id: string, newStatus: CardType["status"]) => {
    updateCardStatus.mutate({ id, status: newStatus });
  };

  const currentCard = filteredCards[currentIndex];

  if (topicCards.length === 0) {
    return (
      <div className="container">
        <h1 className="header">Topic: {topicName}</h1>
        <p>No cards available for this topic.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="header">Topic: {topicName}</h1>

      <div className="filters">
        {["all", "completed", "incomplete", "review"].map((status) => (
          <button
            key={status}
            className={`filterButton ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status as typeof filter)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="cardArea">
        {currentCard ? (
          <Card card={currentCard} onStatusChange={handleStatusChange} />
        ) : (
          <p>No cards found for this filter.</p>
        )}
      </div>

      <div className="navigation">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              Math.min(prev + 1, filteredCards.length - 1)
            )
          }
          disabled={currentIndex >= filteredCards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
