"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTopic } from "../data/topic";
import { validateAddTopicFields } from "../utils/validationUtils";
import "../styles/addCard.css";

export default function AddTopicPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

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

    addTopic({ name: name.trim() });
    setName("");
    setError("");
    setSuccess("Topic added successfully!");

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Topic</h1>
      {error && <p>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <input
        name="topic"
        placeholder="Topic name"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" disabled={!name.trim() || !!error}>
        Add Topic
      </button>
    </form>
  );
}
