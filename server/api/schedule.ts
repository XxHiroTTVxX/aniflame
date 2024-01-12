export default defineEventHandler(async (event) => {
  const url = "https://api.anify.tv/schedule";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
  const data = await response.json();

  return data;
})
