import styles from "./Navbar.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Navbar = ({ isAuth, authorizedUserId }) => {
  return (
    <nav className={styles.navbar}>
      {isAuth && (
        <div>
          <NavLink to={`/profile/${authorizedUserId}`}>My page</NavLink>
        </div>
      )}
      <div>
        <NavLink to="/users">Users</NavLink>
      </div>
      <div>
        <NavLink to="/dialogs">Dialogs</NavLink>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuth: PropTypes.bool,
  authorizedUserId: PropTypes.number,
};

export default Navbar;
