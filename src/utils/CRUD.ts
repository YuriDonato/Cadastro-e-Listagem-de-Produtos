import { Product, emptyProduct } from "../models/Product";
import * as db from "../services/firebase";

export function CreateProductData(newProduct: Partial<Product>) {
  const newKey = db.push(db.child(db.ref(db.database), `/products`)).key;

  if (newKey) {
    db.set(db.ref(db.database, `/products/${newKey}`), {
      name: newProduct.name,
      description: newProduct.description,
      value: newProduct.value,
      available: newProduct.available,
    });
  }
}

export function ReadProductData(callback: (products: Product[]) => void) {
  const ref = db.ref(db.database, `/products`);

  db.onValue(ref, (snapshot) => {
    const resultProducts = Object.entries<Product>(snapshot.val() ?? {}).map(
      ([key, value]) => ({
        id: key,
        name: value.name,
        description: value.description,
        value: value.value,
        available: value.available,
      })
    );
    callback(resultProducts);
  });
}

export function UpdateProductData(productId: string, updatedProduct: Partial<Product>) {
  const refProduct = db.ref(db.database, `/products/${productId}`);

  return db.update(refProduct, {
    name: updatedProduct.name,
    description: updatedProduct.description,
    value: updatedProduct.value,
    available: updatedProduct.available,
  });
}

export function DeleteProductData(productId: string) {
  db.remove(db.ref(db.database, `/products/${productId}`));
}

export function getProductCounter(): Promise<number> {
  return new Promise((resolve, reject) => {
    const refProducts = db.ref(db.database, `/products`);

    db.onValue(
      refProducts,
      (snapshot) => {
        const productsData = snapshot.val();
        if (productsData) {
          resolve(Object.keys(productsData).length);
        } else {
          resolve(0);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}
