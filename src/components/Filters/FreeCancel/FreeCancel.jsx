import "./FreeCancel.css";
import { useFilter } from "../../../context";
export const FreeCancel = () => {
  const { filterDispatch, isCancellable } = useFilter();

  const handleCancelChange = (event) => {
    filterDispatch({
      type: "CANCELLABLE",
      payload: event.target.checked,
    });
  };

  return (
    <div className="filter-container">
      <div className="d-flex align-center gap-larger">
        <span className="filter-label">Free Cancelation</span>
        <label className="slide">
          <input
            type="checkbox"
            onChange={handleCancelChange}
            value={isCancellable}
            checked={isCancellable}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};
