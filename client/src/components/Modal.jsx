import { ReactComponent as CloseIcon } from "../assets/svg/x-thin.svg";

export const Modal = ({ children, show, toggleShow }) =>
  show && (
    <div className="modal-bg">
      <div className="modal-content">
        <div className="d-flex flex-row justify-content-between mb-3">
          <h3 className="text-center">Upload</h3>
          <button
            className="btn-no-bg align-self-start modal-close-btn"
            onClick={() => toggleShow(false)}
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
