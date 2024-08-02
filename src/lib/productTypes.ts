export type Product = {
    id: number;
    name: string;
    handle: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    listPrice: number;
    color?: string;
    label?: string;
    url: string;
    imageUrl: string;
    alternateImages: string[];
  };