import "./PixInputScreen.css";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PixInputScreen() {
  const [pixKey, setPixKey] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (pixKey.trim()) {
      navigate("/valor");
    }
  };

  const handleCopy = () => {
    if (pixKey.trim()) {
      navigator.clipboard.writeText(pixKey).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="pix-container">
      <div className="pix-header">
        <div className="pix-gradient">
          <span className="back-arrow">←</span>
          <h1>Como você quer transferir?</h1>

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
        <div className="floating-label-input">
          <input
            type="text"
            id="pixKey"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            required
            placeholder=" "
            autoComplete="on"
            className={pixKey ? "has-value" : ""}
          />

          <label htmlFor="pixKey">Digitar ou colar nome/chave</label>
          {pixKey.trim() && (
            <span
              className="clipboard-icon"
              onClick={handleCopy}
              style={{ cursor: "pointer" }}
            >
              <FiCopy size={20} color={copied ? "green" : "gray"} />
            </span>
          )}
        </div>

        <p className="pix-subtext">
          Pode ser o nome do contato ou uma chave Pix
        </p>
      </div>

      <div className="pix-footer">
        <button
          className="pix-button"
          onClick={handleContinue}
          disabled={!pixKey.trim()}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

export default PixInputScreen;
