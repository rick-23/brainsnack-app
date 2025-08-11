import rawCards from "./cardData.json";

export interface CardType {
  id: string;
  title: string;
  topic: string;
  content: string;
  status: "completed" | "incomplete" | "review";
}

const cards: CardType[] = rawCards as CardType[];

export function getAllCards(): CardType[] {
  return cards;
}

export function getCardsByTopic(topic: string): CardType[] {
  return cards.filter((card) => card.topic === topic);
}

export function updateCardStatus(id: string, newStatus: CardType["status"]) {
  const cardIndex = cards.findIndex((card) => card.id === id);
  if (cardIndex !== -1) {
    cards[cardIndex].status = newStatus;
  }
}
