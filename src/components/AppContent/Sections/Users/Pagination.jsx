import PropTypes from "prop-types";
import styles from "./Pagination.module.css";
import PaginationItem from "./PaginationItem";

const Pagination = ({ count, pageSize, currentPage, getUsers }) => {
  const pagesCount = Math.ceil(count / pageSize);
  let pageArrayStart = currentPage - 2;
  let pageArrayLength = 5;

  if (pageArrayStart < 4) pageArrayStart = 1;
  else if (pageArrayStart > pagesCount - 4) pageArrayStart = pagesCount - 4;

  if ([4, pagesCount - 3].includes(currentPage)) pageArrayLength = 6;
  else if ([5, pagesCount - 4].includes(currentPage)) pageArrayLength = 7;

  const pages = [...Array(pageArrayLength).keys()].map(
    (p) => p + pageArrayStart
  );

  return (
    <div className={styles.pagination}>
      {currentPage > 5 && (
        <span>
          <PaginationItem
            pageNumber={1}
            isCurrent={false}
            getUsers={getUsers}
          />
          <span className={styles.page}>...</span>
        </span>
      )}
      {pages.map((p) => (
        <PaginationItem
          key={p}
          pageNumber={p}
          isCurrent={p === currentPage}
          getUsers={getUsers}
        />
      ))}
      {currentPage < pagesCount - 4 && (
        <span>
          <span className={styles.page}>...</span>
          <PaginationItem
            pageNumber={pagesCount}
            isCurrent={false}
            getUsers={getUsers}
          />
        </span>
      )}
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  getUsers: PropTypes.func,
};

export default Pagination;
