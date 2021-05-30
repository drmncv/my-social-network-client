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
        {profile.userId === authorizedUserId && (
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
        <ProfileStatus status={status} uploadStatus={uploadStatus} />
        <div className="aboutMe">
          {profile.aboutMe && <p>About me: {profile.aboutMe}</p>}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape({
    aboutMe: PropTypes.string,
    fullName: PropTypes.string,
    photos: PropTypes.object,
  }),
  status: PropTypes.string,
};

export default Profile;
