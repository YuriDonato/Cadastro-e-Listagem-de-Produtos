export interface Product {
  id?: string;
  name: string;
  description?: string;
  value: number;
  available: boolean;
}

export const emptyProduct: Product = {
  name: "",
  description: "",
  value: 0,
  available: false,
};