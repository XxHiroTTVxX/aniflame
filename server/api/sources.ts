
export default defineEventHandler(async (event) => {

    const { providerId, watchId, episodeNumber: episode, id, subType } = getQuery(event);
  
    
  const response = await fetch(
      `https://anify.tv/sources?providerId=${providerId}&watchId=${watchId}&episodeNumber=${episode}&id=${id}&subType=${subType}`
    );
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  });
  