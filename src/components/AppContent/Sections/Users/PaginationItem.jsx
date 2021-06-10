import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

const PaginationItem = ({ pageNumber, isCurrent, getUsers }) => (
  <button
    className={`${styles.page} ${isCurrent && styles.currentPage}`}
    onClick={() => getUsers(pageNumber)}
  >
    {pageNumber}
  </button>
);

PaginationItem.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  getUsers: PropTypes.func.isRequired,
};

export default PaginationItem;
