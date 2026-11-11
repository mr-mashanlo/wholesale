type Error = { name: string, message: string };
type Acc = Record<string, Record<string, string>>;

export const mapServerErrors = ( errors: Array<Error> ) => {
  return errors.reduce( ( acc: Acc, error: Error ) => {
    acc[error.name] = { field: error.name, message: error.message };
    return acc;
  }, {} );
};