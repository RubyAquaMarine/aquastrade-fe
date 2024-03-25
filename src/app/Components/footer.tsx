"use client";
import Link from "next/link";
import styles from "../Styles/Footer.module.css"; // You can create a CSS module for styling
import styles_list from "../Styles/List.module.css"; // You can create a CSS module for styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <h3>Socials</h3>

        <ul>
          <li className={styles_list.navItem}>
            <Link href="https://discord.gg/TPVpcUgt3k" target="_blank">
              Discord
            </Link>
          </li>

          <li className={styles_list.navItem}>
            <Link href="https://github.com/rubyaquamarine" target="_blank">
              Github
            </Link>
          </li>
          <li className={styles_list.navItem}>
            <Link href="https://x.com/aquastrade" target="_blank">
              X (formerly twitter)
            </Link>
          </li>
          {/* Add more links */}
        </ul>
      </div>

      <div className={styles.column}>
        <h3>Resources</h3>
        <ul>
          <li className={styles_list.navItem}>
            <Link href="https://www.sfuelstation.com/" target="_blank">
              Free Gas (sFuel)
            </Link>
          </li>

          <li className={styles_list.navItem}>
            <Link
              href="https://github.com/RubyAquaMarine/aquastrade-sdk"
              target="_blank"
            >
              SDK
            </Link>
          </li>

          <li className={styles_list.navItem}>
            <Link
              href="https://github.com/RubyAquaMarine/web3-bot"
              target="_blank"
            >
              Web3 Bot
            </Link>
          </li>
          <li className={styles_list.navItem}>
            <Link
              href="https://github.com/RubyAquaMarine/razor-oracle-skale"
              target="_blank"
            >
              Razor Oracle
            </Link>
          </li>
          {/* Add more links */}
        </ul>
      </div>

      <div className={styles.column}>
        <h3></h3>
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
