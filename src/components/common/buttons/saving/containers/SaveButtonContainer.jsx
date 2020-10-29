import React  from "react";
import PropTypes from "prop-types";

function SaveButtonContainer({ children }) {
  return (
    <div className="ml-auto mt-3 px-3 d-flex">
      {children}
    </div>
  );
}

SaveButtonContainer.propTypes = {
  children: PropTypes.any
};

export default SaveButtonContainer;