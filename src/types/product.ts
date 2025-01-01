export interface Product {
  id: number;
  name: string;
  category: string;
  parentCategory: string;
  lowestPrice: number;
  description: string;
  thumbnailUrl: string;
  slug: string;
  images: Array<ProductImage>;
}

export interface ProductFormData {
  id: number;
  name: string;
  category: string;
  lowestPrice: number;
  description: string;
  thumbnailUrl: string;
  images: Array<ProductImage>;
}

export interface ProductItem {
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

export interface ProductImage {
  id: number;
  url: string;
}

export interface Configuration {
  variationOption: Option;
}

export interface Option {
  id: number;
  name: string;
  value: string;
  imageUrl: string;
}

export interface ProductAttribute {
  id: number;
  value: string;
}

export interface Category {
  id: number;
  name: string;
  parentCategory: string;
  urlKey: string;
  thumbnailUrl: string;
  variations: Array<Variation>;
}

export interface Variation {
  id: number;
  name: string;
  options: Array<VariationOption>;
}

export interface VariationOption {
  id: number;
  value: string;
  imageUrl: string;
}

export interface ProductStats {
  totalProductItems: number;
  totalCategories: number;
}
