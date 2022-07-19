import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import LoadingIcon from "src/components/common/icons/LoadingIcon.jsx";

function MetricDataBlockBaseContainer(
  {
    widthSize,
    heightSize,
    children,
    className,
  }) {
  return (
    <Col
      xs={widthSize}
      className={className}
    >
      {children}
      <div className={"d-flex"}>
        <div>
          <span></span>
        </div>
        <div className={"ml-auto"}>
          <LoadingIcon />
        </div>
      </div>
    </Col>
  );
}

MetricDataBlockBaseContainer.propTypes = {
  className: PropTypes.string,
  heightSize: PropTypes.string,
  widthSize: PropTypes.string,
  children: PropTypes.any,
};

export default MetricDataBlockBaseContainer;
