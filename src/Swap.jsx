import { useState, useEffect } from "react";

import SwapSelectToken from "./SwapSelectToken";
import restartIcon from "./assets/restart.png";
import addIcon from "./assets/add.png";
import settingsicon from "./assets/settings.png";
import gasLess from "./assets/gasless-night_2-1.webp";

function Swap() {
  const [swapFromExpand, setSwapFromExpand] = useState(false);
  const [swapSelectToken, setSwapSelectToken] = useState(false);

  return (
    <div className="page-content">
      <div className="swap-container">
        {!swapSelectToken && (
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
            <div
              className="source-token-input"
              onClick={() => setSwapSelectToken(true)}
            >
              <div className="source-title">
                <span>You pay</span>
              </div>
              <div className="selected-token">
                <div className="select-source-token">
                  <img
                    className="selected-token-icon"
                    src="https://tokens.1inch.io/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png"
                    alt=""
                  />
                  <span className="selected-token-symbol">WMATIC</span>
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
                <div className="source-token-amount">1</div>
              </div>
              <div className="token-info">
                <span className="token-name">Wrapped Matic</span>
                <div className="token-amount">~$0.535032</div>
              </div>
            </div>
            <div className="swap-separator">
              <div className="swap-reverse">
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
            <div
              className="destination-token-input"
              onClick={() => setSwapSelectToken(true)}
            >
              <div className="destination-title">
                <span>You pay</span>
              </div>
              <div className="selected-token">
                <div className="select-destination-token">
                  <img
                    className="selected-token-icon"
                    src="https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png"
                    alt=""
                  />
                  <span className="selected-token-symbol">DAI</span>
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
                <div className="destination-token-amount">0.515583</div>
              </div>
              <div className="token-info">
                <span className="token-name">(PoS) Dai Stablecoin</span>
                <div className="token-amount">~$0.516131 (-3.3%)</div>
              </div>
            </div>
            <div className="swap-from">
              <button onClick={() => setSwapFromExpand(!swapFromExpand)}>
                <div className="swap-from-button-title">
                  <span className="from-token-amount">1 WMATIC</span>
                  <span className="from-token-equal">=</span>
                  <p className="from-token-rate">0.483403</p>
                  <span className="from-token-name">DAI</span>
                  <span className="usd-value">(~$0.48)</span>
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
                      <span className="slp-tlr">3.3%</span>
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
                      <span className="min-receive-val">0.47709077</span>
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
              <button className="swap-button">
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
        {swapSelectToken && <SwapSelectToken SwapSelect={setSwapSelectToken} />}
      </div>
    </div>
  );
}

export default Swap;
