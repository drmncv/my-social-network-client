import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import "./App.css";
import AppContent from "./components/AppContent/AppContent";
import Header from "./components/Header/Header";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Preloader from "./components/_common/Preloader";
import { initializeApp } from "./bll/app";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) return <Preloader />;

    return (
      <div className="App">
        <Route exact path="/">
          {!this.props.isAuth && <Redirect to="/login" />}
        </Route>
        <Header />
        <NavbarContainer />
        <AppContent />
      </div>
    );
  }
}

App.propTypes = {
  initialized: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  initializeApp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuthorized,
});

export default connect(mapStateToProps, { initializeApp })(App);
