import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./PixTransactionScreen.css";

function PixTransactionScreen() {
  const [amount, setAmount] = useState(""); // Inicializar como string vazia
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  return (
    <div className="pix-container">
      <div className="pix-header">
        <div className="pix-gradient">
          <Link to="/" className="back-button">
            <FaArrowLeft className="back-arrow" /> {/* Usando o ícone */}
          </Link>
          <h1 className="pix-title">Pix</h1>
          <svg
            className="wave"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z"
            />
          </svg>
        </div>
      </div>

      <div className="pix-body">
        <a href="#" className="info-link">
          <i className="fa fa-info-circle" aria-hidden="true"></i> Horários,
          limites e outras informações
        </a>

        <div className="recipient-card">
          <p className="recipient-text">
            Pix para: <span className="bold">Felipe Mariano</span>
          </p>
          <p className="recipient-text">
            CPF/CNPJ: <span className="blurred">***.***.***-**</span>
          </p>
          <p className="recipient-text">
            Instituição: <span className="blurred">***</span>
          </p>
        </div>

        <section className="value-section">
          <label className="value-title" htmlFor="amountInput">
            Escolha o valor
          </label>
          <input
            id="amountInput"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Mantendo o valor como string até a submissão
            className="value-input"
            placeholder="R$ 0,00"
            min={0}
          />

          <div className="quick-values">
            {[1, 10, 50, 100].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(String(Number(amount || 0) + v))} // Converter para string ao atualizar
                className="quick-value-button"
                type="button"
              >
                + R$ {v}
              </button>
            ))}
          </div>
        </section>

        <section className="balance-section">
          <span className="balance-label">Saldo disponível:</span>
          <span className={`balance-value ${!showBalance ? "blurred" : ""}`}>
            R$ 1.234,56
          </span>
          <button
            className="eye-button"
            onClick={toggleBalanceVisibility}
            aria-label={showBalance ? "Esconder saldo" : "Mostrar saldo"}
            type="button"
          >
            {showBalance ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>
        </section>

        <section className="schedule-section">
          <span>Pra quando?</span>
          <div className="schedule-details">
            <span className="schedule-date">30/04/2025</span>
            <button className="repeat-link" type="button">
              Repetir
            </button>
          </div>
        </section>

        <button
          disabled={Number(amount) <= 0} // Converter para número na validação
          className="continue-button"
          type="button"
        >
          Continuar
        </button>

        <button className="cancel-button" type="button">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default PixTransactionScreen;
