export default defineEventHandler(async (event) => {
  const { providerId, watchId, num: episode, id, subType } = getQuery(event);
  const url = `https://api.anify.tv/sources?providerId=${providerId}&watchId=${watchId}&num=${episode}&id=${id}&subType=${subType}`

  const response = await fetch(url);

  if (!response.ok) {
    console.error(`API call failed with status: ${response.status}`);
    if (response.status === 502 || response.status === 505) {
      console.error("Error: Bad Gateway or HTTP Version Not Supported");
    }
    throw new Error(`API call failed with status: ${response.status}`);
  }

  const data = await response.json();

  const modifiedSources = data.sources.map((source: { url: string; }) => {
    const modifiedUrl = source.url.replace('anify.anistreme.live', 'm3u8.pyth0n.software');
    return { ...source, url: modifiedUrl };
  });
  return { ...data, sources: modifiedSources };
});
  