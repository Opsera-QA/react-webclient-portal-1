import React from "react";
import PropTypes from "prop-types";
import CardGroup from "react-bootstrap/CardGroup";

function DataBoxWrapper({ children, padding=2 }) {
  return (
    <div className="w-100">
      <div className="d-none d-sm-block justify-content-center">
        <CardGroup className={`w-100 p-${padding} d-flex justify-content-center`}>
          {children}
        </CardGroup>
      </div>
    </div>
  );
}

DataBoxWrapper.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.number
};

export default DataBoxWrapper;