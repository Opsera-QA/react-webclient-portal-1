import React from "react";
import PropTypes from "prop-types";
import {faEllipsisH} from "@fortawesome/pro-light-svg-icons";
import {OverlayTrigger} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function EllipsisIcon({ overlay, className, size, placement }) {
  if (overlay == null) {
    return null;
  }

  return (
    <OverlayTrigger trigger={"click"} rootClose placement={placement} overlay={overlay}>
      <span className={className}>
        <IconBase
          icon={faEllipsisH}
          className={"pointer"}
          iconSize={size}
          onClick={() => document.body.click()}
        />
      </span>
    </OverlayTrigger>
  );
}

EllipsisIcon.propTypes = {
  className: PropTypes.string,
  overlay: PropTypes.any,
  size: PropTypes.string,
  placement: PropTypes.string
};

EllipsisIcon.defaultProps = {
  size: "2x",
  placement: "left"
};

export default React.memo(EllipsisIcon);