"use server";

import type {
  ContactFieldErrors,
  ContactFormState,
  ContactFormValues,
} from "./form-state";

const inquiryTypes = new Set([
  "general",
  "technical-feedback",
  "bug-report",
  "research-discussion",
  "collaboration",
]);

function readString(formData: FormData, key: keyof ContactFormValues): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: ContactFormValues = {
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    inquiryType: readString(formData, "inquiryType"),
    message: readString(formData, "message"),
  };
  const errors: ContactFieldErrors = {};

  if (!values.name) {
    errors.name = "Enter your name.";
  } else if (values.name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (!values.email) {
    errors.email = "Enter your email address.";
  } else if (
    values.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (!inquiryTypes.has(values.inquiryType)) {
    errors.inquiryType = "Choose an inquiry type.";
  }

  if (!values.message) {
    errors.message = "Enter a message.";
  } else if (values.message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (values.message.length > 5000) {
    errors.message = "Message must be 5,000 characters or fewer.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "invalid",
      values,
      errors,
      message: "Review the marked fields and try again.",
    };
  }

  return {
    status: "unconfigured",
    values,
    errors: {},
    message:
      "Message delivery is not configured. No message was sent or stored.",
  };
}
