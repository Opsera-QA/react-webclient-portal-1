import React from "react";
import PropTypes from "prop-types";
import CardDeck from "react-bootstrap/CardDeck";

function DataBlockWrapper({ children, padding }) {
  return (
    <div className="w-100">
      <div className="d-none d-sm-block justify-content-center">
        <CardDeck className={`w-100 p-${padding} d-flex justify-content-center`}>{children}</CardDeck>
      </div>
    </div>
  );
}

DataBlockWrapper.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.number,
};

DataBlockWrapper.defaultProps = {
  padding: 2,
};

export default DataBlockWrapper;
