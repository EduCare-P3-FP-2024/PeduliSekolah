const url = process.env.NEXTAUTH_URL;

export const getUser = async (token: string) => {
  const response = await fetch(`${url}/api/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  console.log(data, "INI DARI ACTION TS");

  return data;
};
