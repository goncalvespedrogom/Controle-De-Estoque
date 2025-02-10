"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/products.module.css';
import Add from '@/assets/add.svg';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    price: '',
    category: 'comida',
  });

  // Função para formatar o preço como moeda brasileira
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Função para converter o valor do input para número corretamente
  const parsePrice = (value: string): number => {
    // Substituir vírgula por ponto e converter para número
    return parseFloat(value.replace(',', '.').replace(/[^\d.]/g, '')) || 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'price') {
      setFormData((prevState) => ({
        ...prevState,
        price: value, // Mantém a vírgula para exibição correta no input
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existingProduct = products.find(
      (product) => product.productName === formData.productName
    );

    const newPrice = parsePrice(formData.price);
    const newQuantity = parseInt(formData.quantity);

    if (existingProduct) {
      // Atualiza a média do preço e soma as quantidades
      const updatedProducts = products.map((product) =>
        product.productName === formData.productName
          ? {
              ...product,
              quantity: product.quantity + newQuantity,
              price: (product.price * product.quantity + newPrice * newQuantity) / (product.quantity + newQuantity),
            }
          : product
      );

      setProducts(updatedProducts);
    } else {
      // Adiciona um novo produto
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          ...formData,
          id: Date.now(),
          price: newPrice, // Converte para número antes de salvar
          quantity: newQuantity,
        },
      ]);
    }

    // Resetando o formulário
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
              type="text"
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
            <span>{formatPrice(product.price)}</span>
            <span>{product.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
