import Collection from 'types/Collection';

export default async function handler(req, res) {
  const { slug } = req.query;

  const response = await fetch(
    `https://api.opensea.io/api/v1/collection/${slug}`,
    {
      cache: 'no-cache',
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      },
    },
  );

  const data: { collection: Collection } = await response.json();

  res.json(data);
}
