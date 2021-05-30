import styles from "./AppContent.module.css";
import { Route } from "react-router-dom";
import UsersContainer from "./Sections/Users/UsersContainer";
import Dialogs from "./Sections/Dialogs";
import LoginContainer from "./Sections/Login/LoginContainer";
import ProfileContainer from "./Sections/Profile/ProfileContainer";

export default () => (
  <div className={styles.appContent}>
    <Route path="/login" component={LoginContainer} />
    <Route path="/profile/:userId?" component={ProfileContainer} />
    <Route path="/users" exact={true} component={UsersContainer} />
    <Route path="/dialogs" exact={true} component={Dialogs} />
  </div>
);
