import Asset from 'types/Asset';

export default async function handler(req, res) {
  const response = await fetch(
    `https://api.opensea.io/api/v1/assets?limit=${req.query.limit}&offset=${req.query.offset}&owner=${req.query.owner}`,
    {
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      },
    },
  );

  const data: { assets: Asset[] } = await response.json();

  res.json(data);
}
