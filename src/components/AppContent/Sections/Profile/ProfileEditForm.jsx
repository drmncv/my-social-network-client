import React from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.css";
import Preloader from "../../../_common/Preloader";

class ProfileEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        fullName: props.profile.fullName,
        aboutMe: props.profile.aboutMe,
        contacts: props.profile.contacts,
        lookingForAJob: props.profile.lookingForAJob,
        lookingForAJobDescription: props.profile.lookingForAJobDescription,
      },
      preloader: false,
      errors: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    if (e.target.className === "contacts") {
      this.setState((state) => ({
        ...state,
        profile: {
          ...state.profile,
          contacts: {
            ...state.profile.contacts,
            [e.target.name]: e.target.value,
          },
        },
      }));
    } else {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      this.setState((state) => ({
        ...state,
        profile: { ...state.profile, [e.target.name]: value },
      }));
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ preloader: true });
    const messages = await this.props.updateProfile(this.state.profile);
    if (messages) {
      this.setState({ preloader: false, errors: messages });
    } else {
      this.props.toggleEditMode();
    }
  }

  render() {
    if (this.state.preloader) return <Preloader />;
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label>
            Full Name:&nbsp;
            <input
              name="fullName"
              value={
                this.state.profile.fullName ? this.state.profile.fullName : ""
              }
              onChange={this.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            About me:&nbsp;
            <input
              name="aboutMe"
              value={
                this.state.profile.aboutMe ? this.state.profile.aboutMe : ""
              }
              onChange={this.onChange}
            />
          </label>
        </div>
        <fieldset>
          <legend>Contacts</legend>
          <div>
            <label>
              Github:&nbsp;
              <input
                className="contacts"
                name="github"
                value={
                  this.state.profile.contacts.github
                    ? this.state.profile.contacts.github
                    : ""
                }
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              VK:&nbsp;
              <input
                className="contacts"
                name="vk"
                value={
                  this.state.profile.contacts.vk
                    ? this.state.profile.contacts.vk
                    : ""
                }
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Facebook:&nbsp;
              <input
                className="contacts"
                name="facebook"
                value={
                  this.state.profile.contacts.facebook
                    ? this.state.profile.contacts.facebook
                    : ""
                }
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Instagram:&nbsp;
              <input
                className="contacts"
                name="instagram"
                value={
                  this.state.profile.contacts.instagram
                    ? this.state.profile.contacts.instagram
                    : ""
                }
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Twitter:&nbsp;
              <input
                className="contacts"
                name="twitter"
                value={
                  this.state.profile.contacts.twitter
                    ? this.state.profile.contacts.twitter
                    : ""
                }
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Website:&nbsp;
              <input
                className="contacts"
                name="website"
                value={
                  this.state.profile.contacts.website
                    ? this.state.profile.contacts.website
                    : ""
                }
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Youtube:&nbsp;
              <input
                className="contacts"
                name="youtube"
                value={
                  this.state.profile.contacts.youtube
                    ? this.state.profile.contacts.youtube
                    : ""
                }
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              MainLink:&nbsp;
              <input
                className="contacts"
                name="mainLink"
                value={
                  this.state.profile.contacts.mainLink
                    ? this.state.profile.contacts.mainLink
                    : ""
                }
                onChange={this.onChange}
              />
            </label>
          </div>
        </fieldset>
        <div>
          <label>
            <input
              type="checkbox"
              name="lookingForAJob"
              checked={
                this.state.profile.lookingForAJob
                  ? this.state.profile.lookingForAJob
                  : ""
              }
              onChange={this.onChange}
            />
            Looking for a job
          </label>
        </div>
        <div>
          <label>
            My professional skills:&nbsp;
            <textarea
              name="lookingForAJobDescription"
              value={
                this.state.profile.lookingForAJobDescription
                  ? this.state.profile.lookingForAJobDescription
                  : ""
              }
              onChange={this.onChange}
            />
          </label>
        </div>
        {this.state.errors &&
          this.state.errors.map((error) => (
            <div className={styles.error}>{error}</div>
          ))}
        <div>
          <button className={styles.saveButton}>Save</button>
        </div>
      </form>
    );
  }
}

ProfileEditForm.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default ProfileEditForm;
