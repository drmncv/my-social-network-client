import { connect } from "react-redux";
import {
  login,
  selectAuthorizedUserData,
  selectIsAuthorized,
  selectCaptchaUrl,
} from "../../../../bll/auth";
import Login from "./Login";

const mapStateToProps = (state) => ({
  isAuth: selectIsAuthorized(state),
  authorizedUserId: selectAuthorizedUserData(state).id,
  captchaUrl: selectCaptchaUrl(state),
});

export default connect(mapStateToProps, { login })(Login);
