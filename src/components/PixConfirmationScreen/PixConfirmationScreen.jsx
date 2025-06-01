import React, { useState, useEffect } from "react";
import styles from "./PixConfirmationScreen.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertBanner from "../AlertBanner/AlertBanner";
import { FiFileText } from "react-icons/fi";
import { consultarAvaliacaoIA } from "../../api/api";

function PixConfirmationScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBanner, setShowBanner] = useState(false);

  const descricao = location.state?.descricao || "";
  const dadosPix = location.state?.dadosPix || {};
  const valor = location.state?.valor || "0,00";
  const valorNumerico = parseFloat(valor.replace(".", "").replace(",", "."));

  const pixData = JSON.parse(localStorage.getItem("consultaIA") || "{}");

  const getDataAtualFormatada = () => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    if (!location.state || !location.state.valor) {
      navigate("/valor");
    }
  }, [location, navigate]);

  useEffect(() => {
    if (pixData?.aiAnalyze?.confidenceScore < 0.7) {
      setShowBanner(true);
    }
  }, []);

  const handleConfirmar = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await consultarAvaliacaoIA(
        pixData.destinationKeyValue,
        pixData.originClientId,
        valorNumerico,
        pixData.observacao
      );

      const consultaIA = response.data.body;

      if (consultaIA) {
        navigate("/sucesso", { state: { dados: consultaIA } });
      } else {
        alert("Chave Pix inválida ou não encontrada.");
      }
    } catch (err) {
      console.error("Erro ao buscar chave:", err);
      alert("Erro ao transferir pix.");
    }
  };

  // Função para mascarar CPF/CNPJ parcialmente
  const maskTaxId = (value) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 11) {
      // CPF: ***.456.789-**
      return `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**`;
    } else if (digits.length === 14) {
      // CNPJ: **.***.456/2796-**
      return `**.***.${digits.slice(5, 8)}/${digits.slice(8, 12)}-**`;
    }

    return value;
  };

  // Função para mascarar a chave Pix — mostra só os 3 primeiros caracteres
  const maskPixKey = (value) => {
    if (!value) return "Chave não informada";
    const visibleChars = 3;
    const maskedLength = value.length - visibleChars;
    if (maskedLength <= 0) return value;
    return value.slice(0, visibleChars) + "*".repeat(maskedLength);
  };

  return (
    <div className={styles.pixContainer}>
      <div className={styles.pixHeader}>
        <div className={styles.headerContent}>
          <Link to="/valor" className={styles.backButton}>
            <IoIosArrowBack />
          </Link>
          <h1>Pix</h1>
          <h2 className={styles.mainTitle}>Agora, é só confirmar</h2>
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

          <div className={styles.pixDetailItem}>
            <span className={styles.pixLabel}>Nome</span>
            <span className={styles.pixValue}>
              {pixData.transactionInformation?.receiverName}
            </span>
          </div>
          <div className={styles.pixDetailItem}>
            <span className={styles.pixLabel}>Valor</span>
            <span className={styles.pixValue}>R$ {valor}</span>
          </div>
          <div className={styles.pixDetailItem}>
            <span className={styles.pixLabel}>Chave Pix</span>
            <span className={`${styles.pixValue} ${styles.blurred}`}>
              {maskPixKey(dadosPix.chave)}
            </span>
          </div>
          <div className={styles.pixDetailItem}>
            <span className={styles.pixLabel}>CPF/CNPJ</span>
            <span className={`${styles.pixValue} ${styles.blurred}`}>
              {maskTaxId(dadosPix.documento) || "***.***.***-**"}
            </span>
          </div>
          <div className={styles.pixDetailItem}>
            <span className={styles.pixLabel}>Instituição</span>
            <span className={styles.pixValue}>{dadosPix.instituicao}</span>
          </div>
        </div>

        <div className={styles.options}>
          <label className={styles.checkboxContainer}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            Adicionar aos contatos Pix
          </label>
        </div>

        <div className={styles.descriptionConfirm}>
          <span>Observação:</span>
          <p>{descricao || "Nenhuma observação foi inserida."}</p>
        </div>

        <div className={styles.pixPaymentMethod}>
          <span className={styles.pixLabel}>Debitar de</span>
          <span className={styles.pixValue}> Conta-Poupança</span>
        </div>

        <div className={styles.pixPaymentDate}>
          <span className={styles.pixLabel}>Data do débito</span>
          <span className={styles.pixValue}>{getDataAtualFormatada()}</span>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button className={styles.confirmButton} onClick={handleConfirmar} disabled={loading}>
          {loading ? "Processando..." : "Continuar"}
        </button>

        <Link to="/home" className={styles.cancelButton}>
          Cancelar
        </Link>
      </div>

      {showBanner && (
        <AlertBanner
          message="Alerta: Individuo suspeito detectado!! Aconselhamos que prossiga, apenas se confiar no individuo."
          onClose={() => setShowBanner(false)}
        />
      )}
    </div>
  );
}

export default PixConfirmationScreen;
