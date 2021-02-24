import React  from "react";
import PropTypes from "prop-types";

function TitleActionBarContainer({ children }) {
  return (
    <div className="d-flex my-auto">
      {children}
    </div>
  );
}

TitleActionBarContainer.propTypes = {
  children: PropTypes.any
};

export default TitleActionBarContainer;