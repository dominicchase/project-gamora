import React from "react";

export const Modal = ({ children, show, toggleShow }) =>
  show && (
    <div className="custom-modal">
      <div className="custom-modal-content">
        <div className="d-flex flex-row justify-content-between mb-3">
          <h3 className="text-center">Upload</h3>
          <button
            className="align-self-start modal-close-btn"
            onClick={() => toggleShow(false)}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
