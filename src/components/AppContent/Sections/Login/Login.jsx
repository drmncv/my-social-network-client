import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import Preloader from "../../../_common/Preloader";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preloader: false, error: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ preloader: true });
    const formData = new FormData(e.target);
    const errorMessage = await this.props.login(
      formData.get("email"),
      formData.get("password"),
      formData.get("rememberMe") ? true : false
    );
    this.setState({ error: errorMessage, preloader: false });
  }

  render() {
    if (this.props.isAuth)
      return <Redirect to={`/profile/${this.props.authorizedUserId}`} />;
    if (this.state.preloader) return <Preloader />;
    return <LoginForm onSubmit={this.onSubmit} error={this.state.error} />;
  }
}

Login.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};
