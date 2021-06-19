import PropTypes from "prop-types";
import styles from "./Profile.module.css";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({
  profile,
  isProfileOwner,
  toggleEditMode,
  status,
  uploadStatus,
}) => (
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
    <div className={styles.contacts}>
      <p>Contacts:</p>
      {profile.contacts.github && <p>Github: {profile.contacts.github}</p>}
      {profile.contacts.vk && <p>VK: {profile.contacts.vk}</p>}
      {profile.contacts.facebook && (
        <p>Facebook: {profile.contacts.facebook}</p>
      )}
      {profile.contacts.instagram && (
        <p>Instagram: {profile.contacts.instagram}</p>
      )}
      {profile.contacts.twitter && <p>Twitter: {profile.contacts.twitter}</p>}
      {profile.contacts.website && <p>Website: {profile.contacts.website}</p>}
      {profile.contacts.youtube && <p>Youtube: {profile.contacts.youtube}</p>}
      {profile.contacts.mainLink && (
        <p>MainLink: {profile.contacts.mainLink}</p>
      )}
    </div>
    <div>
      <p>Looking for a job: {profile.lookingForAJob ? "Yes" : "No"}</p>
      {profile.lookingForAJobDescription && (
        <p>Professional skills: {profile.lookingForAJobDescription}</p>
      )}
    </div>
    {isProfileOwner && (
      <div>
        <button onClick={toggleEditMode}>Edit</button>
      </div>
    )}
  </div>
);

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  status: PropTypes.string,
  isProfileOwner: PropTypes.bool.isRequired,
  uploadStatus: PropTypes.func.isRequired,
};

export default ProfileInfo;
