import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import "./PixTransactionScreen.css";

function PixTransactionScreen() {
  const [amount, setAmount] = useState("");
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  return (
    <div className="pix-container">
      <div className="pix-header">
        <div className="header-content">
          <Link to="/" className="back-button">
            <span className="back-arrow">←</span>
          </Link>
          <h1>Pix</h1>

          <div className="info-bar">
            <FaInfoCircle className="info-icon" />
            <Link to="#" className="info-link">
              Horários, limites e outras informações
            </Link>
          </div>
        </div>

<svg
  className="wave"
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

      <div className="pix-body">
        <div className="recipient-info-card">
          <div className="icon-container">S$</div>
          <div className="recipient-details">
            <p className="recipient-name">
              Pix para: <span className="bold">Felipe Mariano</span>
            </p>
            <p className="recipient-id">
              CPF/CNPJ: <span className="blurred">***.***.***-**</span>
            </p>
            <p className="recipient-institution">
              Instituição: <span className="blurred">***</span>
            </p>
          </div>
        </div>

        <section className="amount-section">
          <label htmlFor="amountInput" className="amount-label">
            Escolha o valor
          </label>
          <input
            type="number"
            id="amountInput"
            className="amount-input"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="quick-amount-scroll">
            <div className="quick-amount-buttons">
              <button type="button" onClick={() => setAmount((Number(amount) || 0) + 1)}>
                + R$ 1
              </button>
              <button type="button" onClick={() => setAmount((Number(amount) || 0) + 10)}>
                + R$ 10
              </button>
              <button type="button" onClick={() => setAmount((Number(amount) || 0) + 50)}>
                + R$ 50
              </button>
              <button type="button" onClick={() => setAmount((Number(amount) || 0) + 100)}>
                + R$ 100
              </button>
            </div>
          </div>
        </section>

        <section className="balance-section">
          <div className="balance-label">Saldo disponível:</div>
          <div className="balance-value">
            <span className={`balance-text ${!showBalance ? "hidden-balance" : ""}`}>
              R$ 1.234,56
            </span>
            <button onClick={toggleBalanceVisibility} className="eye-button">
              {showBalance ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </section>

        <section className="schedule-section">
          <div className="schedule-info">
            <div className="schedule-label">Pra quando?</div>
            <div className="schedule-date">30/04/2025</div>
          </div>
          <div class="repeat-wrapper">
            <button class="repeat-button">Repetir</button>
            <span class="calendar-emoji">📅</span>
          </div>
        </section>

        <div className="action-buttons">
          <button className="continue-button" disabled={Number(amount) <= 0}>
            Continuar
          </button>
          <button className="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default PixTransactionScreen;
