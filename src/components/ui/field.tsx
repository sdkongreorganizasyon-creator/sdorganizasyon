import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldShellProps = Readonly<{
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}>;

export function FieldShell({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: FieldShellProps) {
  const descriptionId = `${htmlFor}-description`;

  return (
    <div className="field">
      <label htmlFor={htmlFor}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={descriptionId}>
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint" id={descriptionId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextInput({
  label,
  error,
  hint,
  id,
  name,
  required,
  ...props
}: TextInputProps) {
  const fieldId = id ?? name ?? "field";

  return (
    <FieldShell
      error={error}
      hint={hint}
      htmlFor={fieldId}
      label={label}
      required={required}
    >
      <input
        aria-describedby={error || hint ? `${fieldId}-description` : undefined}
        aria-invalid={Boolean(error)}
        id={fieldId}
        name={name}
        required={required}
        {...props}
      />
    </FieldShell>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Textarea({
  label,
  error,
  hint,
  id,
  name,
  required,
  ...props
}: TextareaProps) {
  const fieldId = id ?? name ?? "textarea";

  return (
    <FieldShell
      error={error}
      hint={hint}
      htmlFor={fieldId}
      label={label}
      required={required}
    >
      <textarea
        aria-describedby={error || hint ? `${fieldId}-description` : undefined}
        aria-invalid={Boolean(error)}
        id={fieldId}
        name={name}
        required={required}
        {...props}
      />
    </FieldShell>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Select({
  label,
  error,
  hint,
  id,
  name,
  required,
  children,
  ...props
}: SelectProps) {
  const fieldId = id ?? name ?? "select";

  return (
    <FieldShell
      error={error}
      hint={hint}
      htmlFor={fieldId}
      label={label}
      required={required}
    >
      <select
        aria-describedby={error || hint ? `${fieldId}-description` : undefined}
        aria-invalid={Boolean(error)}
        id={fieldId}
        name={name}
        required={required}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
