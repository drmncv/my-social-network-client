import PropTypes from "prop-types";
import styles from "./Login.module.css";

const LoginForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      <label>
        Email:&nbsp;
        <input type="email" name="email" />
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
    {props.captchaUrl && (
      <div>
        <img src={props.captchaUrl} alt="captcha" />
        <label>
          Captcha:&nbsp;
          <input name="captcha" />
        </label>
      </div>
    )}
    {props.errors &&
      props.errors.map((error, index) => (
        <div className={styles.error} key={index}>
          {error}
        </div>
      ))}
    <div>
      <button className={styles.submit}>Login</button>
    </div>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  captchaUrl: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default LoginForm;
