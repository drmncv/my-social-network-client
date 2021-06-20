import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import Preloader from "../../../_common/Preloader";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preloader: false, errors: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ preloader: true });
    const formData = new FormData(e.target);
    const messages = await this.props.login(
      formData.get("email"),
      formData.get("password"),
      formData.get("rememberMe") ? true : false,
      formData.get("captcha")
    );
    this.setState({ preloader: false, errors: messages });
  }

  render() {
    if (this.props.isAuth)
      return <Redirect to={`/profile/${this.props.authorizedUserId}`} />;
    if (this.state.preloader) return <Preloader />;
    return (
      <LoginForm
        captchaUrl={this.props.captchaUrl}
        onSubmit={this.onSubmit}
        errors={this.state.errors}
      />
    );
  }
}

Login.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  authorizedUserId: PropTypes.number,
  login: PropTypes.func.isRequired,
  captchaUrl: PropTypes.string,
};
