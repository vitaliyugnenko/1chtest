import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
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

const formatAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
/*
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
};*/
/*
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
*/
function Header() {
  const [error, setError] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownBridgeVisible, setDropdownBridgeVisible] = useState(false);
  const [dropdownNetworksVisible, setDropdownNetworksVisible] = useState(false);
  const [dropdownTradeVisible, setDropdownTradeVisible] = useState(false);

  const [provider, setProvider] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);

  const handleConnectWallet = async () => {
    setError();
    await connectWallet({ setWalletAddress, setError });
  };
  /*
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
*/

  useEffect(() => {
    const initWeb3Modal = async () => {
      const modal = new Web3Modal({
        cacheProvider: true, // Сохранение выбранного провайдера между сессиями
      });
      setWeb3Modal(modal);
    };
    initWeb3Modal();
  }, []);

  const connectWallet = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      setProvider(provider);

      const accounts = await provider.listAccounts();
      setWalletAddress(accounts.length ? accounts[0] : "");
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  const disconnectWallet = async () => {
    web3Modal.clearCachedProvider();
    setProvider(null);
    setWalletAddress("");
  };

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

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
      <div className="header-buttons">
        <div
          className="network-button"
          onClick={() => setDropdownNetworksVisible(!dropdownNetworksVisible)}
        >
          <button>
            <span>Polygon</span>
          </button>
          {dropdownNetworksVisible && (
            <div
              className={`dropdown-networks ${
                dropdownNetworksVisible ? "visible" : ""
              }`}
            >
              <a className="dropdown-networks-item">
                <img src={ethereumIcon} />
                <span>Ethereum</span>
              </a>

              <a className="dropdown-networks-item l2">
                <img src={l2Icon} className="dropdown-networks-item-l2-icon" />
                <img src={arbitrumIcon} />
                <span>Arbitrum</span>
              </a>
              <a className="dropdown-networks-item l2">
                <img src={l2Icon} className="dropdown-networks-item-l2-icon" />
                <img src={optimismIcon} />
                <span>Optimism</span>
              </a>
              <a className="dropdown-networks-item l2">
                <img src={l2Icon} className="dropdown-networks-item-l2-icon" />
                <img src={zksyncIcon} />
                <span>zkSync Era</span>
              </a>
              <a className="dropdown-networks-item l2">
                <img src={l2Icon} className="dropdown-networks-item-l2-icon" />
                <img src={baseIcon} />
                <span>Base</span>
              </a>
              <a className="dropdown-networks-item">
                <img src={bnbIcon} />
                <span>BNB Chain</span>
              </a>
              <a className="dropdown-networks-item">
                <img src={polygonIcon} />
                <span>Polygon</span>
              </a>
              <a className="dropdown-networks-item">
                <img src={gnosisIcon} />
                <span>Gnosis</span>
              </a>
              <a className="dropdown-networks-item">
                <img src={avalancheIcon} />
                <span>Avalanche</span>
              </a>
              <a className="dropdown-networks-item">
                <img src={fantomIcon} />
                <span>Fantom</span>
              </a>
              <a className="dropdown-networks-item">
                <img src={klaytnIcon} />
                <span>Klaytn</span>
              </a>
              <a className="dropdown-networks-item">
                <img src={auroraIcon} />
                <span>Aurora</span>
              </a>
            </div>
          )}
        </div>
        <div className="account-button">
          {walletAddress ? (
            <button
              className="account-button-wallet-connected"
              onClick={handleConnectWallet}
            >
              <img src={metamask} alt="MetaMask" />
              <span>{walletAddress}</span>
            </button>
          ) : (
            <button className="account-button-diconnected">
              <span className="account-button-wallet-disconnected">
                <button onClick={connectWallet}>Connect wallet</button>
              </span>
            </button>
          )}
        </div>
      </div>

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
      )}
    </div>
  );
}

export default Header;
