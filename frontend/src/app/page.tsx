"use client";
import { useState } from "react";
import { getAllCards } from "@/app/data/card";
import Card from "./components/Card";
import { CardType } from "./data/card";

export default function HomePage() {
  const [statusFilter, setStatusFilter] = useState("");

  const cards = getAllCards().filter((card: CardType) =>
    statusFilter ? card.status === statusFilter : true
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Cards</h1>

      <label htmlFor="filter">Filter by status:</label>
      <select
        id="filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ margin: "1rem 0", display: "block" }}
      >
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
        <option value="review">Review</option>
      </select>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {cards.map((card: CardType) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
