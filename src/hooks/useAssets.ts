import { fetchAssets, fetchCollections } from 'lib/api';
import { useCallback, useEffect, useState } from 'react';
import { useIntervalWhen, usePreviousImmediate } from 'rooks';
import Asset from 'types/Asset';
import Collection from 'types/Collection';

const useOpenSeaData = (address: string) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [worth, setWorth] = useState(0);
  const [ethereumWorth, setEthereumWorth] = useState(0);
  const previousAddress = usePreviousImmediate(address);

  const fetch = useCallback(async () => {
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

      // Add data as we go per batch
      setCollections(
        Array.from(
          new Map(
            data.collections.map((collection) => [collection.slug, collection]),
          ).values(),
        ),
      );

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

      // Add data as we go per batch
      setAssets(
        Array.from(
          new Map(data.assets.map((asset) => [asset.id, asset])).values(),
        ),
      );
    }

    setCollections(
      Array.from(
        new Map(
          data.collections.map((collection) => [collection.slug, collection]),
        ).values(),
      ),
    );
  }, [address]);

  useEffect(() => {
    let value = 0;

    const amountBySlug = Array.from(assets.values()).reduce((total, asset) => {
      const slug = asset.collection.slug;

      // Already have the slug so increment
      if (total[slug]) {
        return {
          ...total,
          [slug]: total[slug] + 1,
        };
      }

      return {
        ...total,
        [slug]: 1,
      };
    }, {} as Record<string, number>);

    for (const collection of Array.from(collections.values())) {
      value +=
        amountBySlug[collection.slug] *
        collection.payment_tokens[0].usd_price *
        collection.stats.floor_price;
    }

    const floorPriceBySlug = new Map(
      Array.from(collections.values()).map((collection) => [
        collection.slug,
        collection.stats.floor_price,
      ]),
    );

    setEthereumWorth(
      Array.from(assets.values()).reduce(
        (total, asset) =>
          total + floorPriceBySlug.get(asset.collection.slug) ?? 0,
        0,
      ),
    );

    setWorth(value);
  }, [assets, collections]);

  useIntervalWhen(
    () => {
      fetch();
    },
    10000,
    true,
    true,
  );

  useEffect(() => {
    if (!previousAddress || previousAddress === address) {
      return;
    }

    fetch();
  }, [previousAddress, address, fetch]);

  return {
    assets,
    worth,
    ethereumWorth,
  };
};

export default useOpenSeaData;
