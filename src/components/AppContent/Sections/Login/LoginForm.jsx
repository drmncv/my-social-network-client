import PropTypes from "prop-types";
import styles from "./Login.module.css";

const LoginForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      <label>
        Email:&nbsp;
        <input name="email" />
      </label>
    </div>
    <div>
      <label>
        Password:&nbsp;
        <input type="password" name="password" />
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" name="rememberMe" />
        Remember me
      </label>
    </div>
    <div className={styles.error}>{props.error}</div>
    <div>
      <button className={styles.submit}>Login</button>
    </div>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default LoginForm;
