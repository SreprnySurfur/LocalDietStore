export type GetOrders = Orders[];

export type Orders = {
  id: string;
  datetime: string;
  from_date: string;
  to_date: string;
  dietId: number;
  userId: number;
  _debug: string;
};
