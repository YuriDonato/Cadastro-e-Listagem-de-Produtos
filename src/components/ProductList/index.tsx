import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import { Product } from "../../models/Product";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { DeleteProductData, UpdateProductData } from "../../utils/CRUD";

const ListContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(2),
}));

const ProductList: React.FC<{
  products: Product[];
  onNewProduct: () => void;
}> = ({ products, onNewProduct }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedValue, setEditedValue] = useState(0);
  const [editedAvailable, setEditedAvailable] = useState(false);

  const clearEditedValues = () => {
    setEditedName("");
    setEditedDescription("");
    setEditedValue(0);
    setEditedAvailable(false);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (productToDelete && productToDelete.id) {
      DeleteProductData(productToDelete.id);
      setDeleteConfirmationOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancelled = () => {
    setDeleteConfirmationOpen(false);
    setProductToDelete(null);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditedName(product.name);
    setEditedDescription(product.description ?? "");
    setEditedValue(product.value);
    setEditedAvailable(product.available);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    clearEditedValues();
  };

  const handleSaveEdit = () => {
    if (editingProduct && editingProduct.id) {
      const updatedProduct: Partial<Product> = {
        ...editingProduct,
        name: editedName,
        description: editedDescription,
        value: editedValue,
        available: editedAvailable,
      };

      UpdateProductData(editingProduct.id, updatedProduct)
        .then(() => {
          const updatedProducts = products.map((p) =>
            p.id === editingProduct.id ? { ...p, ...updatedProduct } : p
          );
          setEditingProduct(null);
          setEditedName("");
          setEditedDescription("");
          setEditedValue(0);
          setEditedAvailable(false);
        })
        .catch((error) => {
          console.error("Erro ao salvar edição:", error);
        });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    switch (name) {
      case "name":
        setEditedName(value);
        break;
      case "description":
        setEditedDescription(value);
        break;
      case "value":
        setEditedValue(parseFloat(value));
        break;
      case "available":
        setEditedAvailable(checked);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ListContainer
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Disponível</TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Ação
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editingProduct && editingProduct.id === product.id ? (
                      <TextField
                        name="name"
                        value={editedName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingProduct && editingProduct.id === product.id ? (
                      <TextField
                        name="description"
                        value={editedDescription}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.description ?? "Descrição não informada"
                    )}
                  </TableCell>
                  <TableCell>
                    {editingProduct && editingProduct.id === product.id ? (
                      <TextField
                        type="number"
                        name="value"
                        value={editedValue}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.value.toString()
                    )}
                  </TableCell>
                  <TableCell>
                    {editingProduct && editingProduct.id === product.id ? (
                      <Checkbox
                        name="available"
                        checked={editedAvailable}
                        onChange={handleInputChange}
                      />
                    ) : product.available ? (
                      "Sim"
                    ) : (
                      "Não"
                    )}
                  </TableCell>
                  <TableCell>
                    {editingProduct && editingProduct.id === product.id ? (
                      <Grid container spacing={1} justifyContent={"center"}>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveEdit}
                          >
                            <SaveAsIcon />
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCancelEdit}
                          >
                            <DoDisturbIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container spacing={1} justifyContent={"center"}>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleEditClick(product)}
                          >
                            <EditIcon />
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <DeleteForeverIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={onNewProduct}
          style={{ marginTop: "1rem" }}
        >
          Novo Produto
        </Button>

        <Dialog
          open={deleteConfirmationOpen}
          onClose={handleDeleteCancelled}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmação</DialogTitle>
          <DialogContent>
            <p>Deseja realmente deletar o produto "{productToDelete?.name}"?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancelled} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteConfirmed} color="primary" autoFocus>
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </ListContainer>
    </div>
  );
};

export default ProductList;
