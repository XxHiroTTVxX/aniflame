export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const url = `https://api.anify.tv/content-metadata/${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`API call failed with status: ${response.status}`);
    if (response.status === 502 || response.status === 505) {
      console.error("Error: Bad Gateway or HTTP Version Not Supported");
    }
    throw new Error(`API call failed with status: ${response.status}`);
  }

  const data = await response.json();

  return data;

})
