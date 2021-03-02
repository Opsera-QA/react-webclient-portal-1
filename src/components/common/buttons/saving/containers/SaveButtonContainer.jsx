import React  from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

function SaveButtonContainer({ children }) {
  return (
    <Row className="mx-0">
      <div className="ml-auto mt-3 d-flex">
        {children}
      </div>
    </Row>
  );
}

SaveButtonContainer.propTypes = {
  children: PropTypes.any
};

export default SaveButtonContainer;