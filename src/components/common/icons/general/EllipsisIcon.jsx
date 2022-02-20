import React, {useContext, useRef, useState} from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {faEllipsisHAlt} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {DialogToastContext} from "contexts/DialogToastContext";

function EllipsisIcon(
  {
    overlay,
    className,
    size,
    tooltipText,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    toastContext.showInfoOverlayPanel(overlay);
    setTarget(event.target);
  };

  if (overlay == null) {
    return null;
  }

  return (
    <TooltipWrapper innerText={tooltipText}>
      <span className={className} ref={ref} onClick={handleClick}>
        <IconBase
          icon={faEllipsisHAlt}
          className={"pointer"}
          iconSize={size}
          onClickFunction={handleClick}
        />
      </span>
    </TooltipWrapper>
  );
}

EllipsisIcon.propTypes = {
  className: PropTypes.string,
  overlay: PropTypes.any,
  size: PropTypes.string,
  tooltipText: PropTypes.string,
};

EllipsisIcon.defaultProps = {
  size: "lg"
};

export default React.memo(EllipsisIcon);