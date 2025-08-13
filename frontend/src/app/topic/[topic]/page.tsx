"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { CardType, getAllCards, updateCardStatus } from "../../data/card";
import Card from "../../components/Card";
import { AppDispatch } from "@/app/store/store";
import { fetchCards } from "@/app/store/fetchCardsAndTopics";
import "../../styles/topicPage.css";

export default function TopicPage() {
  const { topic } = useParams(); // get topic from URL
  const topicName = decodeURIComponent(topic as string);
  const dispatch = useDispatch<AppDispatch>();

  const allCards = useSelector((state: any) => state.brainSnack.cards);

  const [filter, setFilter] = useState<
    "all" | "completed" | "incomplete" | "review"
  >("all");
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const updated = topicCards.map((card: CardType) =>
      card.id === id ? { ...card, status: newStatus } : card
    );
    // setCards(updated);
    updateCardStatus(id, newStatus);
  };

  const currentCard = filteredCards[currentIndex];

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
