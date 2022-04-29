import { ethers } from 'ethers';
import Asset from 'types/Asset';

export default async function handler(req, res) {
  let { owner } = req.query;

  if (owner.endsWith('.eth')) {
    const provider = new ethers.providers.CloudflareProvider();
    owner = await provider.resolveName(owner);
  }

  const response = await fetch(
    `https://api.opensea.io/api/v1/assets?limit=${req.query.limit}&offset=${
      req.query.offset
    }&owner=${owner.toLowerCase()}`,
    {
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      },
    },
  );

  const data: { assets: Asset[] } = await response.json();

  res.json(data);
}
