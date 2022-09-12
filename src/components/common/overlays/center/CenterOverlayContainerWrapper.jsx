import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";

export default function CenterOverlayContainerWrapper(
  {
    children,
    size,
  }) {
  if (size === CENTER_OVERLAY_SIZES.FULL_WIDTH) {
    return (
      <Col
        xs={12}
        className={"m-auto"}
      >
        {children}
      </Col>
    );
  }

  if (size === CENTER_OVERLAY_SIZES.SMALL) {
    return (
      <Col
        xs={12} sm={12} md={12} lg={8} xl={6}
        className={"m-auto"}
      >
        {children}
      </Col>
    );
  }

  return (
    <Col
      xs={12} sm={12} md={12} lg={11} xl={10}
      className={"m-auto"}
    >
      {children}
    </Col>
  );
}

CenterOverlayContainerWrapper.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
};


