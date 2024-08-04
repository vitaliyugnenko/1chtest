function Footer() {
  return (
    <div className="footer">
      <span className="footer-copyright">© 2024 1inch</span>
      <div className="footer-ui-mirrors">
        <span>UI mirrors:</span>
        <a
          className="ui-mirrors-link"
          href="https://bafybeiazhklkgaxhznjvcioy3wcngkhl2t4t6etsxhmtr3qducbwewgjde.ipfs.dweb.link/"
        >
          IPFS
          <svg
            id="arrow-link"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.48301 4.11585C3.48301 3.76607 3.76656 3.48252 4.11634 3.48252H4.4998C4.8864 3.48252 5.1998 3.16912 5.1998 2.78252C5.1998 2.39592 4.8864 2.08252 4.4998 2.08252H4.11634C2.99336 2.08252 2.08301 2.99287 2.08301 4.11585V11.884C2.08301 13.0069 2.99336 13.9173 4.11634 13.9173H11.8845C13.0074 13.9173 13.9178 13.0069 13.9178 11.884V11.5C13.9178 11.1134 13.6044 10.8 13.2178 10.8C12.8312 10.8 12.5178 11.1134 12.5178 11.5V11.884C12.5178 12.2337 12.2342 12.5173 11.8845 12.5173H4.11634C3.76656 12.5173 3.48301 12.2337 3.48301 11.884V4.11585ZM7.30022 2.78252C7.30022 2.39592 7.61362 2.08252 8.00022 2.08252H13.2176C13.6042 2.08252 13.9176 2.39592 13.9176 2.78252V7.99991C13.9176 8.38651 13.6042 8.69991 13.2176 8.69991C12.831 8.69991 12.5176 8.38651 12.5176 7.99991V4.47233L7.00433 9.98561C6.73096 10.259 6.28774 10.259 6.01438 9.98561C5.74101 9.71225 5.74101 9.26903 6.01438 8.99566L11.5275 3.48252H8.00022C7.61362 3.48252 7.30022 3.16912 7.30022 2.78252Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>

        <div className="block-number">
          <a
            target="_blank"
            className="block-number-link"
            href="https://polygonscan.com/block/59773646"
          >
            59773646
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
