/* eslint-disable @typescript-eslint/naming-convention */
interface Asset {
  id: number;
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
  };
  last_sale?: {
    total_price: number;
  };
}

export default Asset;
