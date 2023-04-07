import React  from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

function SaveButtonContainer({ children, extraButtons }) {
  return (
    <Row className={"mx-0 mt-3 d-flex"}>
      {extraButtons}
      <div className={"ml-auto d-flex"}>
        {children}
      </div>
    </Row>
  );
}

SaveButtonContainer.propTypes = {
  extraButtons: PropTypes.any,
  children: PropTypes.any
};

export default React.memo(SaveButtonContainer);