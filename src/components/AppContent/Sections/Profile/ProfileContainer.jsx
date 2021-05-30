import React from "react";
import { connect } from "react-redux";
import {
  getProfile,
  getStatus,
  uploadStatus,
  uploadPhoto,
  selectProfileInfo,
  selectStatus,
} from "../../../../bll/profile";
import Profile from "./Profile";
import Preloader from "../../../_common/Preloader";
import { compose } from "redux";
import { withRouter } from "react-router";
import { selectAuthorizedUserData } from "../../../../bll/auth";

class ProfileContainer extends React.Component {
  componentDidMount() {
    this.updateProfile();
  }
  componentDidUpdate() {
    this.updateProfile();
  }

  updateProfile() {
    const userId = this.props.match.params.userId;
    const profileUserId = this.props.profile ? this.props.profile.userId : null;

    if (userId != profileUserId) {
      this.props.getProfile(userId);
      this.props.getStatus(userId);
    }
  }

  render() {
    if (
      !this.props.profile ||
      this.props.profile.userId != this.props.match.params.userId
    )
      return <Preloader />;
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  authorizedUserId: selectAuthorizedUserData(state).id,
  profile: selectProfileInfo(state),
  status: selectStatus(state),
});

export default compose(
  connect(mapStateToProps, {
    getProfile,
    getStatus,
    uploadStatus,
    uploadPhoto,
  }),
  withRouter
)(ProfileContainer);
