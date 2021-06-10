import React from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.css";
import defaultPhoto from "../../../../assets/user.png";
import ProfileStatus from "./ProfileStatus";

const Profile = ({
  authorizedUserId,
  profile,
  status,
  uploadStatus,
  uploadPhoto,
}) => {
  const avatar = profile.photos.large ? profile.photos.large : defaultPhoto;
  const isProfileOwner = profile.userId === authorizedUserId;

  return (
    <div className={styles.profile}>
      <div className="avatar">
        <div>
          <img
            className={styles.avatarImg}
            src={avatar}
            alt={profile.fullName}
          />
        </div>
        {isProfileOwner && (
          <div>
            <input
              type="file"
              onChange={(e) => {
                uploadPhoto(e.target.files[0]);
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.fullName}>
          <h2>{profile.fullName}</h2>
        </div>
        <ProfileStatus
          isProfileOwner={isProfileOwner}
          status={status}
          uploadStatus={uploadStatus}
        />
        <div className="aboutMe">
          {profile.aboutMe && <p>About me: {profile.aboutMe}</p>}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  authorizedUserId: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    aboutMe: PropTypes.string,
    fullName: PropTypes.string,
    photos: PropTypes.object,
  }).isRequired,
  status: PropTypes.string,
  getProfile: PropTypes.func,
  getStatus: PropTypes.func,
  uploadStatus: PropTypes.func,
  uploadPhoto: PropTypes.func,
};

export default Profile;
