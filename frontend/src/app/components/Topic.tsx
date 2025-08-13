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
    alert(`Selected Topic: ${topicName}`);
    router.push(`/topic/${topicName}`);
  };

  const handleCreateCardClick = () => {
    router.push("/addCard");
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

      <button className="create-button" onClick={handleCreateCardClick}>
        Create Flash Card
      </button>
    </div>
  );
}
