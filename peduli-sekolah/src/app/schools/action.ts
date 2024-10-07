export const getSchools = async () => {
  const response = await fetch("http://localhost:3000/api/schools");

  const data = await response.json();

  return data;
};
