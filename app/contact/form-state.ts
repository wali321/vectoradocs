export type ContactFormValues = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
};

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

export type ContactFormState = {
  status: "idle" | "invalid" | "unconfigured";
  values: ContactFormValues;
  errors: ContactFieldErrors;
  message?: string;
};
