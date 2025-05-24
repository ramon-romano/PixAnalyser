import styles from "./PixTransactionScreen.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";

function PixTransactionScreen() {
  const [amount, setAmount] = useState("");
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  return (
    <div className={styles.pixContainer}>
      <div className={styles.pixHeader}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.backButton}>
            <span className={styles.backArrow}>←</span>
          </Link>
          <h1>Pix</h1>

          <div className={styles.infoBar}>
            <FaInfoCircle className={styles.infoIcon} />
            <Link to="#" className={styles.infoLink}>
              Horários, limites e outras informações
            </Link>
          </div>
        </div>

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
            height: "100px",
            transform: "rotate(180deg)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <path
            d="M0,35 Q720,-20 1440,42 L1440,120 L0,120 Z"
            fill="rgba(227, 60, 79, 0.5)"
          />

          <path
            d="M0,40 A900,40 0 0,0 1440,40 L1440,120 L0,120 Z"
            fill="#CC092F"
          />
        </svg>
      </div>

      <div className={styles.pixBody}>
        <div className={styles.recipientInfoCard}>
          <div className={styles.iconContainer}>S$</div>
          <div className={styles.recipientDetails}>
            <p className={styles.recipientName}>
              Pix para: <span className={styles.bold}>Felipe Mariano</span>
            </p>
            <p className={styles.recipientId}>
              CPF/CNPJ: <span className={styles.blurred}>***.***.***-**</span>
            </p>
            <p className={styles.recipientInstitution}>
              Instituição: <span className={styles.blurred}>***</span>
            </p>
          </div>
        </div>

        <section className={styles.amountSection}>
          <label htmlFor="amountInput" className={styles.amountLabel}>
            Escolha o valor
          </label>
          <input
            type="number"
            id="amountInput"
            className={styles.amountInput}
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className={styles.quickAmountScroll}>
            <div className={styles.quickAmountButtons}>
              <button
                type="button"
                onClick={() => setAmount((Number(amount) || 0) + 1)}
              >
                + R$ 1
              </button>
              <button
                type="button"
                onClick={() => setAmount((Number(amount) || 0) + 10)}
              >
                + R$ 10
              </button>
              <button
                type="button"
                onClick={() => setAmount((Number(amount) || 0) + 50)}
              >
                + R$ 50
              </button>
              <button
                type="button"
                onClick={() => setAmount((Number(amount) || 0) + 100)}
              >
                + R$ 100
              </button>
            </div>
          </div>
        </section>

        <section className={styles.balanceSection}>
          <div className={styles.balanceLabel}>Saldo disponível:</div>
          <div className={styles.balanceValue}>
            <span
              className={`${styles.balanceText} ${
                !showBalance ? styles.hiddenBalance : ""
              }`}
            >
              R$ 1.234,56
            </span>
            <button
              onClick={toggleBalanceVisibility}
              className={styles.eyeButton}
            >
              {showBalance ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </section>

        <section className={styles.scheduleSection}>
          <div className={styles.scheduleInfo}>
            <div className={styles.scheduleLabel}>Pra quando?</div>
            <div className={styles.scheduleDate}>30/04/2025</div>
          </div>
          <div className={styles.repeatWrapper}>
            <button className={styles.repeatButton}>Repetir</button>
            <span className={styles.calendarEmoji}>📅</span>
          </div>
        </section>

        <div className={styles.actionButtons}>
          <Link
            to="/conta"
            className={`${styles.continueButton} ${
              Number(amount) <= 0 ? styles.disabled : ""
            }`}
            onClick={(e) => {
              if (Number(amount) <= 0) e.preventDefault();
            }}
          >
            Continuar
          </Link>

          <button className={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default PixTransactionScreen;
