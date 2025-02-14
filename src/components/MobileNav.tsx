"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/MobileNav.module.css";
import { usePathname } from "next/navigation";

/* ícones */
import Home from "@/assets/home.svg";
import Product from "@/assets/product.svg";
import Chart from "@/assets/chart.svg";
import Logout from "@/assets/logout.svg";

export function MobileNav() {
  const pathname = usePathname(); // obtém a rota atual

  return (
    <nav className={styles.mobileNav}>
      <ul className={styles.navItems}>
        <li className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}>
          <Link href="/">
            <Image src={Home} alt="Ícone de início" className={styles.icons} />
          </Link>
        </li>

        <li className={`${styles.navItem} ${pathname === "/products" ? styles.active : ""}`}>
          <Link href="/products">
            <Image src={Product} alt="Ícone de produtos" className={styles.icons} />
          </Link>
        </li>

        <li className={`${styles.navItem} ${pathname === "/results" ? styles.active : ""}`}>
          <Link href="/results">
            <Image src={Chart} alt="Ícone de resultados" className={styles.icons} />
          </Link>
        </li>

        <li className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}>
          <Link href="/">
            <Image src={Logout} alt="Ícone de logout" className={styles.icons} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
