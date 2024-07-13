// src/utils/formatDate.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
