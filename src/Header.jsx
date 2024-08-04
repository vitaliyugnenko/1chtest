import { useState, useEffect, useRef, useCallback } from "react";
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
import simpleModeIconDark from "./assets/simple-mode-dark.svg";
import advancedModeIcon from "./assets/advanced-mode.svg";
import limitOrderIcon from "./assets/limit-order.svg";
import settingsArrowRight from "./assets/arrow-right.svg";
import iconUSFlag from "./assets/US_icon.webp";
import iconArrowLeft from "./assets/arrow-left.svg";
import iconLightTheme from "./assets/Light theme-1.svg";
import iconDarkTheme from "./assets/dark-theme.svg";
import selectedItemIcon from "./assets/selected-item.svg";

import iconRUSFlag from "./assets/RU_icon.webp"
import iconFRFlag from "./assets/FR_icon.webp"
import iconTRFlag from "./assets/TR_icon.webp"
import iconPTFlag from "./assets/PT_icon.webp"
import iconESFlag from "./assets/ES_icon.webp"
import iconIDFlag from "./assets/ID_icon.webp"

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
};*/

function Header({walletAddress, setWalletAddress}) {
  const [error, setError] = useState();
  //const [walletAddress, setWalletAddress] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownBridgeVisible, setDropdownBridgeVisible] = useState(false);
  const [dropdownNetworksVisible, setDropdownNetworksVisible] = useState(false);
  const [dropdownTradeVisible, setDropdownTradeVisible] = useState(false);
  const [dropdownSettingsVisible, setDropdownSettingsVisible] = useState(false);

  const [dropdownSettingsTheme, setDropdownSettingsTheme] = useState(false);
  const [dropdownSettingsLanguage, setDropdownSettingsLanguage] =
    useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isTradeOpen, setIsTradeOpen] = useState(false);
  const [isBridgesOpen, setIsBridgesOpen] = useState(false);

  const [timerId, setTimerId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timer3, setTimer3] = useState(null);
  const dropdownRef3 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    // Устанавливаем таймер на 300ms (или другое время по вашему выбору)
    const id = setTimeout(() => {
      setDropdownVisible(false);
    }, 300);
    setTimerId(id);
  };

  const handleDropdownMouseEnter = () => {
    // Очистить таймер, чтобы предотвратить скрытие
    if (timerId) {
      clearTimeout(timerId);
    }
    setDropdownVisible(true);
  };

  const handleDropdownMouseLeave = () => {
    // Устанавливаем таймер на 300ms (или другое время по вашему выбору)
    const id = setTimeout(() => {
      setDropdownVisible(false);
    }, 300);
    setTimerId(id);
  };

  const handleMouseEnter2 = () => {
    if (timer) clearTimeout(timer);
    setDropdownTradeVisible(true);
  };

  const handleMouseLeave2 = () => {
    const newTimer = setTimeout(() => {
      setDropdownTradeVisible(false);
    }, 300); // Задержка на 300 мс
    setTimer(newTimer);
  };

  const handleDropdownMouseEnter2 = useCallback(() => {
    if (timer) clearTimeout(timer);
  }, [timer]);

  const handleDropdownMouseLeave2 = useCallback(() => {
    const newTimer = setTimeout(() => {
      setDropdownTradeVisible(false);
    }, 300);
    setTimer(newTimer);
  }, [timer]);

  const handleMouseEnter3 = () => {
    if (timer3) clearTimeout(timer3);
    setDropdownBridgeVisible(true);
  };

  const handleMouseLeave3 = () => {
    const newTimer = setTimeout(() => {
      setDropdownBridgeVisible(false);
    }, 300); // Задержка на 300 мс
    setTimer3(newTimer);
  };

  const handleDropdownMouseEnter3 = useCallback(() => {
    if (timer3) clearTimeout(timer3);
  }, [timer3]);

  const handleDropdownMouseLeave3 = useCallback(() => {
    const newTimer = setTimeout(() => {
      setDropdownBridgeVisible(false);
    }, 300);
    setTimer(newTimer);
  }, [timer3]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTrade = () => {
    setIsTradeOpen(!isTradeOpen);
  };

  const toggleBridges = () => {
    setIsBridgesOpen(!isBridgesOpen);
  };

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
  });

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
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
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

            <div
              className={`dropdown-trade ${
                dropdownTradeVisible ? "visible" : ""
              }`}
              ref={dropdownRef2}
              onMouseEnter={handleDropdownMouseEnter2}
              onMouseLeave={handleDropdownMouseLeave2}
            >
              <a className="dropdown-trade-item" href="https://app.1inch.io/#/1/simple/swap/USDT/WBTC" target="_blank">
                <img src={simpleModeIcon} />
                <div
                  id="dropdown-trade-item-selected"
                  className="dropdown-trade-item-content"
                >
                  <h2>Simple mode</h2>
                  <span>The most user-friendly way to trade</span>
                </div>
              </a>
              <a className="dropdown-trade-item" href="https://app.1inch.io/#/1/advanced/swap/USDT/WBTC" target="_blank">
                <img src={advancedModeIcon} />
                <div className="dropdown-trade-item-content">
                  <h2>Advanced mode</h2>
                  <span>Take advantage of all the familiar tools</span>
                </div>
              </a>
              <a className="dropdown-trade-item" href="https://app.1inch.io/#/1/advanced/limit-order/USDT/WBTC" target="_blank">
                <img src={limitOrderIcon} />
                <div className="dropdown-trade-item-content">
                  <h2>Limit order</h2>
                  <span>Schedule a swap to get the best price</span>
                </div>
              </a>
            </div>
          </div>
          <div className="nav-menu-item">
            <span className="nav-menu-item-dao">DAO</span>
          </div>

          <div
            className="nav-menu-item"
            onMouseEnter={handleMouseEnter3}
            onMouseLeave={handleMouseLeave3}
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

            <div
              className={`dropdownBridges ${
                dropdownBridgeVisible ? "visible" : ""
              }`}
              onMouseEnter={handleDropdownMouseEnter3}
              onMouseLeave={handleDropdownMouseLeave3}
              ref={dropdownRef3}
            >
              <a className="dropdownBridges-item" href="https://cbridge.celer.network/" target="_blank">
                <img src={bnbIcon} />
                <span>BNB Chain bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://wallet.polygon.technology/polygon/bridge/" target="_blank">
                <img src={polygonIcon} />
                <span>Polygon bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://app.optimism.io/bridge" target="_blank">
                <img src={optimismIcon} />
                <span>Optimism bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://bridge.arbitrum.io/" target="_blank">
                <img src={arbitrumIcon} />
                <span>Arbitrum bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://omni.gnosischain.com/bridge" target="_blank">
                <img src={gnosisIcon} />
                <span>Gnosis Chain bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://bridge.avax.network/" target="_blank">
                <img src={avalancheIcon} />
                <span>Avalanche bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://cbridge.celer.network/250/1/WOO" target="_blank">
                <img src={fantomIcon} />
                <span>Fantom bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://scope.klaytn.com/bridge" target="_blank">
                <img src={klaytnIcon} />
                <span>Klaytn bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://rainbowbridge.app/transfer" target="_blank">
                <img src={auroraIcon} />
                <span>Aurora bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://bridge.zksync.io/" target="_blank">
                <img src={zksyncIcon} />
                <span>zkSync Era bridge</span>
              </a>
              <a className="dropdownBridges-item" href="https://bridge.base.org/" target="_blank">
                <img src={baseIcon} />
                <span>Base bridge</span>
              </a>
            </div>
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
        <ConnectButton
          chainStatus={{
            smallScreen: "icon",
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: true,
            largeScreen: true,
          }}
        />
        <div
          className="nav-menu-item"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <svg
            id="help2"
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
              fill="currentColor"
            ></path>
          </svg>
          {dropdownVisible && (
            <div
              className="header-menu-dropdown"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
              ref={dropdownRef}
            >
              <div className="header-menu-dropdown-item">
                <a
                  className="header-menu-dropdown-item-link"
                  href="https://docs.1inch.io/"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
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
                  href="https://blog.1inch.io/"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
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
                  href="https://help.1inch.io/"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
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
                  href="https://submit.1inch.io/b/feature-requests/"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
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
                  href="https://airtable.com/appSboutSbD7Mrej9/shrddQOOkm3hOLuzd/"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
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
                  href="https://help.1inch.io/en/articles/6588963-address-screening"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
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
                  href="https://1inch.io/assets/1inch_network_terms_of_use.pdf"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
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
                  href="https://1inch.io/assets/1inch_network_privacy_policy.pdf"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
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
        </div>

        <div
          className="nav-menu-item"
          onClick={() => setDropdownSettingsVisible(!dropdownSettingsVisible)}
        >
          <svg
            id="settings4"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1871 17.2321L16.6871 18.0981L16.6871 18.0981L17.1871 17.2321ZM19.9191 16.5L19.0531 16H19.0531L19.9191 16.5ZM19.1871 13.768L19.6871 12.9019L19.1871 13.768ZM19.1871 10.2321L19.6871 11.0981L19.1871 10.2321ZM19.9191 7.50003L19.0531 8.00003L19.0531 8.00003L19.9191 7.50003ZM17.1871 6.76797L16.6871 5.90195L17.1871 6.76797ZM7.06271 6.76797L7.56271 5.90195L7.06271 6.76797ZM4.33066 7.50003L5.19669 8.00003H5.19669L4.33066 7.50003ZM5.06271 10.2321L5.56271 9.36605H5.56271L5.06271 10.2321ZM5.06271 13.768L4.56271 12.9019H4.56271L5.06271 13.768ZM4.33066 16.5L5.19669 16L4.33066 16.5ZM7.06271 17.2321L7.56271 18.0981L7.56271 18.0981L7.06271 17.2321ZM5.61325 10.5499L5.11325 11.416L5.61325 10.5499ZM6.13777 11.6036L5.13989 11.5385L6.13777 11.6036ZM8.78903 7.01205L9.3457 7.84278L8.78903 7.01205ZM7.6131 7.08574L7.1131 7.95177L7.6131 7.08574ZM18.112 11.6036L19.1099 11.5385L18.112 11.6036ZM18.6365 10.5499L19.1365 11.416L18.6365 10.5499ZM14.7761 17.3839L14.3337 16.4872L14.7761 17.3839ZM16.6367 7.08575L16.1367 6.21972L16.6367 7.08575ZM15.4607 7.01206L14.9041 7.84279L15.4607 7.01206ZM14.7761 6.61605L15.2186 5.71926L14.7761 6.61605ZM15.4607 16.988L14.904 16.1572L15.4607 16.988ZM16.6366 16.9143L17.1366 16.0483L16.6366 16.9143ZM7.61314 16.9143L7.11314 16.0483L7.61314 16.9143ZM8.78906 16.988L9.34573 16.1572L8.78906 16.988ZM18.6365 13.4501L18.1365 14.3161L18.6365 13.4501ZM18.112 12.3965L17.1141 12.3314L18.112 12.3965ZM12.1249 20C11.5726 20 11.1249 19.5523 11.1249 19H9.12491C9.12491 20.6569 10.4681 22 12.1249 22V20ZM13.1249 19C13.1249 19.5523 12.6772 20 12.1249 20V22C13.7818 22 15.1249 20.6569 15.1249 19H13.1249ZM13.1249 18.3657V19H15.1249V18.3657H13.1249ZM14.904 16.1572C14.7219 16.2793 14.5314 16.3896 14.3337 16.4872L15.2186 18.2807C15.4958 18.144 15.7626 17.9894 16.0174 17.8187L14.904 16.1572ZM17.6871 16.3661L17.1366 16.0483L16.1366 17.7803L16.6871 18.0981L17.6871 16.3661ZM19.0531 16C18.777 16.4783 18.1654 16.6422 17.6871 16.3661L16.6871 18.0981C18.1219 18.9265 19.9567 18.4349 20.7851 17L19.0531 16ZM18.6871 14.634C19.1654 14.9101 19.3292 15.5217 19.0531 16L20.7851 17C21.6136 15.5651 21.1219 13.7304 19.6871 12.9019L18.6871 14.634ZM18.1365 14.3161L18.6871 14.634L19.6871 12.9019L19.1365 12.5841L18.1365 14.3161ZM17.1249 12C17.1249 12.1115 17.1212 12.222 17.1141 12.3314L19.1099 12.4616C19.1198 12.3089 19.1249 12.1549 19.1249 12H17.1249ZM17.1141 11.6687C17.1212 11.7781 17.1249 11.8885 17.1249 12H19.1249C19.1249 11.8451 19.1198 11.6912 19.1099 11.5385L17.1141 11.6687ZM18.6871 9.36605L18.1365 9.68392L19.1365 11.416L19.6871 11.0981L18.6871 9.36605ZM19.0531 8.00003C19.3292 8.47832 19.1654 9.08991 18.6871 9.36605L19.6871 11.0981C21.1219 10.2697 21.6136 8.4349 20.7851 7.00003L19.0531 8.00003ZM17.6871 7.634C18.1654 7.35786 18.777 7.52173 19.0531 8.00003L20.7851 7.00003C19.9567 5.56515 18.1219 5.07352 16.6871 5.90195L17.6871 7.634ZM17.1367 7.95178L17.6871 7.634L16.6871 5.90195L16.1367 6.21972L17.1367 7.95178ZM14.3337 7.51284C14.5314 7.61041 14.7219 7.72074 14.9041 7.84279L16.0174 6.18133C15.7626 6.01058 15.4958 5.85605 15.2186 5.71926L14.3337 7.51284ZM13.1249 5V5.63425H15.1249V5H13.1249ZM12.1249 4C12.6772 4 13.1249 4.44772 13.1249 5H15.1249C15.1249 3.34315 13.7818 2 12.1249 2V4ZM11.1249 5C11.1249 4.44772 11.5726 4 12.1249 4V2C10.4681 2 9.12491 3.34315 9.12491 5H11.1249ZM11.1249 5.63422V5H9.12491V5.63422H11.1249ZM9.3457 7.84278C9.52785 7.72073 9.71835 7.61039 9.91612 7.51282L9.03123 5.71923C8.75397 5.85602 8.48718 6.01056 8.23235 6.18133L9.3457 7.84278ZM6.56271 7.634L7.1131 7.95177L8.1131 6.21972L7.56271 5.90195L6.56271 7.634ZM5.19669 8.00003C5.47283 7.52173 6.08442 7.35786 6.56271 7.634L7.56271 5.90195C6.12783 5.07352 4.29306 5.56515 3.46464 7.00003L5.19669 8.00003ZM5.56271 9.36605C5.08442 9.08991 4.92054 8.47832 5.19669 8.00003L3.46464 7.00003C2.63621 8.4349 3.12783 10.2697 4.56271 11.0981L5.56271 9.36605ZM6.11325 9.6839L5.56271 9.36605L4.56271 11.0981L5.11325 11.416L6.11325 9.6839ZM7.12488 12C7.12488 11.8885 7.12851 11.778 7.13565 11.6687L5.13989 11.5385C5.12993 11.6912 5.12488 11.8451 5.12488 12H7.12488ZM7.13565 12.3314C7.12851 12.222 7.12488 12.1115 7.12488 12H5.12488C5.12488 12.155 5.12993 12.3089 5.13989 12.4616L7.13565 12.3314ZM5.56271 14.634L6.11325 14.3161L5.11325 12.5841L4.56271 12.9019L5.56271 14.634ZM5.19669 16C4.92054 15.5217 5.08442 14.9101 5.56271 14.634L4.56271 12.9019C3.12783 13.7304 2.63621 15.5651 3.46464 17L5.19669 16ZM6.56271 16.3661C6.08442 16.6422 5.47283 16.4783 5.19669 16L3.46464 17C4.29306 18.4349 6.12783 18.9265 7.56271 18.0981L6.56271 16.3661ZM7.11314 16.0483L6.56271 16.3661L7.56271 18.0981L8.11314 17.7803L7.11314 16.0483ZM9.91612 16.4872C9.71836 16.3896 9.52787 16.2793 9.34573 16.1572L8.23239 17.8187C8.48721 17.9895 8.75398 18.144 9.03123 18.2808L9.91612 16.4872ZM11.1249 19V18.3658H9.12491V19H11.1249ZM5.11325 11.416C5.10783 11.4128 5.11324 11.4126 5.1225 11.4318C5.13306 11.4538 5.14296 11.4914 5.13989 11.5385L7.13565 11.6687C7.18355 10.9342 6.86464 10.1177 6.11325 9.6839L5.11325 11.416ZM8.23235 6.18133C8.19308 6.20764 8.15557 6.2179 8.13133 6.21974C8.11011 6.22134 8.10764 6.21657 8.1131 6.21972L7.1131 7.95177C7.86564 8.38624 8.73348 8.25304 9.3457 7.84278L8.23235 6.18133ZM19.1099 11.5385C19.1068 11.4914 19.1167 11.4538 19.1273 11.4319C19.1365 11.4126 19.1419 11.4128 19.1365 11.416L18.1365 9.68392C17.3851 10.1177 17.0662 10.9342 17.1141 11.6687L19.1099 11.5385ZM5.13989 12.4616C5.14296 12.5087 5.13307 12.5463 5.1225 12.5682C5.11324 12.5874 5.10783 12.5872 5.11325 12.5841L6.11325 14.3161C6.86464 13.8823 7.18356 13.0658 7.13565 12.3314L5.13989 12.4616ZM15.1249 18.3657C15.1249 18.3721 15.122 18.3675 15.1341 18.3497C15.1479 18.3295 15.1758 18.3018 15.2186 18.2807L14.3337 16.4872C13.6739 16.8127 13.1249 17.497 13.1249 18.3657H15.1249ZM16.1367 6.21972C16.1421 6.21657 16.1397 6.22135 16.1184 6.21974C16.0942 6.21791 16.0567 6.20765 16.0174 6.18133L14.9041 7.84279C15.5163 8.25305 16.3841 8.38625 17.1367 7.95178L16.1367 6.21972ZM15.2186 5.71926C15.1758 5.69816 15.1479 5.67054 15.1341 5.65027C15.122 5.6325 15.1249 5.6279 15.1249 5.63425H13.1249C13.1249 6.503 13.6739 7.18732 14.3337 7.51284L15.2186 5.71926ZM16.0174 17.8187C16.0566 17.7924 16.0942 17.7821 16.1184 17.7803C16.1396 17.7787 16.1421 17.7835 16.1366 17.7803L17.1366 16.0483C16.3841 15.6138 15.5163 15.747 14.904 16.1572L16.0174 17.8187ZM8.11314 17.7803C8.10768 17.7835 8.11015 17.7787 8.13137 17.7803C8.15561 17.7821 8.19312 17.7924 8.23239 17.8187L9.34573 16.1572C8.73351 15.747 7.86567 15.6138 7.11314 16.0483L8.11314 17.7803ZM9.12491 5.63422C9.12491 5.62787 9.12783 5.63247 9.11571 5.65023C9.10187 5.67051 9.07399 5.69813 9.03123 5.71923L9.91612 7.51282C10.5759 7.1873 11.1249 6.50298 11.1249 5.63422H9.12491ZM9.03123 18.2808C9.07399 18.3019 9.10187 18.3295 9.11571 18.3498C9.12783 18.3675 9.12491 18.3721 9.12491 18.3658H11.1249C11.1249 17.497 10.5759 16.8127 9.91612 16.4872L9.03123 18.2808ZM19.1365 12.5841C19.1419 12.5872 19.1365 12.5874 19.1273 12.5682C19.1167 12.5463 19.1068 12.5087 19.1099 12.4616L17.1141 12.3314C17.0662 13.0658 17.3851 13.8823 18.1365 14.3161L19.1365 12.5841Z"
              fill="currentColor"
            ></path>
            <circle
              cx="12.125"
              cy="12"
              r="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></circle>
          </svg>

          {dropdownSettingsVisible && (
            <div
              className="header-settings-dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              {dropdownSettingsTheme ? (
                <>
                  <div className="dropdown-settings-theme-title">
                    <img
                      src={iconArrowLeft}
                      onClick={() => setDropdownSettingsTheme(false)}
                    />
                    <span>Theme</span>
                  </div>
                  <div className="dropdown-settings-theme-content">
                    <div className="dropdown-settings-theme-content-item">
                      <img
                        src={iconDarkTheme}
                        className="dropdown-settings-theme-dark-icon"
                      />
                      <span>Dark</span>
                      <img
                        src={selectedItemIcon}
                        className="dropdown-settings-theme-content-item-selected"
                      />
                    </div>
                    <div className="dropdown-settings-theme-content-item non-selected">
                      <img
                        src={iconLightTheme}
                        className="dropdown-settings-theme-light-icon"
                      />
                      <span>Light</span>
                    </div>
                  </div>
                </>
              ) : dropdownSettingsLanguage ? (
                <div className="dropdown-settings-container">
                  <div className="dropdown-settings-language-title">
                  <img
                      src={iconArrowLeft}
                      onClick={() => setDropdownSettingsLanguage(false)}
                    />
                    <div>Language</div>

                  </div>
                  <div className="dropdown-settings-language-content">
                  <div className="dropdown-settings-item-language"><img src={iconUSFlag} /><span>English</span></div>
                <div className="dropdown-settings-item-language"><img src={iconRUSFlag} /><span>Русский</span></div>
                <div className="dropdown-settings-item-language"><img src={iconFRFlag} /><span>Français</span></div>
                <div className="dropdown-settings-item-language"><img src={iconIDFlag} /><span>Bahasa Indonesia</span></div>
                <div className="dropdown-settings-item-language"><img src={iconESFlag} /><span>Español</span></div>
                <div className="dropdown-settings-item-language"><img src={iconPTFlag} /><span>Português</span></div>
                  </div>
               
                </div>
                
              ) : (
                <>
                  <div className="settings-dropdown-title">
                    <span>Global settings</span>
                    <svg
                      id="cross"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() =>
                        setDropdownSettingsVisible(!dropdownSettingsVisible)
                      }
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.63615 5.63603C6.02668 5.24551 6.65984 5.24551 7.05037 5.63603L18.3641 16.9497C18.7546 17.3403 18.7546 17.9734 18.3641 18.364C17.9736 18.7545 17.3404 18.7545 16.9499 18.364L5.63615 7.05024C5.24563 6.65972 5.24563 6.02656 5.63615 5.63603Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.3637 5.63603C18.7542 6.02656 18.7542 6.65972 18.3637 7.05025L7.04998 18.364C6.65946 18.7545 6.02629 18.7545 5.63577 18.364C5.24525 17.9734 5.24525 17.3403 5.63577 16.9497L16.9495 5.63603C17.34 5.24551 17.9732 5.24551 18.3637 5.63603Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="settings-dropdown-container">
                    <div
                      className="settings-dropdown-item"
                      onClick={() => setDropdownSettingsTheme(true)}
                    >
                      <div className="settings-dropdown-item-icons">
                        <svg
                          id="theme_mode"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.1029 8.24566C13.1908 8.24566 13.2468 8.18401 13.2627 8.09923C13.5105 6.81985 13.5025 6.78902 14.8931 6.53468C14.981 6.51156 15.045 6.46532 15.045 6.37283C15.045 6.27264 14.981 6.2264 14.8931 6.21098C13.5025 5.94123 13.5425 5.9104 13.2627 4.63873C13.2468 4.55395 13.1908 4.5 13.1029 4.5C13.007 4.5 12.951 4.55395 12.9351 4.63873C12.6553 5.9104 12.7033 5.94123 11.3047 6.21098C11.2168 6.2264 11.1608 6.27264 11.1608 6.37283C11.1608 6.46532 11.2168 6.51156 11.3047 6.53468C12.7033 6.80443 12.6793 6.81985 12.9351 8.09923C12.951 8.18401 13.007 8.24566 13.1029 8.24566ZM16.9231 13.4557C17.0669 13.4557 17.1708 13.3555 17.1948 13.2091C17.4505 11.1435 17.5624 11.0973 19.7283 10.7582C19.8961 10.7351 20 10.6503 20 10.4961C20 10.3497 19.8961 10.2649 19.7602 10.2341C17.5784 9.83333 17.4505 9.84875 17.1948 7.78324C17.1708 7.6368 17.0669 7.53661 16.9231 7.53661C16.7792 7.53661 16.6673 7.6368 16.6513 7.77553C16.3796 9.86416 16.2997 9.93353 14.0859 10.2341C13.95 10.2572 13.8462 10.3497 13.8462 10.4961C13.8462 10.6426 13.95 10.7351 14.0859 10.7582C16.2997 11.1667 16.3716 11.1667 16.6513 13.2245C16.6673 13.3555 16.7792 13.4557 16.9231 13.4557ZM10.9051 20.5C13.7902 20.5 16.1319 19.1127 17.2028 16.7158C17.3227 16.4383 17.3067 16.2071 17.1628 16.0607C17.043 15.9528 16.8272 15.9297 16.5794 16.0222C15.9241 16.2765 15.1648 16.3921 14.2937 16.3921C10.6813 16.3921 8.33966 14.211 8.33966 10.7813C8.33966 9.91041 8.50749 8.93931 8.77922 8.40751C8.92308 8.13006 8.91508 7.89884 8.7952 7.75241C8.65934 7.59827 8.41159 7.57514 8.09191 7.69846C5.63836 8.63873 4 11.1127 4 13.9412C4 17.6869 6.86114 20.5 10.9051 20.5Z"
                            fill="#6C86AD"
                          />
                        </svg>
                        <img src={settingsArrowRight} />
                      </div>
                      <div className="settings-dropdown-item-title">
                        <h3>Dark</h3>
                        <p>Theme for the web</p>
                      </div>
                    </div>
                    <div
                      className="settings-dropdown-item"
                      onClick={() => setDropdownSettingsLanguage(true)}
                    >
                      <div className="settings-dropdown-item-icons">
                        <img src={iconUSFlag} />
                        <img src={settingsArrowRight} />
                      </div>
                      <div className="settings-dropdown-item-title">
                        <h3>English</h3>
                        <p>Choose language</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        <div className={`burger-icon ${isOpen ? "open" : ""}`}>
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </div>
      </button>

      <div
        className={`burger-menu ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line top"></div>
        <div className="line middle"></div>
        <div className="line bottom"></div>
      </div>

      <nav className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div id="mobile-menu-item-trade" className="mobile-menu-item">
          <div
            id="trade-accordion"
            className={`accordion ${isTradeOpen ? "open" : ""}`}
            onClick={toggleTrade}
          >
            <div id="trade-item" className="accordion-title">
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
            </div>

            <div
              className={`accordion-content-trade ${isTradeOpen ? "open" : ""}`}
            >
              <div className="accordion-content-item">
                <img src={simpleModeIconDark} />
                <a
                  href="https://app.1inch.io/#/137/simple/swap/USDT/DAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Simple mode
                </a>
              </div>
              <div className="accordion-content-item">
                <img src={advancedModeIcon} />
                <a
                  href="https://app.1inch.io/#/137/advanced/swap/USDT/DAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Advanced mode
                </a>
              </div>
              <div className="accordion-content-item">
                <img src={limitOrderIcon} />
                <a
                  href="https://app.1inch.io/#/137/advanced/limit-order/USDT/DAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Limit order
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu-item">
          <span className="mobile-menu-item-dao">DAO &#128712;</span>
        </div>
        <div className="mobile-menu-item">
          <div
            id="bridges-accordion"
            className={`accordion ${isBridgesOpen ? "open" : ""}`}
            onClick={toggleBridges}
          >
            <div id="bridges-item" className="accordion-title">
              Bridges
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
            </div>
            <div className={`accordion-content ${isBridgesOpen ? "open" : ""}`}>
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
          </div>
        </div>

        <div className="mobile-menu-item">
          <span href="#portfolio">Portfolio</span>
        </div>
        <div className="mobile-menu-item">
          <span href="#buy-crypto">Buy Crypto</span>
        </div>
        <div id="card-item" className="mobile-menu-item">
          <span href="#card">Card</span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
