export default defineEventHandler(async (event) => {
  // Assuming `event` contains the `id` parameter
  const id = getRouterParam(event, "id");
  const url = `https://api.anify.tv/info/${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  const data = await response.json();

  return data;
});
