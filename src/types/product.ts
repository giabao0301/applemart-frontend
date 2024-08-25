interface Product {
    id: number;
    name: string;
    lowestPrice: number;
    description: string;
    imageUrl: string;
    slug: string;
    category: Category;
}

interface Category {
    id: number;
    name: string;
    variations: Array<Variation>;
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

export type { Product, Category, Variation, Option };