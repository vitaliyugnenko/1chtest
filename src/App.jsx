import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Swap from "./Swap";
import Footer from "./Footer";

function App() {
  const [selectedToken, setSelectedToken] = useState("DAI");
  const [selectedSourceToken, setSelectedSourceToken] = useState("MATIC");

  return (
    <>
      <div className="main-container">
        <Header />
        <Swap
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          selectedSourceToken={selectedSourceToken}
          setSelectedSourceToken={setSelectedSourceToken}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
