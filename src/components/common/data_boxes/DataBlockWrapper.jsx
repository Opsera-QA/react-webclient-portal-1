import React from "react";
import PropTypes from "prop-types";
import CardGroup from "react-bootstrap/CardGroup";

function DataBlockWrapper({ children, padding }) {
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

DataBlockWrapper.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.number
};

DataBlockWrapper.defaultProps = {
  padding: 2
};

export default DataBlockWrapper;