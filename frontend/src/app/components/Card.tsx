import { useState } from "react";
import { CardType } from "../data/card";
import styles from "../styles/card.module.css";

interface CardProps {
  card: CardType;
  onStatusChange?: (id: string, newStatus: CardType["status"]) => void;
}

export default function Card({ card, onStatusChange }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    if (onStatusChange) {
      onStatusChange(card.id, e.target.value as CardType["status"]);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card} onClick={handleCardClick}>
        <div className={`${styles.cardInner} ${flipped ? styles.flipped : ""}`}>
          <div className={styles.front}>
            <h2>{card.title}</h2>
            <p>
              <strong>Topic:</strong> {card.topic}
            </p>
            <p>
              <em>Click to view more</em>
            </p>
          </div>

          <div className={styles.back}>
            <h3>{card.title}</h3>
            <p>{card.content}</p>
          </div>
        </div>
      </div>

      {onStatusChange && (
        <div className={styles.statusButtons}>
          {card.status !== "completed" && (
            <button
              className={styles.statusButton}
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(card.id, "completed");
              }}
            >
              Mark as Completed
            </button>
          )}
          {card.status !== "incomplete" && (
            <button
              className={styles.statusButton}
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(card.id, "incomplete");
              }}
            >
              Mark as Incomplete
            </button>
          )}
          {card.status !== "review" && (
            <button
              className={styles.statusButton}
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(card.id, "review");
              }}
            >
              Mark for Review
            </button>
          )}
        </div>
      )}
    </div>
  );
}
