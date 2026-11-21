type StoredOrder = Record<string, unknown>;

const ORDERS: Record<string, StoredOrder> = {};

export function registerOrder(orderNumber: string, order: StoredOrder) {
  ORDERS[orderNumber] = order;
}

export function getOrder(orderNumber: string): StoredOrder | undefined {
  return ORDERS[orderNumber];
}

export { ORDERS };
