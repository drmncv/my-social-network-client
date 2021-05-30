import { connect } from "react-redux";
import {
  login,
  selectAuthorizedUserData,
  selectIsAuthorized,
} from "../../../../bll/auth";
import Login from "./Login";

const mapStateToProps = (state) => ({
  isAuth: selectIsAuthorized(state),
  authorizedUserId: selectAuthorizedUserData(state).id,
});

export default connect(mapStateToProps, { login })(Login);
