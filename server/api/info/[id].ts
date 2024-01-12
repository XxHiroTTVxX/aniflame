export default defineEventHandler(async (event) => {
  // Assuming `event` contains the `id` parameter
  const id = getRouterParam(event, "id");
  if (!id) {
    throw new Error("ID parameter is required");
  }

  const response = await fetch(`https://api.anify.tv/info/${id}`);
  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  const data = await response.json();

  return data;
});
