import PropTypes from "prop-types";
import styles from "./Profile.module.css";

const Avatar = ({ avatar, isProfileOwner, uploadPhoto }) => (
  <div className="avatar">
    <div>
      <img className={styles.avatarImg} src={avatar} alt="avatar" />
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
);

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  isProfileOwner: PropTypes.bool.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
};

export default Avatar;
