/* eslint-disable @typescript-eslint/naming-convention */
interface Collection {
  payment_tokens: {
    usd_price: number;
  }[];
  stats: {
    floor_price: number;
    average_price: number;
    one_day_average_price: number;
    one_day_sales: number;
    seven_day_average_price: number;
  };
}

export default Collection;
