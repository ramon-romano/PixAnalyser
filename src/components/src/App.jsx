import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PixInputScreen from "../src/components/PixInputScreen/PixInputScreen";
import PixTransactionScreen from "../src/components/PixTransactionScreen/PixTransactionScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PixInputScreen />} />
        <Route path="/valor" element={<PixTransactionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
