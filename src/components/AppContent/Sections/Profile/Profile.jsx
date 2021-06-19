import React from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.css";
import defaultPhoto from "../../../../assets/user.png";
import Avatar from "./Avatar";
import ProfileInfo from "./ProfileInfo";
import ProfileEditForm from "./ProfileEditForm";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode() {
    this.setState((state) => ({
      editMode: !state.editMode,
    }));
  }

  render() {
    const avatar = this.props.profile.photos.large
      ? this.props.profile.photos.large
      : defaultPhoto;
    const isProfileOwner =
      this.props.profile.userId === this.props.authorizedUserId;

    if (this.state.editMode)
      return (
        <ProfileEditForm
          profile={this.props.profile}
          updateProfile={this.props.updateProfile}
          toggleEditMode={this.toggleEditMode}
          key={this.props.profile.userId}
        />
      );
    return (
      <div className={styles.profile}>
        <Avatar
          avatar={avatar}
          isProfileOwner={isProfileOwner}
          uploadPhoto={this.props.uploadPhoto}
        />
        <ProfileInfo
          profile={this.props.profile}
          isProfileOwner={isProfileOwner}
          toggleEditMode={this.toggleEditMode}
          status={this.props.status}
          uploadStatus={this.props.uploadStatus}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  authorizedUserId: PropTypes.number,
  profile: PropTypes.object.isRequired,
  status: PropTypes.string,
  getProfile: PropTypes.func,
  getStatus: PropTypes.func,
  uploadStatus: PropTypes.func,
  uploadPhoto: PropTypes.func,
};

export default Profile;
