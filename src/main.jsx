import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

import App from "./App.jsx";
import "./index.css";
//import { config } from "./wagmi";

import { trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { uniswapWallet } from "@rainbow-me/rainbowkit/wallets";
import { phantomWallet } from "@rainbow-me/rainbowkit/wallets";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig } from "wagmi";

import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Suggested",
      wallets: [trustWallet, uniswapWallet, phantomWallet, metaMaskWallet],
    },
  ],
  { appName: "RainbowKit App", projectId: "YOUR_PROJECT_ID" }
);

const config = createConfig({
  connectors,
  appName: "RainbowKit demo",
  projectId: "90f079dc357f3b0a2500be0388582698",
  chains: [mainnet, polygon, optimism, arbitrum, base],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            color: "green",
            fontWeight: 400,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          })}
          locale="en"
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
