interface Product {
  id: number;
  name: string;
  lowestPrice: number;
  description: string;
  imageUrl: string;
  slug: string;
  category: string;
  variations: Array<Variation>;
}

interface ProductItem {
  id: number;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  slug: string;
  images: Array<ProductImage>;
  configurations: Array<Configuration>;
}

interface ProductImage {
  id: number;
  url: string;
}

interface Configuration {
  variationOption: Option;
}

interface Option {
  id: number;
  name: string;
  value: string;
  imageUrl: string;
}

interface ProductAttribute {
  id: number;
  key: string;
  value: string;
}

interface Category {
  id: number;
  name: string;
  urlKey: string;
  imageUrl: string;
}

interface Variation {
  id: number;
  name: string;
  options: Array<Option>;
}

interface Option {
  id: number;
  value: string;
  imageUrl: string;
}

export type {
  Product,
  Category,
  Variation,
  Option,
  ProductItem,
  Configuration,
  ProductImage,
  ProductAttribute,
};
