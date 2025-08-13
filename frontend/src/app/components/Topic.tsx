import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { TopicType } from "../data/topic";
import LoadingSpinner from "./LoadingSpinner";

export default function Topic() {
  const router = useRouter();
  const { topics, loadingTopics } = useSelector(
    (state: any) => state.brainSnack
  );

  const handleTopicClick = (topicName: string) => {
    router.push(`/topic/${topicName}`);
  };

  const handleCreateCardClick = () => {
    router.push("/addCard");
  };

  const handleAddTopicClick = () => {
    router.push("/addTopic");
  };

  if (loadingTopics) return <LoadingSpinner />;

  return (
    <div>
      <h1>Select a Topic:</h1>

      <div className="topic-buttons">
        {topics.length === 0 ? (
          <p>No topics available. Add one first!</p>
        ) : (
          topics.map((topic: TopicType) => (
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

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button className="create-button" onClick={handleCreateCardClick}>
          Create Flash Card
        </button>
        <button className="create-button" onClick={handleAddTopicClick}>
          Add Topic
        </button>
      </div>
    </div>
  );
}
