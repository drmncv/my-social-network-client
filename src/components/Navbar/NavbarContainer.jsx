import { connect } from "react-redux";
import { selectAuthorizedUserData, selectIsAuthorized } from "../../bll/auth";
import Navbar from "./Navbar";

const mapStateToProps = (state) => ({
  isAuth: selectIsAuthorized(state),
  authorizedUserId: selectAuthorizedUserData(state).id,
});

export default connect(mapStateToProps)(Navbar);
