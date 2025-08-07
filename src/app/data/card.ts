import rawCards from "./data.json"; // Static import

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
