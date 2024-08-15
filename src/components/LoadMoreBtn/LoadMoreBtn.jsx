import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={css.loadMore} onClick={onClick}>
      Load more
    </button>
  );
}


