import Asset from 'types/Asset';
import Collection from 'types/Collection';

export async function* fetchAssets(address: string) {
  const limit = 50;
  let offset = 0,
    previousLength = 0;

  do {
    try {
      const response = await fetch(
        `/api/assets?limit=${limit}&offset=${offset}&owner=${address}`,
      );

      const data: { assets: Asset[] } = await response.json();
      previousLength = data.assets.length;
      offset += limit;

      yield data.assets;
    } catch (err) {
      break;
    }
  } while (previousLength === limit);
}

function sleep(timeInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
}

export const fetchCollections = async (slugs: string[]) => {
  const collections: Collection[] = [];

  try {
    for (const slug of slugs) {
      const response = await fetch(`/api/collections?slug=${slug}`);
      const data: { collection: Collection } = await response.json();

      if (!data.collection) {
        continue;
      }

      collections.push(data.collection);
      await sleep(500);
    }

    return collections;
  } catch (err) {
    return [];
  }
};
