import rawTopics from "./topicData.json";

export type TopicType = {
  name: string;
};

const topics: TopicType[] = rawTopics as TopicType[];

export const getTopics = (): TopicType[] => topics;

export const addTopic = (topic: TopicType) => {
  if (!topics.find((t) => t.name === topic.name)) {
    topics.push(topic);
  }
};
