"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitContact } from "@/app/contact/actions";
import type {
  ContactFormState,
  ContactFormValues,
} from "@/app/contact/form-state";

const initialState: ContactFormState = {
  status: "idle",
  values: {
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  },
  errors: {},
};

type ContactField = keyof ContactFormValues;

export function ContactForm() {
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState(initialState.values);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const nextState = await submitContact(state, formData);
      setState(nextState);
    });
  }

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function fieldError(field: ContactField): string | undefined {
    const error = state.errors[field];
    return values[field] === state.values[field] ? error : undefined;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input
            autoComplete="name"
            id="contact-name"
            maxLength={100}
            name="name"
            onChange={(event) =>
              updateField("name", event.currentTarget.value)
            }
            required
            value={values.name}
            aria-describedby={fieldError("name") ? "contact-name-error" : undefined}
            aria-invalid={Boolean(fieldError("name"))}
          />
          {fieldError("name") && (
            <p className="form-field-error" id="contact-name-error">
              {fieldError("name")}
            </p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input
            autoComplete="email"
            id="contact-email"
            maxLength={254}
            name="email"
            onChange={(event) =>
              updateField("email", event.currentTarget.value)
            }
            required
            type="email"
            value={values.email}
            aria-describedby={
              fieldError("email") ? "contact-email-error" : undefined
            }
            aria-invalid={Boolean(fieldError("email"))}
          />
          {fieldError("email") && (
            <p className="form-field-error" id="contact-email-error">
              {fieldError("email")}
            </p>
          )}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contact-inquiry-type">Inquiry Type</label>
        <select
          id="contact-inquiry-type"
          name="inquiryType"
          onChange={(event) =>
            updateField("inquiryType", event.currentTarget.value)
          }
          required
          value={values.inquiryType}
          aria-describedby={
            fieldError("inquiryType")
              ? "contact-inquiry-type-error"
              : undefined
          }
          aria-invalid={Boolean(fieldError("inquiryType"))}
        >
          <option value="">Choose an inquiry type</option>
          <option value="general">General question</option>
          <option value="technical-feedback">Technical feedback</option>
          <option value="bug-report">Bug report</option>
          <option value="research-discussion">Research discussion</option>
          <option value="collaboration">Collaboration</option>
        </select>
        {fieldError("inquiryType") && (
          <p className="form-field-error" id="contact-inquiry-type-error">
            {fieldError("inquiryType")}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          maxLength={5000}
          minLength={10}
          name="message"
          onChange={(event) =>
            updateField("message", event.currentTarget.value)
          }
          required
          rows={7}
          value={values.message}
          aria-describedby={
            fieldError("message") ? "contact-message-error" : undefined
          }
          aria-invalid={Boolean(fieldError("message"))}
        />
        {fieldError("message") && (
          <p className="form-field-error" id="contact-message-error">
            {fieldError("message")}
          </p>
        )}
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className={
            state.status === "invalid"
              ? "form-status form-status-error"
              : "form-status"
          }
          role={state.status === "invalid" ? "alert" : "status"}
        >
          {state.message}
        </p>
      )}

      <button className="contact-submit" disabled={isPending} type="submit">
        {isPending ? "Checking message…" : "Submit message"}
      </button>
    </form>
  );
}
