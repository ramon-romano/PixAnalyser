import React from "react";
import styles from "./PixConfirmationScreen.module.css";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi"; // Importe o ícone

function PixConfirmationScreen() {
  return (
    <div className={styles.pixContainer}>
      <div className={styles.pixHeader}>
        <div className={styles.headerContent}>
          <Link to="/conta" className={styles.backButton}>
            &lt;
          </Link>
          <h1>Pix</h1>
        </div>

        <h2 className={styles.mainTitle}>Agora, é só confirmar</h2>

        <svg
          className={styles.wave}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            bottom: "-50px",
            left: 0,
            width: "100%",
            height: "70px",
            transform: "rotate(180deg)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <g transform="translate(70, 0)">
            <path
              d="M0,150 Q720,-150 1440,175 L1440,120 L0,120 Z"
              fill="rgba(227, 60, 79, 0.3)"
            />
          </g>
          <g transform="translate(300, 0)">
            <path
              d="M0,155 Q720,-120 1440,130 L1440,120 L0,120 Z"
              fill="rgba(227, 60, 79, 0.3)"
            />
          </g>
          <path
            d="M0,29  Q360,-10 720,30  Q1080,70 1440,40  L1440,120  L0,120  Z"
            fill="rgba(204, 9, 47, 0.97)"
          />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={styles.transactionDetails}>
          <div className={styles.detailsHeader}>
            <FiFileText size={20} color="#777" style={{ marginRight: 8 }} />
            <span>Dados da transação</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Nome</span>
            <span className={styles.value}>Felipe Mariano</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Valor</span>
            <span className={styles.value}>R$ 0,01</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Chave Pix</span>
            <span className={`${styles.value} ${styles.blurred}`}>
              XXX.XXX.XXX-XX
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>CPF/CNPJ</span>
            <span className={`${styles.value} ${styles.blurred}`}>
              ***.***.***-**
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Instituição</span>
            <span className={styles.value}>PICPAY</span>
          </div>
        </div>

        <div className={styles.options}>
          <label className={styles.checkboxContainer}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            Adicionar aos contatos Pix
          </label>
        </div>

        <div className={styles.paymentMethod}>
          <span className={styles.label}>Debitar de</span>
          <span className={styles.value}> Conta-Poupança</span>
        </div>

        <div className={styles.paymentDate}>
          <span className={styles.label}>Data do débito</span>
          <span className={styles.value}> 30/04/2025 - hoje</span>
        </div>

        <button className={styles.confirmButton}>Confirmar</button>
      </div>
    </div>
  );
}

export default PixConfirmationScreen;
