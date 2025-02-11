"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

import styles from '@/styles/results.module.css';

interface Product {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  category: string;
}

const Results = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Preparando os dados para o primeiro gráfico (quantidade por produto)
  const quantityData = products.map((product) => ({
    name: product.productName,
    Quantidade: product.quantity,
  }));

  // Preparando os dados para o segundo gráfico (preço unitário e total)
  const priceData = products.map((product) => ({
    name: product.productName,
    "Preço Unitário": product.price,
    "Preço Total": product.price * product.quantity,
  }));

  return (
    <div className={styles['results-container']}>
        
      <h1>Resumo dos Produtos</h1>

      <div className={styles['results-total']}>
        <div className={styles['results-box']}>

        <h2>Quantidade por Produto</h2>

        <ResponsiveContainer className={styles['results-graphic']}>
        <BarChart data={quantityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Quantidade" fill="#2bc0a0" />
        </BarChart>
        </ResponsiveContainer>

        </div>

        <div className={styles['results-box']}>

        <h2>Preço Unitário e Total por Produto</h2>

        <ResponsiveContainer className={styles['results-graphic']}>
        <BarChart data={priceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Preço Unitário" fill="#e0d42b" />
            <Bar dataKey="Preço Total" fill="#9c1e9c" />
        </BarChart>
        </ResponsiveContainer>

        </div>
      </div>

      
    </div>
  );
};

export default Results;