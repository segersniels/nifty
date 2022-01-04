/* eslint-disable @typescript-eslint/naming-convention */
interface Asset {
  id: number;
  token_id: string;
  name: string;
  image_url: string;
  permalink: string;
  owner: {
    user: {
      username: string;
    };
  };
  collection: {
    slug: string;
    name: string;
  };
  last_sale?: {
    total_price: number;
  };
}

export default Asset;
