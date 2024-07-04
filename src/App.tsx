import React, { useEffect, useState } from "react";
import { Button, Container, Tab, Tabs } from "@mui/material";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { Product } from "./models/Product";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { CreateProductData, ReadProductData } from "./utils/CRUD";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    ReadProductData((products) => {
      setProducts(products);
    });
  }, [value]);

  const handleAddProduct = (product: Product) => {
    CreateProductData(product);
    setValue(1);
  };

  const handleNewProduct = () => {
    setValue(0);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h1>Gerenciador de Produtos</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        centered
      >
        <Tab icon={<BorderColorIcon />} label="REGISTRAR" />
        <Tab icon={<FormatListBulletedIcon />} label="LISTAGEM" />
      </Tabs>
      {value === 0 && (
        <div>
          <ProductForm onSubmit={handleAddProduct} />
        </div>
      )}
      {value === 1 && (
        <div>
          {products.length > 0 ? (
            <ProductList products={products} onNewProduct={handleNewProduct} />
          ) : (
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <h1>Nenhum produto cadastrado</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewProduct}
              >
                Cadastrar Novo Produto
              </Button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default App;
