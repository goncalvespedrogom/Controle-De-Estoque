"use client"; // para usar hooks no App Router

import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/SideBar.module.css";
import { usePathname } from "next/navigation"; // usa usePathname ao invés de useRouter
import { useState } from "react"; // importa useState para alternar menu

/* imagens */
import Avatar from "@/assets/avatar.svg";
import Chart from "@/assets/chart.svg";
import Home from "@/assets/home.svg";
import Product from "@/assets/product.svg";
import ArrowRight from "@/assets/arrow-right.svg";
import Logout from "@/assets/logout.svg";

export function SideBar() {
  const pathname = usePathname(); // obtém a rota atual
  const [isOpen, setIsOpen] = useState(true); // estado do menu

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // alterna entre aberto/fechado
  };

  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`} id="sidebar">
      <div className={styles.sidebarContent} id="sidebar_content">
        <div className={styles.user} id="user">
          <Image src={Avatar} alt="Foto do usuário" className={styles.avatar} id="user_avatar" />
          {isOpen && (
            <p className={styles.userInfos} id="user_infos">
              <span className={styles.itemDescription}>Usuário</span>
              <span className={styles.itemDescription}>Admin</span>
            </p>
          )}
        </div>

        <ul className={styles.sideItems} id="side_items">
          <li className={`${styles.sideItem} ${pathname === "/" ? styles.active : ""}`}>
            <Link href="/">
              <Image src={Home} alt="Ícone de início" className={styles.icons} />
              {isOpen && <span className={styles.itemDescription}>Início</span>}
            </Link>
          </li>

          <li className={`${styles.sideItem} ${pathname === "/products" ? styles.active : ""}`}>
            <Link href="/products">
              <Image src={Product} alt="Ícone de produtos" className={styles.icons} />
              {isOpen && <span className={styles.itemDescription}>Produtos</span>}
            </Link>
          </li>

          <li className={`${styles.sideItem} ${pathname === "/results" ? styles.active : ""}`}>
            <Link href="/results">
              <Image src={Chart} alt="Ícone do gráfico" className={styles.icons} />
              {isOpen && <span className={styles.itemDescription}>Resultados</span>}
            </Link>
          </li>
        </ul>

        <button className={styles.openBtn} id="open_btn" onClick={toggleMenu}>
          <Image
            src={ArrowRight}
            alt="Seta para abrir/fechar menu"
            width={25}
            id="open_btn_icon"
            className={isOpen ? styles.rotated : ""}
          />
        </button>
      </div>

      <div className={styles.logout} id="logout">
        <button className={styles.logoutBtn} id="logout_btn">
          <Image src={Logout} alt="Ícone de deslogar" width={25} />
          {isOpen && <span className={styles.itemDescription}>Sair</span>}
        </button>
      </div>
    </nav>
  );
}
