import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PixInputScreen from "../src/components/PixInputScreen/PixInputScreen";
import PixTransactionScreen from "../src/components/PixTransactionScreen/PixTransactionScreen";
import PixAccountScreen from "../src/components/PixAccountScreen/PixAccountScreen";
import PixConfirmationScreen from "./components/PixConfirmationScreen/PixConfirmationScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PixInputScreen />} />
        <Route path="/valor" element={<PixTransactionScreen />} />
        <Route path="/conta" element={<PixAccountScreen />} />
        <Route path="/confirmar" element={<PixConfirmationScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
