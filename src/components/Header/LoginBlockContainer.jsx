import { connect } from "react-redux";
import {
  logout,
  selectAuthorizedUserData,
  selectIsAuthorized,
} from "../../bll/auth";
import LoginBlock from "./LoginBlock";

const mapStateToProps = (state) => ({
  isAuth: selectIsAuthorized(state),
  login: selectAuthorizedUserData(state).login,
});

export default connect(mapStateToProps, { logout })(LoginBlock);
