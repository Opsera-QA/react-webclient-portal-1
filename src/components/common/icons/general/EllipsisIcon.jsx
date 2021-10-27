import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import {Overlay} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import Popover from "react-bootstrap/Popover";
import {faEllipsisHAlt} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function EllipsisIcon({ overlay, className, size, placement, maxWidth, tooltipText }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const getPopover = () => {
    return (
      <Popover
        id={`input-popover`}
        style={{ width: "1000px", maxWidth: maxWidth }}
        className={"info-overlay"}
      >
        {overlay}
      </Popover>
    );
  };

  const handleClick = (event) => {
    setShowOverlay(!showOverlay);
    setTarget(event.target);
  };

  if (overlay == null) {
    return null;
  }

  return (
    <>
      <TooltipWrapper innerText={tooltipText} >
      <span className={className} ref={ref} onClick={handleClick}>
          <IconBase
            icon={faEllipsisHAlt}
            className={"pointer"}
            iconSize={size}
            onClickFunction={handleClick}
          />
      </span>
      </TooltipWrapper>
      <Overlay
        onHide={() => setShowOverlay(false)}
        rootClose
        show={showOverlay}
        target={target}
        placement={placement}
        container={ref.current}
        containerPadding={20}
      >
        {getPopover()}
      </Overlay>
    </>
  );
}

EllipsisIcon.propTypes = {
  className: PropTypes.string,
  overlay: PropTypes.any,
  size: PropTypes.string,
  placement: PropTypes.string,
  maxWidth: PropTypes.string,
  tooltipText: PropTypes.string,
};

EllipsisIcon.defaultProps = {
  placement: "left",
  maxWidth: "1500px",
  size: "lg"
};

export default React.memo(EllipsisIcon);