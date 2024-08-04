import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Swap from "./Swap";
import Footer from "./Footer";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  console.log(walletAddress)
  return (
    <>
      <div className="main-container">
        <Header walletAddress={walletAddress} setWalletAddress={setWalletAddress}/>
        <Swap walletAddress={walletAddress}/>
        <Footer />
      </div>
    </>
  );
}

export default App;
