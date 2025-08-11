export interface ValidationErrors {
  title?: string;
  topic?: string;
  content?: string;
}

export const validateAddCardFields = (
  name: string,
  value: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (name === "title") {
    if (!value.trim()) {
      errors.title = "Title is required";
    } else if (value.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long";
    } else {
      errors.title = "";
    }
  }

  if (name === "topic") {
    if (!value.trim()) {
      errors.topic = "Topic is required";
    } else if (value.trim().length < 3) {
      errors.topic = "Topic must be at least 3 characters long";
    } else {
      errors.topic = "";
    }
  }

  if (name === "content") {
    if (!value.trim()) {
      errors.content = "Content is required";
    } else if (value.trim().length < 10) {
      errors.content = "Content must be at least 10 characters long";
    } else {
      errors.content = "";
    }
  }

  return errors;
};

export const validateAddTopicFields = (value: string) => {
  if (!value.trim()) {
    return "Topic name is required.";
  } else if (value.trim().length < 3) {
    return "Topic must be at least 3 characters.";
  }
  return "";
};
