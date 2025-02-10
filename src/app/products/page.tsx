"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/products.module.css'; // Importando o CSS

import Add from '@/assets/add.svg'

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    price: '',
    category: 'comida',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingProduct = products.find(
      (product) => product.productName === formData.productName
    );

    if (existingProduct) {
      // Se o produto já existe, atualizamos ele
      const updatedProducts = products.map((product) =>
        product.productName === formData.productName
          ? {
              ...product,
              quantity: parseInt(product.quantity) + parseInt(formData.quantity),
              price:
                (parseFloat(product.price) * parseInt(product.quantity) +
                  parseFloat(formData.price) * parseInt(formData.quantity)) /
                (parseInt(product.quantity) + parseInt(formData.quantity)),
            }
          : product
      );
      setProducts(updatedProducts);
    } else {
      // Se o produto não existe, adicionamos um novo produto
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...formData, id: Date.now() },
      ]);
    }

    setFormData({
      productName: '',
      quantity: '',
      price: '',
      category: 'comida',
    });
  };

  return (
    <div className={styles['products-container']}>
      <div className={styles['product-form']}>
        <div className={styles['product-title']}>
          <h1>Controle do Estoque</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles['form-box']}>
          <div className={styles['form-title']}>
            <h2>Adicionar produtos</h2>
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="productName">Nome</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Nome do produto"
            />
          </div>

          <div className={styles['form-group']}>
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

          <div className={styles['form-group']}>
            <label htmlFor="price">Preço</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Preço do produto por unidade"
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="category">Seção</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="comida">Comida</option>
              <option value="bebida">Bebida</option>
              <option value="lazer">Lazer</option>
              <option value="transporte">Transporte</option>
              <option value="manutencao">Manutenção</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div className={styles['form-btn']}>
            <button type="submit">
              <span>Adicionar</span>
              <Image 
                src={Add}
                alt="Ícone do botão de adicionar"
                width={25}
                height={25}
              />
            </button>
          </div>
        </form>
      </div>

      <div className={styles['product-list']}>
        <h2>Lista de Produtos</h2>
        <div className={styles['product-header']}>
          <span>Nome</span>
          <span>Quantidade</span>
          <span>Preço</span>
          <span>Seção</span>
        </div>
        {products.map((product) => (
          <div key={product.id} className={styles['product-item']}>
            <span>{product.productName}</span>
            <span>{product.quantity}</span>
            <span>{product.price}</span>
            <span>{product.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
