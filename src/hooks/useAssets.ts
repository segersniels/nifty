import { fetchAssets, fetchCollections } from 'lib/api';
import { useCallback, useEffect, useState } from 'react';
import { useIntervalWhen, usePreviousImmediate } from 'rooks';
import Asset from 'types/Asset';
import Collection from 'types/Collection';

const useOpenSeaData = (address: string) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [worth, setWorth] = useState(0);
  const previousAddress = usePreviousImmediate(address);

  const calculateWorth = useCallback(
    (assets: Asset[], collections: Collection[]) => {
      const floorPriceBySlug = new Map(
        collections.map((collection) => [
          collection.slug,
          collection.stats.floor_price,
        ]),
      );

      setWorth(
        assets.reduce(
          (total, asset) =>
            total + floorPriceBySlug.get(asset.collection.slug) ?? 0,
          0,
        ),
      );
    },
    [],
  );

  const fetch = useCallback(
    async (isInitialFetch = false) => {
      const data: { assets: Asset[]; collections: Collection[] } = {
        assets: [],
        collections: [],
      };
      const batches = fetchAssets(address);

      for await (const batch of batches) {
        // Fetch collections
        const slugsToFetch = Array.from(
          new Set(batch.map((asset) => asset.collection.slug)),
        );
        data.collections = [
          ...data.collections,
          ...(await fetchCollections(slugsToFetch)),
        ];

        for (const asset of batch) {
          const collection = data.collections.find(
            (c) => c.slug === asset.collection.slug,
          );

          if (!collection) {
            continue;
          }

          asset.collection.stats = collection.stats;
          data.assets.push(asset);
        }

        // Add data as we go per batch on initial fetch
        if (isInitialFetch) {
          setAssets(
            Array.from(
              new Map(data.assets.map((asset) => [asset.id, asset])).values(),
            ),
          );
        }
      }

      // When refreshing update data in one single chunk (data is already visible from previous fetch)
      if (!isInitialFetch) {
        setAssets(
          Array.from(
            new Map(data.assets.map((asset) => [asset.id, asset])).values(),
          ),
        );
      }

      // Calculate worth after batches have been processed
      calculateWorth(data.assets, data.collections);
    },
    [address, calculateWorth],
  );

  useIntervalWhen(
    () => {
      fetch();
    },
    10000,
    true,
    false,
  );

  useEffect(() => {
    if (previousAddress === address) {
      return;
    }

    // Reset worth while fetching new data
    setWorth(0);

    // Fetch initial data on address change
    fetch(true);
  }, [previousAddress, address, fetch]);

  return {
    assets,
    worth,
  };
};

export default useOpenSeaData;
