"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import styles from "@/styles/results.module.css";

interface Product {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  category: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6666",
  "#4CAF50",
  "#D9534F",
];

const Results = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // preparando os dados para o primeiro gráfico (quantidade por produto)
  const quantityData = products.map((product) => ({
    name: product.productName,
    Quantidade: product.quantity,
  }));

  // preparando os dados para o segundo gráfico (preço unitário e total)
  const priceData = products.map((product) => ({
    name: product.productName,
    "Preço Unitário": product.price,
    "Preço Total": product.price * product.quantity,
  }));

  // preparando os dados para o gráfico de pizza (quantidade por categoria)
  const categoryData = products.reduce((acc, product) => {
    const existingCategory = acc.find((item) => item.name === product.category);
    if (existingCategory) {
      existingCategory.value += product.quantity;
    } else {
      acc.push({ name: product.category, value: product.quantity });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className={styles["results-container"]}>
      <h1>Resumo dos Produtos</h1>

      <div className={styles["results-total"]}>
        {/* div da esquerda - gráficos de quantidade e preço */}
        <div className={styles["results-left"]}>
          <div className={styles["results-box"]}>
            <h2>Quantidade por Produto</h2>
            <ResponsiveContainer className={styles["results-graphic"]}>
              <BarChart data={quantityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Quantidade" fill="#2bc0a0" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles["results-box"]}>
            <h2>Preço Unitário e Total por Produto</h2>
            <ResponsiveContainer className={styles["results-graphic"]}>
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

        {/* div da direita - gráfico de pizza */}
        <div className={styles["results-right"]}>
          <h2>Quantidade por Seção</h2>
          <div className={styles["results-box-pizza"]}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
