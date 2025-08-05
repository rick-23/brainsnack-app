export interface CardType {
  id: string;
  title: string;
  topic: string;
  content: string;
  status: "completed" | "incomplete" | "review";
}
