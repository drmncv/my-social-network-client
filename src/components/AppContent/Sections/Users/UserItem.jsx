import PropTypes from "prop-types";
import styles from "./UserItem.module.css";
import defaultPhoto from "../../../../assets/user.png";
import { NavLink } from "react-router-dom";

const UserItem = ({ id, name, photos, status, followed, toggleFollowed }) => {
  const userPhoto = photos.small ? photos.small : defaultPhoto;

  return (
    <div className={styles.userItem}>
      <div>
        <NavLink to={`/profile/${id}`}>
          <img className={styles.avatar} src={userPhoto} alt="user photo" />
        </NavLink>
      </div>
      <div className={styles.info}>
        <div>{name}</div>
        <div>{status}</div>
        <div>
          <button onClick={() => toggleFollowed(id, !followed)}>
            {followed ? "unfollow" : "follow"}
          </button>
        </div>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  name: PropTypes.string.isRequired,
  photos: PropTypes.shape({
    small: PropTypes.string,
    large: PropTypes.string,
  }),
  status: PropTypes.string,
  followed: PropTypes.bool.isRequired,
  toggleFollowed: PropTypes.func.isRequired,
};

export default UserItem;
