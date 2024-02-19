export const convertToUppercase = (string) => {
  return (
    string.slice(0, 1).toUpperCase() + string.slice(1, string.length)
  ).replace("_", " ");
};

export const pluralToSingular = (string) => {
  if (string[string.length - 1] === "s") {
    return string.slice(0, string.length - 1);
  }
};
