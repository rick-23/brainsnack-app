"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CardType, getAllCards, updateCardStatus } from "../../data/card";
import Card from "../../components/Card";
import "../../styles/topicPage.css";

export default function TopicPage() {
  const { topic } = useParams(); // get topic from URL
  console.log("Topic name from URL:", topic);
  const topicName = decodeURIComponent(topic as string);

  const [cards, setCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [filter, setFilter] = useState<
    "all" | "completed" | "incomplete" | "review"
  >("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load cards
  useEffect(() => {
    const allCards = getAllCards(); // assumes getCards returns all cards
    const topicCards = allCards.filter((card) => card.topic === topicName);
    setCards(topicCards);
    setFilteredCards(topicCards);
  }, [topicName]);

  // Filter cards when filter changes
  useEffect(() => {
    if (filter === "all") {
      setFilteredCards(cards);
    } else {
      setFilteredCards(cards.filter((card) => card.status === filter));
    }
    setCurrentIndex(0);
  }, [filter, cards]);

  const handleStatusChange = (id: string, newStatus: CardType["status"]) => {
    const updated = cards.map((card) =>
      card.id === id ? { ...card, status: newStatus } : card
    );
    setCards(updated);
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
