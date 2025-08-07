import { v4 as uuidv4 } from "uuid";
import { CardType } from "./card";

let cards =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cards") || "[]")
    : [];

export function getAllCards() {
  return cards;
}

export function getCardsByTopic(topic: string) {
  return cards.filter((card: CardType) => card.topic === topic);
}

export function addCard({
  title,
  topic,
  content,
}: {
  title: string;
  topic: string;
  content: string;
}) {
  const newCard = {
    id: uuidv4(),
    title,
    topic,
    content,
    status: "incomplete",
  };
  cards.push(newCard);
  localStorage.setItem("cards", JSON.stringify(cards));
}

export function updateCardStatus(id: string, newStatus: string) {
  cards = cards.map((card: CardType) =>
    card.id === id ? { ...card, status: newStatus } : card
  );
  localStorage.setItem("cards", JSON.stringify(cards));
}
