import PropTypes from "prop-types";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const LoginBlock = (props) => {
  return (
    <div className={styles.loginBlock}>
      {props.isAuth ? (
        <div>
          {props.login}
          <button className={styles.btn} onClick={props.logout}>
            Logout
          </button>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
};

LoginBlock.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  login: PropTypes.string,
  logout: PropTypes.func,
};

export default LoginBlock;
