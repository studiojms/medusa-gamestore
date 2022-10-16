import { Product, Cart, ProductVariant, ProductOption, LineItem, Item, ProductOptionValue } from '@medusajs/medusa';

export interface IProduct extends Omit<Product, 'beforeInsert'> {}
export interface ICart extends Omit<Cart, 'refundable_amount' | 'refunded_total'> {}
export interface IProductVariant extends ProductVariant {}
export interface IProductOption extends ProductOption {}
export interface IProductOptionValue extends ProductOptionValue {}
export interface ILineItem extends LineItem {}
export interface IItem extends Item {}
