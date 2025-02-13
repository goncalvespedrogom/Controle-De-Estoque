"use client";

import React, { useState, useEffect } from 'react';
import styles from '@/styles/dashboard.module.css';

interface Product {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  category: string;
}

export function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  // Carregar produtos do localStorage ao iniciar o componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    }
  }, []);

  // Número de produtos únicos cadastrados
  const totalProducts = products.length;

  // Número total de itens registrados (soma das quantidades)
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);

  // Produto com maior valor unitário
  const mostExpensiveProduct = products.length > 0
    ? products.reduce((max, product) => (product.price > max.price ? product : max), products[0])
    : null;

  // Produto com menor valor unitário
  const cheapestProduct = products.length > 0
    ? products.reduce((min, product) => (product.price < min.price ? product : min), products[0])
    : null;

  // Soma do valor total de todos os produtos
  const totalStockValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  // Produto com maior valor total (quantidade * preço)
  const mostValuableProduct = products.length > 0
    ? products.reduce((max, product) => (product.price * product.quantity > max.price * max.quantity ? product : max), products[0])
    : null;

  // Produto com menor valor total (quantidade * preço)
  const leastValuableProduct = products.length > 0
    ? products.reduce((min, product) => (product.price * product.quantity < min.price * min.quantity ? product : min), products[0])
    : null;

  // Produto com maior quantidade
  const mostQuantityProduct = products.length > 0
    ? products.reduce((max, product) => (product.quantity > max.quantity ? product : max), products[0])
    : null;

  // Produto com menor quantidade
  const leastQuantityProduct = products.length > 0
    ? products.reduce((min, product) => (product.quantity < min.quantity ? product : min), products[0])
    : null;

  // Categorias agrupadas
  const categoryCount: Record<string, number> = {};
  products.forEach(product => {
    categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
  });

  // Categoria com mais produtos cadastrados
  const mostPopularCategory = Object.entries(categoryCount).reduce((max, [category, count]) =>
    count > max.count ? { category, count } : max, { category: '', count: 0 });

  // Categoria com menos produtos cadastrados
  const leastPopularCategory = Object.entries(categoryCount).reduce((min, [category, count]) =>
    count < min.count ? { category, count } : min, { category: '', count: Infinity });

  // Função para formatar preço em R$
  const formatPrice = (value: number) => value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className={styles['dashboard-container']}>
      <h1>Visão Geral do Estoque</h1>
      
      <div className={styles['dashboard-grid']}>

        <div className={styles['dashboard-box']}>
          <h2>Produtos Registrados</h2>
          <p>{totalProducts}</p>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Total de Itens</h2>
          <p>{totalItems}</p>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Produto Mais Caro</h2>
          <p>{mostExpensiveProduct ? mostExpensiveProduct.productName : "Nenhum"}</p>
          <span>{mostExpensiveProduct ? formatPrice(mostExpensiveProduct.price) : "R$ 0,00"}</span>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Produto Mais Barato</h2>
          <p>{cheapestProduct ? cheapestProduct.productName : "Nenhum"}</p>
          <span>{cheapestProduct ? formatPrice(cheapestProduct.price) : "R$ 0,00"}</span>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Valor Total do Estoque</h2>
          <p>{formatPrice(totalStockValue)}</p>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Produto de Maior Valor Total</h2>
          <p>{mostValuableProduct ? mostValuableProduct.productName : "Nenhum"}</p>
          <span>{mostValuableProduct ? formatPrice(mostValuableProduct.price * mostValuableProduct.quantity) : "R$ 0,00"}</span>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Produto de Menor Valor Total</h2>
          <p>{leastValuableProduct ? leastValuableProduct.productName : "Nenhum"}</p>
          <span>{leastValuableProduct ? formatPrice(leastValuableProduct.price * leastValuableProduct.quantity) : "R$ 0,00"}</span>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Produto com Maior Quantidade</h2>
          <p>{mostQuantityProduct ? mostQuantityProduct.productName : "Nenhum"}</p>
          <span>{mostQuantityProduct ? mostQuantityProduct.quantity : "0"}</span>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Produto com Menor Quantidade</h2>
          <p>{leastQuantityProduct ? leastQuantityProduct.productName : "Nenhum"}</p>
          <span>{leastQuantityProduct ? leastQuantityProduct.quantity : "0"}</span>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Categoria com Mais Produtos</h2>
          <p>{mostPopularCategory.category || "Nenhuma"}</p>
          <span>{mostPopularCategory.count || 0} produtos</span>
        </div>

        <div className={styles['dashboard-box']}>
          <h2>Categoria com Menos Produtos</h2>
          <p>{leastPopularCategory.category || "Nenhuma"}</p>
          <span>{leastPopularCategory.count !== Infinity ? leastPopularCategory.count : 0} produtos</span>
        </div>

      </div>
    </div>
  );
}
