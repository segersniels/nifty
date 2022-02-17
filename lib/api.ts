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

export const fetchCollections = async (slugs: string[]) => {
  const responses = await Promise.all(
    slugs.map(async (slug) => {
      const response = await fetch(
        `https://api.opensea.io/api/v1/collection/${slug}`,
      );
      const { collection }: { collection: Collection } = await response.json();

      return collection;
    }),
  );

  return responses.flat();
};
