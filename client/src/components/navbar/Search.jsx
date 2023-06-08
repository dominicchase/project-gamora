import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/reducers/GameReducer";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";

export const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.gameState);

  return (
    <div className="search d-none d-lg-flex">
      <SearchIcon className="search-logo" width={30} height={30} />

      <input
        className="search-field"
        value={search}
        onChange={(event) => dispatch(setSearch(event.target.value))}
        placeholder="Search..."
        type="text"
      />
    </div>
  );
};
