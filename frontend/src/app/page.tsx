"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllCards } from "@/app/data/card";
import { CardType } from "./data/card";
import { getTopics, TopicType } from "./data/topic";
import "./styles/homePage.css";

export default function HomePage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [topics, setTopics] = useState<TopicType[]>([]);
  const cards = getAllCards().filter((card: CardType) =>
    statusFilter ? card.status === statusFilter : true
  );
  const router = useRouter();

  useEffect(() => {
    setTopics(getTopics());
  }, []);

  const handleTopicClick = (topicName: string) => {
    alert(`Selected Topic: ${topicName}`);
    router.push(`/topic/${topicName}`);
  };

  const handleCreateCardClick = () => {
    router.push("/add-card");
  };

  return (
    <div className="home-container">
      <h1>Select a Topic:</h1>
      <div className="topic-buttons">
        {topics.length === 0 ? (
          <p>No topics available. Add one first!</p>
        ) : (
          topics.map((topic) => (
            <button
              key={topic.name}
              className="topic-button"
              onClick={() => handleTopicClick(topic.name)}
            >
              {topic.name}
            </button>
          ))
        )}
      </div>

      <button className="create-button" onClick={handleCreateCardClick}>
        Create Flash Card
      </button>
    </div>
  );
}
