import styles from "./Header.module.css";
import Logo from "../../assets/logo.png";
import LoginBlockContainer from "./LoginBlockContainer";

export default () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <img className={styles.logoImg} src={Logo} alt="Logo" />
    </div>
    <LoginBlockContainer />
  </header>
);
