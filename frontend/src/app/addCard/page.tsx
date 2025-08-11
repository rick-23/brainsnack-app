"use client";
import { FormEvent, useState, useEffect } from "react";
import { addCard } from "../data/storage";
import { validateAddCardFields } from "../utils/validationUtils";
import { getTopics, TopicType } from "../data/topic";
import "../styles/addCard.css";

export default function AddCardPage() {
  const [form, setForm] = useState({ title: "", topic: "", content: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [topics, setTopics] = useState<TopicType[]>([]);

  useEffect(() => {
    setTopics(getTopics()); // load topics on mount
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    const fieldErrors = validateAddCardFields(name, value);
    setErrors((prev) => ({ ...prev, ...fieldErrors }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleErrors = validateAddCardFields("title", form.title);
    const topicErrors = validateAddCardFields("topic", form.topic);
    const contentErrors = validateAddCardFields("content", form.content);

    const combinedErrors = {
      ...titleErrors,
      ...topicErrors,
      ...contentErrors,
    };

    const hasErrors = Object.values(combinedErrors).some((err) => err);

    if (hasErrors) {
      setErrors(combinedErrors);
      return;
    }

    addCard(form);
    setForm({ title: "", topic: "", content: "" });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Card</h1>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      {errors.title && <p>{errors.title}</p>}

      <select name="topic" value={form.topic} onChange={handleChange}>
        <option value="">-- Select a topic --</option>
        {topics.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
      {errors.topic && <p>{errors.topic}</p>}

      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
      />
      {errors.content && <p>{errors.content}</p>}

      <button type="submit">Add Card</button>
    </form>
  );
}
