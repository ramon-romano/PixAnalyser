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

          <svg className="wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z" />
          </svg>
        </div>
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
              {showBalance ? "R$ 1.234,56" : "••••••"}
            </span>
            <button onClick={toggleBalanceVisibility} className="eye-button">
              {showBalance ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </section>

        <section className="schedule-section">
          <div className="schedule-label">Pra quando?</div>
          <div className="schedule-details">
            <span className="schedule-date">30/04/2025</span>
            <button type="button" className="repeat-button">
              Repetir <span className="calendar-icon">🗓️</span>
            </button>
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
