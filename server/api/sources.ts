export default defineEventHandler(async (event) => {
  const { providerId, watchId, episodeNumber: episode, id, subType } = getQuery(event);

  const response = await fetch(
    `https://api.anify.tv/sources?providerId=${providerId}&watchId=${watchId}&episodeNumber=${episode}&id=${id}&subType=${subType}`
  );

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  const data = await response.json();

  const modifiedSources = data.sources.map((source: { url: string; }) => {
    const modifiedUrl = source.url.replace('anify.anistreme.live', 'm3u8.pyth0n.software');
    return { ...source, url: modifiedUrl };
  });
  return { ...data, sources: modifiedSources };
});
  