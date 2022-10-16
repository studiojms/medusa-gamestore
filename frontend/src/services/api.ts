import { StorePostCartReq, StorePostCartsCartReq, StorePostCartsCartLineItemsReq } from '@medusajs/medusa';
import Medusa from '@medusajs/medusa-js';

let baseUrl = 'http://localhost:9000';

if (import.meta.env.STORE_URL) {
  baseUrl = import.meta.env.STORE_URL;
}

const medusa = new Medusa({ baseUrl, maxRetries: 3 });

export default {
  products: {
    async get(productId: string) {
      return await medusa.products.retrieve(productId);
    },
    async list() {
      return await medusa.products.list();
    },
  },
  carts: {
    async get(cartId: string) {
      return await medusa.carts.retrieve(cartId);
    },
    async create(data: StorePostCartReq) {
      const cart = await medusa.carts.create(data);
      return cart.cart;
    },
    async update(cartId: string, data: StorePostCartsCartReq) {
      const cart = await medusa.carts.update(cartId, data);
      return cart.cart;
    },
    async addItem(cartId: string, data: StorePostCartsCartLineItemsReq) {
      const cart = await medusa.carts.lineItems.create(cartId, data);
      return cart.cart;
    },
    async updateItem(cartId: string, itemId: string, data: StorePostCartsCartLineItemsReq) {
      const cart = await medusa.carts.lineItems.update(cartId, itemId, data);
      return cart.cart;
    },
    async removeItem(cartId: string, itemId: string) {
      const cart = await medusa.carts.lineItems.delete(cartId, itemId);
      return cart.cart;
    },
    async completeCart(cartId: string) {
      const cart = await medusa.carts.complete(cartId);
      return cart.data;
    },
    async createPaymentSession(cartId: string) {
      const cart = await medusa.carts.createPaymentSessions(cartId);
      return cart.cart;
    },
    async removePaymentSession(cartId: string, providerId: string) {
      const cart = await medusa.carts.deletePaymentSession(cartId, providerId);
      return cart.cart;
    },
    async setPaymentSession(cartId: string, providerId: string) {
      const cart = await medusa.carts.setPaymentSession(cartId, {
        provider_id: providerId,
      });
      return cart.cart;
    },
  },
};
