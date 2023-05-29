import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Toaster({toasts}) {
  const [currentToasts, setCurrentToasts] = useState(toasts);

  useEffect(() => {
    setCurrentToasts(toasts);
  }, [toasts]);

  if (currentToasts == null || currentToasts.length === 0) {
    return null;
  }

  return (
    <div
      aria-live={"polite"}
      aria-atomic={"true"}
      className={"toast-wrapper"}
    >
      <div className={"toast-container"}>
        {currentToasts.map((toast, index) => {
          return (
            <div key={index} className={index > 0 ? "mt-1" : ""}>
              {toast.toast}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Toaster.propTypes = {
  toasts: PropTypes.array,
};

export default Toaster;