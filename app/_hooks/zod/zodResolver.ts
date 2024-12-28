/* eslint-disable @typescript-eslint/no-explicit-any */

export const ZodResolver = (schema: any) => {
  return async (values: any) => {
    try {
      const parsedValues = await schema.parseAsync(values);
      console.log({ parsedValues });

      return {
        values: parsedValues,
        errors: {},
      };
    } catch (error: any) {
      const zodErrors = error.formErrors.fieldErrors;

      const formattedErrors: { [key: string]: { message: string } } =
        Object.keys(zodErrors).reduce((acc, fieldName) => {
          acc[fieldName] = {
            message: zodErrors[fieldName]?.[0] || "Field is invalid",
          };
          return acc;
        }, {} as { [key: string]: { message: string } });

      return {
        values: {},
        errors: formattedErrors,
      };
    }
  };
};
