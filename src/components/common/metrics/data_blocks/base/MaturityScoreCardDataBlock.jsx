import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

function MaturityScoreCardDataBlock({
  maturityScore,
  text,
  className,
  icon,
  iconOverlayTitle,
  iconOverlayBody,
  maturityColor,
  onClick,
}) {
  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div className={"maturity-info-icon"}>
          <OverlayIconBase
            icon={icon}
            overlayTitle={iconOverlayTitle}
            overlayBody={iconOverlayBody}
          />
        </div>
      );
    }
  };

  return (
    <Row
      className={`${className} ml-3 p-2 d-flex maturity-top-border ${maturityColor}`}
    >
      {getLeftDataBlockIcon()}
      <div
        onClick={onClick}
        className={
          "pointer d-flex pr-1 dark-gray-text-primary maturity-card-block-content-text font-inter-light-500"
        }
      >
        {text}
        {maturityScore}
      </div>
    </Row>
  );
}

MaturityScoreCardDataBlock.propTypes = {
  maturityScore: PropTypes.any,
  maturityColor: PropTypes.string,
  text: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  dataPoint: PropTypes.object,
  iconOverlayTitle: PropTypes.string,
  iconOverlayBody: PropTypes.any,
  onClick: PropTypes.func,
};

MaturityScoreCardDataBlock.defaultProps = {
  text: "Maturity Score: ",
};
export default MaturityScoreCardDataBlock;
