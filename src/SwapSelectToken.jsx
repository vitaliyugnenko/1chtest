import { useState, useEffect } from "react";
import maticIcon from "./assets/matic.svg";
import wethIcon from "./assets/weth.webp";
import daiIcon from "./assets/dai.webp";
import usdcIcon from "./assets/usdc.webp";
import usdtIcon from "./assets/usdt.webp";
import wbtcIcon from "./assets/wbtc.webp";
import deIcon from "./assets/de.webp";
import pinIcon from "./assets/pin.svg";

import backIcon from "./assets/back.png";

function SwapSelectToken({ SwapSelect }) {
  console.log(SwapSelect);
  const setSwapSelect = () => {
    SwapSelect(false);
  };

  return (
    <div className="page-content">
      <div className="swap-container-select">
        <div className="swap-form-header">
          <div className="swap-form-header-icon" onClick={setSwapSelect}>
            <img src={backIcon} />
          </div>
          <div className="swap-form-header-title">Select a token</div>
        </div>
        <div className="widget-input">
          <svg
            id="search"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C12.775 18.9996 14.4988 18.4054 15.897 17.312L19.586 21.001C19.9765 21.3915 20.6095 21.3915 21 21.001C21.3905 20.6105 21.3905 19.9775 21 19.587L17.311 15.898C18.405 14.4997 18.9996 12.7754 19 11C19 6.589 15.411 3 11 3C6.589 3 3 6.589 3 11C3 15.411 6.589 19 11 19ZM11 5C14.309 5 17 7.691 17 11C17 14.309 14.309 17 11 17C7.691 17 5 14.309 5 11C5 7.691 7.691 5 11 5Z"
              fill="currentColor"
            ></path>
          </svg>
          <input
            type="text"
            placeholder="Search by name or paste address"
            autoComplete="off"
          />
        </div>

        <div className="favourite-tokens-container">
          <a href="">
            <img src={maticIcon} />
            <span>Matic</span>
          </a>
          <a href="">
            <img src={wethIcon} />
            <span>WETH</span>
          </a>
          <a href="">
            <img src={daiIcon} />
            <span>DAI</span>
          </a>
          <a href="">
            <img src={usdcIcon} />
            <span>USDC</span>
          </a>

          <a href="">
            <img src={usdtIcon} />
            <span>USDT</span>
          </a>
          <a href="">
            <img src={wbtcIcon} />
            <span>WBTC</span>
          </a>
          <a href="">
            <img src={deIcon} />
            <span>DE</span>
          </a>
        </div>

        <div className="tokens-list-wrapper">
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
          <div className="tokens-list-wrapper-item">
            <div className="tokens-list-wrapper-item-icon">
              <img src={usdtIcon} />
            </div>
            <div className="tokens-list-wrapper-item-name">
              <div className="tokens-list-wrapper-item-name-amount">
                <div>Tether USD</div>
                <div>0 USDT</div>
              </div>
              <div className="tokens-list-wrapper-item-name-amount-usd">$0</div>
            </div>
            <div className="tokens-list-wrapper-item-pin">
              <img src={pinIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapSelectToken;
