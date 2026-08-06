import type {
  FieldErrors,
  FieldValues,
  Resolver,
} from "react-hook-form";
import type { ZodType } from "zod";

export function zodResolver<TFieldValues extends FieldValues>(
  schema: ZodType<TFieldValues>,
): Resolver<TFieldValues> {
  return async (values) => {
    const result = await schema.safeParseAsync(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const errors: Record<string, { type: string; message: string }> = {};

    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!path || errors[path]) continue;

      errors[path] = {
        type: issue.code,
        message: issue.message,
      };
    }

    return {
      values: {},
      errors: errors as FieldErrors<TFieldValues>,
    };
  };
}
