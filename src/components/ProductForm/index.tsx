import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Grid,
  List,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { Product } from "../../models/Product";

const ListContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(2),
}));

const FormContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ProductForm: React.FC<{
  onSubmit: (product: Product) => void;
}> = ({ onSubmit }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productValue, setProductValue] = useState("");
  const [productAvailable, setProductAvailable] = useState("yes");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      name: productName,
      description: productDescription,
      value: parseFloat(productValue),
      available: productAvailable === "yes",
    };
    onSubmit(newProduct);
    setProductName("");
    setProductDescription("");
    setProductValue("");
    setProductAvailable("yes");
  };

  return (
    <ListContainer>
      <FormContainer container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Nome do Produto"
                  fullWidth
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Valor do Produto"
                  fullWidth
                  type="number"
                  value={productValue}
                  onChange={(e) => setProductValue(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6} display={"flex"} justifyContent={"center"}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Disponível para Venda
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="disponibilidade"
                    name="productAvailability"
                    value={productAvailable}
                    onChange={(e) => setProductAvailable(e.target.value)}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Sim"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="Não"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Descrição do Produto"
                  fullWidth
                  multiline
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "1rem" }}
                >
                  Cadastrar Produto
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </FormContainer>
    </ListContainer>
  );
};

export default ProductForm;
