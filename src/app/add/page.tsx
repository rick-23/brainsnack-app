// app/add/page.tsx
"use client";
import { FormEvent, useState } from "react";
import { addCard } from "../data/storage";

export default function AddCardPage() {
  const [form, setForm] = useState({ title: "", topic: "", content: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, topic, content } = form;

    if (!title || !topic || !content) {
      setError("All fields are required.");
      return;
    }

    addCard({ title, topic, content });
    setForm({ title: "", topic: "", content: "" });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Card</h1>
      {error && <p>{error}</p>}
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Topic"
        onChange={(e) => setForm({ ...form, topic: e.target.value })}
      />
      <textarea
        placeholder="Content"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button type="submit">Add Card</button>
    </form>
  );
}
