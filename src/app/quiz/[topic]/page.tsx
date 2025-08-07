"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getCardsByTopic } from "@/app/data/card";
import { updateCardStatus } from "../../data/storage";
import Card from "../../components/Card";
import { CardType } from "@/app/data/card";

export default function QuizPage() {
  const params = useParams();
  const topicParam = params.topic;

  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    if (typeof topicParam === "string") {
      const filteredCards = getCardsByTopic(topicParam);
      setCards(filteredCards);
    }
  }, [topicParam]);

  if (typeof topicParam !== "string") {
    return <p>Invalid topic.</p>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStatusChange = (id: string, newStatus: CardType["status"]) => {
    updateCardStatus(id, newStatus);
    setCards([...getCardsByTopic(topicParam)]);
  };

  const currentCard = cards[currentIndex];

  return (
    <div>
      <h1>Quiz: {topicParam}</h1>
      {currentCard && (
        <>
          <Card card={currentCard} onStatusChange={handleStatusChange} />
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            Previous
          </button>
          <button
            disabled={currentIndex === cards.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
