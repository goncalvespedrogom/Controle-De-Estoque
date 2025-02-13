"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/dashboard.module.css";

interface Product {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  category: string;
}

export function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  // carregar produtos do localStorage ao iniciar o componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    }
  }, []);

  // número de produtos únicos cadastrados
  const totalProducts = products.length;

  // número total de itens registrados (soma das quantidades)
  const totalItems = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  // produto com maior valor unitário
  const mostExpensiveProduct =
    products.length > 0
      ? products.reduce(
          (max, product) => (product.price > max.price ? product : max),
          products[0]
        )
      : null;

  // produto com menor valor unitário
  const cheapestProduct =
    products.length > 0
      ? products.reduce(
          (min, product) => (product.price < min.price ? product : min),
          products[0]
        )
      : null;

  // soma do valor total de todos os produtos
  const totalStockValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // produto com maior valor total (quantidade * preço)
  const mostValuableProduct =
    products.length > 0
      ? products.reduce(
          (max, product) =>
            product.price * product.quantity > max.price * max.quantity
              ? product
              : max,
          products[0]
        )
      : null;

  // produto com menor valor total (quantidade * preço)
  const leastValuableProduct =
    products.length > 0
      ? products.reduce(
          (min, product) =>
            product.price * product.quantity < min.price * min.quantity
              ? product
              : min,
          products[0]
        )
      : null;

  // produto com maior quantidade
  const mostQuantityProduct =
    products.length > 0
      ? products.reduce(
          (max, product) => (product.quantity > max.quantity ? product : max),
          products[0]
        )
      : null;

  // produto com menor quantidade
  const leastQuantityProduct =
    products.length > 0
      ? products.reduce(
          (min, product) => (product.quantity < min.quantity ? product : min),
          products[0]
        )
      : null;

  // categorias agrupadas
  const categoryCount: Record<string, number> = {};
  products.forEach((product) => {
    categoryCount[product.category] =
      (categoryCount[product.category] || 0) + 1;
  });

  // categoria com mais produtos cadastrados
  const mostPopularCategory = Object.entries(categoryCount).reduce(
    (max, [category, count]) => (count > max.count ? { category, count } : max),
    { category: "", count: 0 }
  );

  // categoria com menos produtos cadastrados
  const leastPopularCategory = Object.entries(categoryCount).reduce(
    (min, [category, count]) => (count < min.count ? { category, count } : min),
    { category: "", count: Infinity }
  );

  // função para formatar preço em R$
  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["dashboard-title"]}>
        <h1>Visão Geral do Estoque</h1>
      </div>

      <div className={styles["dashboard-grid"]}>
        <div className={styles["dashboard-box"]}>
          <h2>Produtos registrados</h2>
          <div className={styles["dashboard-primary-content"]}>
            <span className={styles["dashboard-primary-price"]}>
              {totalProducts}
            </span>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Itens registrados</h2>
          <div className={styles["dashboard-primary-content"]}>
            <span className={styles["dashboard-primary-price"]}>
              {totalItems}
            </span>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Valor total do estoque</h2>
          <div className={styles["dashboard-primary-content"]}>
            <span className={styles["dashboard-primary-price"]}>
              {formatPrice(totalStockValue)}
            </span>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Produto de maior valor</h2>
          <div className={styles["dashboard-second-content"]}>
            <span>
              {mostExpensiveProduct
                ? formatPrice(mostExpensiveProduct.price)
                : "R$ 0,00"}
            </span>
            <p>
              {mostExpensiveProduct
                ? mostExpensiveProduct.productName
                : "Nenhum"}
            </p>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Produto de menor valor</h2>
          <div className={styles["dashboard-second-content"]}>
            <span>
              {cheapestProduct ? formatPrice(cheapestProduct.price) : "R$ 0,00"}
            </span>
            <p>{cheapestProduct ? cheapestProduct.productName : "Nenhum"}</p>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Maior valor somado</h2>
          <div className={styles["dashboard-second-content"]}>
            <span>
              {mostValuableProduct
                ? formatPrice(
                    mostValuableProduct.price * mostValuableProduct.quantity
                  )
                : "R$ 0,00"}
            </span>
            <p>
              {mostValuableProduct ? mostValuableProduct.productName : "Nenhum"}
            </p>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Menor valor somado</h2>
          <div className={styles["dashboard-second-content"]}>
            <span>
              {leastValuableProduct
                ? formatPrice(
                    leastValuableProduct.price * leastValuableProduct.quantity
                  )
                : "R$ 0,00"}
            </span>
            <p>
              {leastValuableProduct
                ? leastValuableProduct.productName
                : "Nenhum"}
            </p>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Maior quantidade</h2>
          <div className={styles["dashboard-second-content"]}>
            <span>
              {mostQuantityProduct ? mostQuantityProduct.quantity : "0"}
            </span>
            <p>
              {mostQuantityProduct ? mostQuantityProduct.productName : "Nenhum"}
            </p>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Menor quantidade</h2>
          <div className={styles["dashboard-second-content"]}>
            <span>
              {leastQuantityProduct ? leastQuantityProduct.quantity : "0"}
            </span>
            <p>
              {leastQuantityProduct
                ? leastQuantityProduct.productName
                : "Nenhum"}
            </p>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Maior seção</h2>
          <div className={styles["dashboard-second-content"]}>
            <span>{mostPopularCategory.count || 0} Produtos</span>
            <p>{mostPopularCategory.category || "Nenhuma"}</p>
          </div>
        </div>

        <div className={styles["dashboard-box"]}>
          <h2>Menor seção</h2>
          <div className={styles["dashboard-second-content"]}>
            <span>
              {leastPopularCategory.count !== Infinity
                ? leastPopularCategory.count
                : 0}{" "}
              Produtos
            </span>
            <p>{leastPopularCategory.category || "Nenhuma"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
