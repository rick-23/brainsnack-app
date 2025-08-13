"use client";
import { useParams } from "next/navigation";
import TopicContent from "@/app/components/TopicContent";

export default function TopicPage() {
  const { topic } = useParams();
  const topicName = decodeURIComponent(topic as string);

  return <TopicContent topicName={topicName} />;
}
