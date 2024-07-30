import { useState, useEffect } from "react";
import logo from "./assets/logo.webp";
import metamask from "./assets/metamask.svg";
import bnbIcon from "./assets/bnb.svg";
import polygonIcon from "./assets/polygon.svg";
import optimismIcon from "./assets/optimism.svg";
import arbitrumIcon from "./assets/arbitrum.svg";
import gnosisIcon from "./assets/gnosis.svg";
import avalancheIcon from "./assets/avalanche.svg";
import fantomIcon from "./assets/fantom.svg";
import klaytnIcon from "./assets/klaytn.svg";
import auroraIcon from "./assets/aurora.svg";
import zksyncIcon from "./assets/zksync.svg";
import baseIcon from "./assets/base.svg";
import ethereumIcon from "./assets/ethereum.svg";
import l2Icon from "./assets/l2.svg";
import simpleModeIcon from "./assets/simple-mode.svg";
import advancedModeIcon from "./assets/advanced-mode.svg";
import limitOrderIcon from "./assets/limit-order.svg";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const formatAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const checkWalletConnection = async ({ setWalletAddress, setError }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      const walletAddress = accounts[0];
      setWalletAddress(formatAddress(walletAddress));
      console.log("Wallet Address:", walletAddress);
    }
  } catch (err) {
    setError(err.message);
    console.log(err.message);
  }
};

const connectWallet = async ({ setWalletAddress, setError }) => {
  try {
    // Определение мобильного устройства
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (window.ethereum) {
      // Если Ethereum доступен, продолжаем
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        setWalletAddress(walletAddress);
        console.log("Wallet Address:", walletAddress);
      }
    } else if (isMobile) {
      // Если это мобильное устройство и MetaMask не доступен, используем deeplink
      console.log("Redirecting to MetaMask app...");
      const deeplink = "https://metamask.app.link/dapp/yourdappurl.com";
      window.location.href = deeplink;
    } else {
      throw new Error("No crypto wallet found. Please install it.");
    }
  } catch (err) {
    setError(err.message);
    console.log(err.message);
  }
};

function Header() {
  const [error, setError] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownBridgeVisible, setDropdownBridgeVisible] = useState(false);
  const [dropdownNetworksVisible, setDropdownNetworksVisible] = useState(false);
  const [dropdownTradeVisible, setDropdownTradeVisible] = useState(false);

  const handleConnectWallet = async () => {
    setError();
    await connectWallet({ setWalletAddress, setError });
  };

  useEffect(() => {
    if (window.ethereum) {
      checkWalletConnection({ setWalletAddress, setError });

      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          setWalletAddress("");
        } else {
          setWalletAddress(formatAddress(accounts[0]));
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    } else {
      console.log("No crypto wallet found. Please install it.");
    }
  }, []);

  return (
    <div className="header-container">
      <div className="header-left-col">
        <a href="https://app.1inch.io/">
          <div className="logo-wrap">
            <img src={logo} alt="1inch" />
            <svg
              id="text"
              viewBox="0 0 71 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.345825 5.18181H5.05611V23.3636H9.76639V0.636353H5.05611C2.46545 0.636353 0.345825 2.68181 0.345825 5.18181Z"
                fill="currentColor"
              ></path>
              <path
                d="M14.4767 23.3636H19.1869V14.2727C19.1869 11.7727 17.0673 9.72726 14.4767 9.72726V23.3636Z"
                fill="currentColor"
              ></path>
              <path
                d="M23.8972 9.72726V23.3636H28.6075V14.2727H33.3178V18.8182C33.3178 21.3182 35.4374 23.3636 38.0281 23.3636V14.2727C38.0281 11.7727 35.9084 9.72726 33.3178 9.72726H23.8972Z"
                fill="currentColor"
              ></path>
              <path
                d="M66.2897 9.72726H61.5795V5.18181C61.5795 2.68181 59.4598 0.636353 56.8692 0.636353V18.8182H47.4486V14.2727H52.1589V9.72726H47.4486C44.858 9.72726 42.7383 11.7727 42.7383 14.2727V18.8182C42.7383 21.3182 44.858 23.3636 47.4486 23.3636H61.5795V14.2727H66.2897V18.8182C66.2897 21.3182 68.4094 23.3636 71 23.3636V14.2727C71 11.7727 68.8804 9.72726 66.2897 9.72726Z"
                fill="currentColor"
              ></path>
              <path
                d="M14.4767 5.18181H19.1869C19.1869 2.68181 17.0673 0.636353 14.4767 0.636353V5.18181Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </a>
        <div className="header-nav-menu">
          <div
            className="nav-menu-item"
            onMouseEnter={() => setDropdownTradeVisible(true)}
            onMouseLeave={() => setDropdownTradeVisible(false)}
          >
            <span>Trade</span>
            <svg
              id="arrow"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.125 6L8.125 10L12.125 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            {dropdownTradeVisible && (
              <div
                className={`dropdown-trade ${
                  dropdownTradeVisible ? "visible" : ""
                }`}
              >
                <a className="dropdown-trade-item">
                  <img src={simpleModeIcon} />
                  <div
                    id="dropdown-trade-item-selected"
                    className="dropdown-trade-item-content"
                  >
                    <h2>Simple mode</h2>
                    <span>The most user-friendly way to trade</span>
                  </div>
                </a>
                <a className="dropdown-trade-item">
                  <img src={advancedModeIcon} />
                  <div className="dropdown-trade-item-content">
                    <h2>Advanced mode</h2>
                    <span>Take advantage of all the familiar tools</span>
                  </div>
                </a>
                <a className="dropdown-trade-item">
                  <img src={limitOrderIcon} />
                  <div className="dropdown-trade-item-content">
                    <h2>Limit order</h2>
                    <span>Schedule a swap to get the best price</span>
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className="nav-menu-item">
            <span className="nav-menu-item-dao">DAO</span>
          </div>

          <div
            className="nav-menu-item"
            onMouseEnter={() => setDropdownBridgeVisible(true)}
            onMouseLeave={() => setDropdownBridgeVisible(false)}
          >
            <span>Bridges</span>
            <svg
              id="arrow"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.125 6L8.125 10L12.125 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            {dropdownBridgeVisible && (
              <div
                className={`dropdownBridges ${
                  dropdownBridgeVisible ? "visible" : ""
                }`}
              >
                <a className="dropdownBridges-item">
                  <img src={bnbIcon} />
                  <span>BNB Chain bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={polygonIcon} />
                  <span>Polygon bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={optimismIcon} />
                  <span>Optimism bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={arbitrumIcon} />
                  <span>Arbitrum bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={gnosisIcon} />
                  <span>Gnosis Chain bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={avalancheIcon} />
                  <span>Avalanche bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={fantomIcon} />
                  <span>Fantom bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={klaytnIcon} />
                  <span>Klaytn bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={auroraIcon} />
                  <span>Aurora bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={zksyncIcon} />
                  <span>zkSync Era bridge</span>
                </a>
                <a className="dropdownBridges-item">
                  <img src={baseIcon} />
                  <span>Base bridge</span>
                </a>
              </div>
            )}
          </div>

          <div className="nav-menu-item">
            <a href="http://portfolio.1inch.io/#/" target="_blank">
              <span>Portfolio</span>
            </a>
          </div>
          <div className="nav-menu-item">
            <span className="nav-menu-item-buy-crypto">Buy Crypto</span>
          </div>
          <div className="nav-menu-item">
            <a href="https://1inch.io/card/" target="_blank">
              <span>Card</span>
              <span className="nav-menu-item-purple">NEW</span>
            </a>
          </div>
        </div>
      </div>
      <div className="header-buttons"></div>

      {dropdownVisible && (
        <div className="header-menu-dropdown">
          <div className="header-menu-dropdown-item">
            <a
              className="header-menu-dropdown-item-link"
              href="https://docs.1inch.io/"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <defs>
                  <svg
                    id="api"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.7052 6.70538C15.3157 6.31581 14.684 6.31581 14.2945 6.70538C13.9052 7.09466 13.9048 7.72569 14.2937 8.11538L18.1698 12L14.2937 15.8846C13.9048 16.2743 13.9052 16.9053 14.2945 17.2946C14.684 17.6842 15.3157 17.6842 15.7052 17.2946L20.2927 12.7071C20.6833 12.3166 20.6833 11.6834 20.2927 11.2929L15.7052 6.70538Z"
                      fill="#6c86ad"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.29477 6.70538C8.68434 6.31581 9.31597 6.31581 9.70554 6.70538C10.0948 7.09466 10.0952 7.72569 9.70631 8.11538L5.83016 12L9.70631 15.8846C10.0952 16.2743 10.0948 16.9053 9.70554 17.2946C9.31597 17.6842 8.68434 17.6842 8.29477 17.2946L3.70726 12.7071C3.31674 12.3166 3.31674 11.6834 3.70726 11.2929L8.29477 6.70538Z"
                      fill="#6c86ad"
                    ></path>
                  </svg>
                </defs>
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.7052 6.70538C15.3157 6.31581 14.684 6.31581 14.2945 6.70538C13.9052 7.09466 13.9048 7.72569 14.2937 8.11538L18.1698 12L14.2937 15.8846C13.9048 16.2743 13.9052 16.9053 14.2945 17.2946C14.684 17.6842 15.3157 17.6842 15.7052 17.2946L20.2927 12.7071C20.6833 12.3166 20.6833 11.6834 20.2927 11.2929L15.7052 6.70538Z"
                    fill="#6c86ad"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.29477 6.70538C8.68434 6.31581 9.31597 6.31581 9.70554 6.70538C10.0948 7.09466 10.0952 7.72569 9.70631 8.11538L5.83016 12L9.70631 15.8846C10.0952 16.2743 10.0948 16.9053 9.70554 17.2946C9.31597 17.6842 8.68434 17.6842 8.29477 17.2946L3.70726 12.7071C3.31674 12.3166 3.31674 11.6834 3.70726 11.2929L8.29477 6.70538Z"
                    fill="#6c86ad"
                  ></path>
                </g>
              </svg>

              <span>Documentation</span>
            </a>
          </div>
          <div className="header-menu-dropdown-item">
            <a
              className="header-menu-dropdown-item-link"
              href="https://docs.1inch.io/"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <defs>
                  <svg
                    id="blog-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 8C2 5.23858 4.23858 3 7 3H14C15.8638 3 17.4299 4.27477 17.874 6H18C20.2091 6 22 7.79086 22 10V16C22 18.7614 19.7614 21 17 21H7C4.23858 21 2 18.7614 2 16V8ZM18 8V16.1379C18 16.6902 17.5523 17.1379 17 17.1379C16.4477 17.1379 16 16.6902 16 16.1379V7C16 5.89543 15.1046 5 14 5H7C5.34315 5 4 6.34315 4 8V16C4 17.6569 5.34315 19 7 19H17C18.6569 19 20 17.6569 20 16V10C20 8.89543 19.1046 8 18 8ZM6 16C6 15.4477 6.44772 15 7 15L13 15C13.5523 15 14 15.4477 14 16C14 16.5523 13.5523 17 13 17L7 17C6.44772 17 6 16.5523 6 16ZM8 13C6.89543 13 6 12.1046 6 11V9C6 7.89543 6.89543 7 8 7H12C13.1046 7 14 7.89543 14 9V11C14 12.1046 13.1046 13 12 13H8ZM8 11H12V9H8V11Z"
                      fill="#6c86ad"
                    ></path>
                  </svg>
                </defs>
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 8C2 5.23858 4.23858 3 7 3H14C15.8638 3 17.4299 4.27477 17.874 6H18C20.2091 6 22 7.79086 22 10V16C22 18.7614 19.7614 21 17 21H7C4.23858 21 2 18.7614 2 16V8ZM18 8V16.1379C18 16.6902 17.5523 17.1379 17 17.1379C16.4477 17.1379 16 16.6902 16 16.1379V7C16 5.89543 15.1046 5 14 5H7C5.34315 5 4 6.34315 4 8V16C4 17.6569 5.34315 19 7 19H17C18.6569 19 20 17.6569 20 16V10C20 8.89543 19.1046 8 18 8ZM6 16C6 15.4477 6.44772 15 7 15L13 15C13.5523 15 14 15.4477 14 16C14 16.5523 13.5523 17 13 17L7 17C6.44772 17 6 16.5523 6 16ZM8 13C6.89543 13 6 12.1046 6 11V9C6 7.89543 6.89543 7 8 7H12C13.1046 7 14 7.89543 14 9V11C14 12.1046 13.1046 13 12 13H8ZM8 11H12V9H8V11Z"
                    fill="#6c86ad"
                  ></path>
                </g>
              </svg>
              <span>Blog</span>
            </a>
          </div>
          <div className="header-menu-dropdown-item">
            <a
              className="header-menu-dropdown-item-link"
              href="https://docs.1inch.io/"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <defs>
                  <svg
                    id="help"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M11.8208 14.043C11.3803 14.043 11.0102 13.6832 11.0795 13.2482C11.1179 13.0073 11.1759 12.7973 11.2535 12.6183C11.407 12.2643 11.7093 11.8768 12.1605 11.4556C12.6163 11.03 12.9047 10.7276 13.0256 10.5484C13.2116 10.2751 13.3047 9.97939 13.3047 9.66129C13.3047 9.24014 13.1953 8.9198 12.9767 8.70027C12.7628 8.47625 12.4465 8.36425 12.0279 8.36425C11.6279 8.36425 11.3047 8.47401 11.0581 8.69355C11.0227 8.72509 10.9898 8.75832 10.9595 8.79324C10.6546 9.1449 10.3181 9.57392 9.85265 9.57392C9.38337 9.57392 8.98483 9.18077 9.12981 8.73445C9.26312 8.32405 9.49892 7.97664 9.83721 7.6922C10.3907 7.23073 11.1209 7 12.0279 7C12.9628 7 13.6907 7.22849 14.2116 7.68548C14.7372 8.14247 15 8.78091 15 9.60081C15 10.3311 14.6465 11.0502 13.9395 11.7581L13.0814 12.5712C12.9126 12.756 12.7888 12.9875 12.71 13.2658C12.5912 13.6853 12.2568 14.043 11.8208 14.043ZM10.9047 16.1331C10.9047 15.8687 10.9907 15.6559 11.1628 15.4946C11.3349 15.3289 11.5674 15.246 11.8605 15.246C12.1581 15.246 12.393 15.3311 12.5651 15.5013C12.7372 15.6671 12.8233 15.8777 12.8233 16.1331C12.8233 16.3795 12.7395 16.5856 12.5721 16.7513C12.4047 16.9171 12.1674 17 11.8605 17C11.5535 17 11.3163 16.9171 11.1488 16.7513C10.986 16.5856 10.9047 16.3795 10.9047 16.1331Z"
                      fill="#6c86ad"
                    ></path>
                  </svg>
                </defs>
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                    fill="#6c86ad"
                  ></path>
                  <path
                    d="M11.8208 14.043C11.3803 14.043 11.0102 13.6832 11.0795 13.2482C11.1179 13.0073 11.1759 12.7973 11.2535 12.6183C11.407 12.2643 11.7093 11.8768 12.1605 11.4556C12.6163 11.03 12.9047 10.7276 13.0256 10.5484C13.2116 10.2751 13.3047 9.97939 13.3047 9.66129C13.3047 9.24014 13.1953 8.9198 12.9767 8.70027C12.7628 8.47625 12.4465 8.36425 12.0279 8.36425C11.6279 8.36425 11.3047 8.47401 11.0581 8.69355C11.0227 8.72509 10.9898 8.75832 10.9595 8.79324C10.6546 9.1449 10.3181 9.57392 9.85265 9.57392C9.38337 9.57392 8.98483 9.18077 9.12981 8.73445C9.26312 8.32405 9.49892 7.97664 9.83721 7.6922C10.3907 7.23073 11.1209 7 12.0279 7C12.9628 7 13.6907 7.22849 14.2116 7.68548C14.7372 8.14247 15 8.78091 15 9.60081C15 10.3311 14.6465 11.0502 13.9395 11.7581L13.0814 12.5712C12.9126 12.756 12.7888 12.9875 12.71 13.2658C12.5912 13.6853 12.2568 14.043 11.8208 14.043ZM10.9047 16.1331C10.9047 15.8687 10.9907 15.6559 11.1628 15.4946C11.3349 15.3289 11.5674 15.246 11.8605 15.246C12.1581 15.246 12.393 15.3311 12.5651 15.5013C12.7372 15.6671 12.8233 15.8777 12.8233 16.1331C12.8233 16.3795 12.7395 16.5856 12.5721 16.7513C12.4047 16.9171 12.1674 17 11.8605 17C11.5535 17 11.3163 16.9171 11.1488 16.7513C10.986 16.5856 10.9047 16.3795 10.9047 16.1331Z"
                    fill="#6c86ad"
                  ></path>
                </g>
              </svg>
              <span>Help</span>
            </a>
          </div>
          <div className="header-menu-dropdown-item">
            <a
              className="header-menu-dropdown-item-link"
              href="https://docs.1inch.io/"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <defs>
                  <svg
                    id="arrow-link"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 7C6 6.44772 6.44772 6 7 6H8C8.55228 6 9 5.55228 9 5C9 4.44772 8.55228 4 8 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V16C20 15.4477 19.5523 15 19 15C18.4477 15 18 15.4477 18 16V17C18 17.5523 17.5523 18 17 18H7C6.44772 18 6 17.5523 6 17V7ZM11 5C11 4.44772 11.4477 4 12 4H19C19.5523 4 20 4.44772 20 5V12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12V7.41421L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L16.5858 6H12C11.4477 6 11 5.55228 11 5Z"
                      fill="#6c86ad"
                    ></path>
                  </svg>
                </defs>
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 7C6 6.44772 6.44772 6 7 6H8C8.55228 6 9 5.55228 9 5C9 4.44772 8.55228 4 8 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V16C20 15.4477 19.5523 15 19 15C18.4477 15 18 15.4477 18 16V17C18 17.5523 17.5523 18 17 18H7C6.44772 18 6 17.5523 6 17V7ZM11 5C11 4.44772 11.4477 4 12 4H19C19.5523 4 20 4.44772 20 5V12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12V7.41421L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L16.5858 6H12C11.4477 6 11 5.55228 11 5Z"
                    fill="#6c86ad"
                  ></path>
                </g>
              </svg>
              <span>Suggest a feature</span>
            </a>
          </div>
          <div className="header-menu-dropdown-item">
            <a
              className="header-menu-dropdown-item-link"
              href="https://docs.1inch.io/"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <defs>
                  <svg
                    id="bug"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 6L17.7143 8.54545L15.4838 9.5M4 12H8M16 12H20M5 6L6.28571 8.54545L8.5 9.5M8 14.5C8 16.4583 9.59772 18 11.4914 18H12.5074C14.4011 18 16 16.4583 16 14.5M8 14.5V11C8 9.69409 9.08572 8.54545 10.3486 8.54545H13.6503C14.9131 8.54545 16 9.69409 16 11V14.5M8 14.5L6 16L5 18M16 14.5L18 16L19 18M14.2857 8.54545H9.71429V6.18182C9.71429 5.52945 10.2263 5 10.8571 5H13.1429C13.7737 5 14.2857 5.52945 14.2857 6.18182V8.54545Z"
                      stroke="#6c86ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </defs>
                <g>
                  <path
                    d="M19 6L17.7143 8.54545L15.4838 9.5M4 12H8M16 12H20M5 6L6.28571 8.54545L8.5 9.5M8 14.5C8 16.4583 9.59772 18 11.4914 18H12.5074C14.4011 18 16 16.4583 16 14.5M8 14.5V11C8 9.69409 9.08572 8.54545 10.3486 8.54545H13.6503C14.9131 8.54545 16 9.69409 16 11V14.5M8 14.5L6 16L5 18M16 14.5L18 16L19 18M14.2857 8.54545H9.71429V6.18182C9.71429 5.52945 10.2263 5 10.8571 5H13.1429C13.7737 5 14.2857 5.52945 14.2857 6.18182V8.54545Z"
                    stroke="#6c86ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <span>Report a bug</span>
            </a>
          </div>
          <div className="header-menu-dropdown-item">
            <a
              className="header-menu-dropdown-item-link"
              href="https://docs.1inch.io/"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <defs>
                  <svg
                    id="search-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0005 19C12.7755 18.9996 14.4993 18.4054 15.8975 17.312L19.5865 21.001C19.977 21.3915 20.61 21.3915 21.0005 21.001C21.391 20.6105 21.391 19.9775 21.0005 19.587L17.3115 15.898C18.4055 14.4997 19.0001 12.7754 19.0005 11C19.0005 6.589 15.4115 3 11.0005 3C6.58949 3 3.00049 6.589 3.00049 11C3.00049 15.411 6.58949 19 11.0005 19ZM11.0005 5C14.3095 5 17.0005 7.691 17.0005 11C17.0005 14.309 14.3095 17 11.0005 17C7.69149 17 5.00049 14.309 5.00049 11C5.00049 7.691 7.69149 5 11.0005 5Z"
                      fill="#6c86ad"
                    ></path>
                  </svg>
                </defs>
                <g>
                  <path
                    d="M11.0005 19C12.7755 18.9996 14.4993 18.4054 15.8975 17.312L19.5865 21.001C19.977 21.3915 20.61 21.3915 21.0005 21.001C21.391 20.6105 21.391 19.9775 21.0005 19.587L17.3115 15.898C18.4055 14.4997 19.0001 12.7754 19.0005 11C19.0005 6.589 15.4115 3 11.0005 3C6.58949 3 3.00049 6.589 3.00049 11C3.00049 15.411 6.58949 19 11.0005 19ZM11.0005 5C14.3095 5 17.0005 7.691 17.0005 11C17.0005 14.309 14.3095 17 11.0005 17C7.69149 17 5.00049 14.309 5.00049 11C5.00049 7.691 7.69149 5 11.0005 5Z"
                    fill="#6c86ad"
                  ></path>
                </g>
              </svg>
              <span>Address screening</span>
            </a>
          </div>
          <div className="header-menu-dropdown-item">
            <a
              className="header-menu-dropdown-item-link"
              href="https://docs.1inch.io/"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <defs>
                  <svg
                    id="terms-privacy"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 3L8 3C6.34315 3 5 4.34315 5 6L5 18C5 19.6569 6.34315 21 8 21L15.5 21M13 3L19 9M13 3L13 7C13 8.10457 13.8954 9 15 9L19 9M19 9L19 15"
                      stroke="#6c86ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 24C21.7614 24 24 21.7614 24 19C24 16.2386 21.7614 14 19 14C16.2386 14 14 16.2386 14 19C14 21.7614 16.2386 24 19 24ZM21.5657 18.5657C21.8781 18.2533 21.8781 17.7467 21.5657 17.4343C21.2533 17.1219 20.7467 17.1219 20.4343 17.4343L18.5 19.3686L17.5657 18.4343C17.2533 18.1219 16.7467 18.1219 16.4343 18.4343C16.1219 18.7467 16.1219 19.2533 16.4343 19.5657L17.9343 21.0657C18.2467 21.3781 18.7533 21.3781 19.0657 21.0657L21.5657 18.5657Z"
                      fill="#6c86ad"
                    ></path>
                    <path
                      d="M9 17H12"
                      stroke="#6c86ad"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 13H15"
                      stroke="#6c86ad"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </defs>
                <g>
                  <path
                    d="M13 3L8 3C6.34315 3 5 4.34315 5 6L5 18C5 19.6569 6.34315 21 8 21L15.5 21M13 3L19 9M13 3L13 7C13 8.10457 13.8954 9 15 9L19 9M19 9L19 15"
                    stroke="#6c86ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 24C21.7614 24 24 21.7614 24 19C24 16.2386 21.7614 14 19 14C16.2386 14 14 16.2386 14 19C14 21.7614 16.2386 24 19 24ZM21.5657 18.5657C21.8781 18.2533 21.8781 17.7467 21.5657 17.4343C21.2533 17.1219 20.7467 17.1219 20.4343 17.4343L18.5 19.3686L17.5657 18.4343C17.2533 18.1219 16.7467 18.1219 16.4343 18.4343C16.1219 18.7467 16.1219 19.2533 16.4343 19.5657L17.9343 21.0657C18.2467 21.3781 18.7533 21.3781 19.0657 21.0657L21.5657 18.5657Z"
                    fill="#6c86ad"
                  ></path>
                  <path
                    d="M9 17H12"
                    stroke="#6c86ad"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M9 13H15"
                    stroke="#6c86ad"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <span>Terms of use</span>
            </a>
          </div>
          <div className="header-menu-dropdown-item">
            <a
              className="header-menu-dropdown-item-link"
              href="https://docs.1inch.io/"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <defs>
                  <svg
                    id="terms-privacy"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 3L8 3C6.34315 3 5 4.34315 5 6L5 18C5 19.6569 6.34315 21 8 21L15.5 21M13 3L19 9M13 3L13 7C13 8.10457 13.8954 9 15 9L19 9M19 9L19 15"
                      stroke="#6c86ad"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 24C21.7614 24 24 21.7614 24 19C24 16.2386 21.7614 14 19 14C16.2386 14 14 16.2386 14 19C14 21.7614 16.2386 24 19 24ZM21.5657 18.5657C21.8781 18.2533 21.8781 17.7467 21.5657 17.4343C21.2533 17.1219 20.7467 17.1219 20.4343 17.4343L18.5 19.3686L17.5657 18.4343C17.2533 18.1219 16.7467 18.1219 16.4343 18.4343C16.1219 18.7467 16.1219 19.2533 16.4343 19.5657L17.9343 21.0657C18.2467 21.3781 18.7533 21.3781 19.0657 21.0657L21.5657 18.5657Z"
                      fill="#6c86ad"
                    ></path>
                    <path
                      d="M9 17H12"
                      stroke="#6c86ad"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 13H15"
                      stroke="#6c86ad"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </defs>
                <g>
                  <path
                    d="M13 3L8 3C6.34315 3 5 4.34315 5 6L5 18C5 19.6569 6.34315 21 8 21L15.5 21M13 3L19 9M13 3L13 7C13 8.10457 13.8954 9 15 9L19 9M19 9L19 15"
                    stroke="#6c86ad"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 24C21.7614 24 24 21.7614 24 19C24 16.2386 21.7614 14 19 14C16.2386 14 14 16.2386 14 19C14 21.7614 16.2386 24 19 24ZM21.5657 18.5657C21.8781 18.2533 21.8781 17.7467 21.5657 17.4343C21.2533 17.1219 20.7467 17.1219 20.4343 17.4343L18.5 19.3686L17.5657 18.4343C17.2533 18.1219 16.7467 18.1219 16.4343 18.4343C16.1219 18.7467 16.1219 19.2533 16.4343 19.5657L17.9343 21.0657C18.2467 21.3781 18.7533 21.3781 19.0657 21.0657L21.5657 18.5657Z"
                    fill="#6c86ad"
                  ></path>
                  <path
                    d="M9 17H12"
                    stroke="#6c86ad"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M9 13H15"
                    stroke="#6c86ad"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <span>Privacy policy</span>
            </a>
          </div>
        </div>
      )}
      <ConnectButton />
    </div>
  );
}

export default Header;
