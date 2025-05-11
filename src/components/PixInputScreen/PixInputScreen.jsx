import "./PixInputScreen.css";
import { FiCopy } from "react-icons/fi";

function PixInputScreen() {
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
          <input type="text" id="pixKey" required placeholder=" " />
          <label htmlFor="pixKey">Digitar ou colar nome/chave</label>
          <span className="clipboard-icon">
            <FiCopy size={20} color="gray" />
          </span>
        </div>

        <p className="pix-subtext">
          Pode ser o nome do contato ou uma chave Pix
        </p>
      </div>

      <div className="pix-footer">
        <button className="pix-button">Continuar</button>
      </div>
    </div>
  );
}

export default PixInputScreen;
