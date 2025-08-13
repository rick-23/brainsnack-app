"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateAddTopicFields } from "../utils/validationUtils";
import { useTopics } from "../hooks/useTopics";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/addCard.css";

export default function AddTopicPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const { addTopic, isLoading } = useTopics();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setError(validateAddTopicFields(value));
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateAddTopicFields(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    addTopic.mutate(
      { name: name.trim() },
      {
        onSuccess: () => {
          setName("");
          setError("");
          setSuccess("Topic added successfully!");
          setTimeout(() => {
            router.push("/");
          }, 1500);
        },
      }
    );
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Topic</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <input
        name="topic"
        placeholder="Topic name"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" disabled={!name.trim() || !!error || isLoading}>
        Add Topic
      </button>
    </form>
  );
}
