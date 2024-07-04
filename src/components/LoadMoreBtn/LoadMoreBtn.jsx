import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={css.loadMore} onClick={onClick}>
      Load more
    </button>
  );
}


{/* <button onClick={() => setPage((prevPage) => prevPage + 1)}>Load more</button>; */}