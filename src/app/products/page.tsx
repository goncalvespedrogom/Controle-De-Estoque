"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/products.module.css";

/* ícones */
import Add from "@/assets/add.svg";
import EditIcon from "@/assets/edit.svg";
import TrashIcon from "@/assets/trash.svg";

// Definindo o tipo do produto
interface Product {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  category: string;
}

// Definindo o tipo dos dados do formulário
interface FormData {
  productName: string;
  quantity: string;
  price: string;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    quantity: "",
    price: "",
    category: "comida",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Carregar produtos do localStorage quando o componente for montado
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Salvar produtos no localStorage sempre que a lista for alterada
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const parsePrice = (value: string): number => {
    return parseFloat(value.replace(",", ".").replace(/[^\d.]/g, "")) || 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPrice = parsePrice(formData.price);
    const newQuantity = parseInt(formData.quantity);

    if (!formData.productName.trim()) {
      setErrorMessage("O nome do produto é obrigatório.");
      return;
    }
    if (!formData.quantity.trim() || isNaN(newQuantity) || newQuantity <= 0) {
      setErrorMessage("A quantidade deve ser um número maior que zero.");
      return;
    }

    if (editingProductId !== null) {
      const updatedProducts = products.map((product) =>
        product.id === editingProductId
          ? {
              ...product,
              productName: formData.productName,
              quantity: newQuantity,
              price: newPrice,
              category: formData.category,
            }
          : product
      );

      setProducts(updatedProducts);
      setEditingProductId(null);
    } else {
      const existingProduct = products.find(
        (product) => product.productName.toLowerCase() === formData.productName.toLowerCase()
      );

      if (existingProduct) {
        const updatedProducts = products.map((product) =>
          product.productName.toLowerCase() === formData.productName.toLowerCase()
            ? {
                ...product,
                quantity: product.quantity + newQuantity,
                price:
                  (product.price * product.quantity + newPrice * newQuantity) /
                  (product.quantity + newQuantity),
              }
            : product
        );

        setProducts(updatedProducts);
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            ...formData,
            id: Date.now(),
            price: newPrice,
            quantity: newQuantity,
          },
        ]);
      }
    }

    setFormData({
      productName: "",
      quantity: "",
      price: "",
      category: "comida",
    });

    setErrorMessage(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      productName: product.productName,
      quantity: product.quantity.toString(),
      price: product.price.toString().replace(".", ","),
      category: product.category,
    });
  };

  const handleRemove = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className={styles["products-container"]}>
      <div className={styles["product-form"]}>
        <div className={styles["product-title"]}>
          <h1>Controle do Estoque</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles["form-box"]}>
          <div className={styles["form-title"]}>
            <h2>{editingProductId ? "Editar produto" : "Adicionar produtos"}</h2>
          </div>

          {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}

          <div className={styles["form-group"]}>
            <label htmlFor="productName">Nome</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Nome do produto"
              disabled={editingProductId !== null}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="quantity">Quantidade</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantidade de produtos"
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="price">Preço</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Preço do produto por unidade"
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="category">Seção</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              <option value="Comida">Comida</option>
              <option value="Bebida">Bebida</option>
              <option value="Lazer">Lazer</option>
              <option value="Transporte">Transporte</option>
              <option value="Manutencao">Manutenção</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className={styles["form-btn"]}>
            <button type="submit">
              <span>{editingProductId ? "Editar" : "Adicionar"}</span>
              <Image src={Add} alt="Ícone do botão de adicionar" width={25} height={25} />
            </button>
          </div>
        </form>
      </div>

      <div className={styles["product-box"]}>
        <h1>Lista de Produtos</h1>
        <div className={styles["product-list"]}>
          <div className={styles["product-header"]}>
            <span>Nome</span>
            <span>Quantidade</span>
            <span>Preço</span>
            <span>Seção</span>
            <span>Ações</span>
          </div>

          {products.map((product) => (
            <div key={product.id} className={styles["product-item"]}>
              <span>{product.productName}</span>
              <span>{product.quantity}</span>
              <span>{formatPrice(product.price)}</span>
              <span>{product.category}</span>
              <div className={styles["actions"]}>
                <button onClick={() => handleEdit(product)}>
                  <Image src={EditIcon} alt="Editar" width={25} height={25} />
                </button>
                <button onClick={() => handleRemove(product.id)}>
                  <Image src={TrashIcon} alt="Remover" width={25} height={25} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
