interface Product {
  id: number;
  name: string;
  category: string;
  parentCategory: string;
  lowestPrice: number;
  description: string;
  thumbnailUrl: string;
  slug: string;
  images: Array<ProductImage>;
  variations: Array<Variation>;
}

interface ProductItem {
  id: number;
  productName: string;
  name: string;
  category: string;
  quantityInStock: number;
  price: number;
  slug: string;
  imageUrl: string;
  releaseYear: number;
  configurations: Array<Configuration>;
  attributes: Array<ProductAttribute>;
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
  value: string;
}

interface Category {
  id: number;
  name: string;
  parentCategory: string;
  urlKey: string;
  thumbnailUrl: string;
}

interface Variation {
  id: number;
  name: string;
  options: Array<VariationOption>;
}

interface VariationOption {
  id: number;
  value: string;
  imageUrl: string;
}

export type {
  Product,
  Category,
  Variation,
  VariationOption,
  Option,
  ProductItem,
  Configuration,
  ProductImage,
  ProductAttribute,
};
