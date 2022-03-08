import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataPointInfoOverlayIcon from "components/common/icons/metric/info/DataPointInfoOverlayIcon";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";

function ThreeLineDataBlockBase(
  {
    middleText,
    bottomText,
    topText,
    className,
    icon,
    dataPoint,
    iconOverlayTitle,
    iconOverlayBody,
  }) {
  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div>
          <OverlayIconBase
            icon={icon}
            overlayTitle={iconOverlayTitle}
            overlayBody={iconOverlayBody}
          />
        </div>
      );
    }
  };

  const getInfoOverlayIcon = () => {
    return (
      <DataPointInfoOverlayIcon
        dataPoint={dataPoint}
      />
    );
  };


  const getTopText = () => {
    if (topText) {
      return (
        <div className={"dark-gray-text-primary font-inter-light-400 metric-block-header-text"}>
          {topText}
        </div>
      );
    }
  };


  const getMiddleText = () => {
    if (middleText) {
      return (
        <div className={"dark-gray-text-primary font-inter-light-500"}>
          {middleText}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (bottomText) {
      return (
        <div className={"light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>
          {bottomText}
        </div>
      );
    }
  };

  if (dataPointHelpers.isDataPointVisible(dataPoint) === false) {
    return null;
  }

  return (
    <div className={className}>
      <Row className={"w-100 h-100 mx-auto text-center"}>
        <Col xs={12} className={"d-flex justify-content-between"}>
          <div className={"data-block-icon"}>{getLeftDataBlockIcon()}</div>
          <div>{getTopText()}</div>
          <div className={"data-block-icon"}>{getInfoOverlayIcon()}</div>
        </Col>
        <Col xs={12} className={"my-auto text-center"}>
          {getMiddleText()}
        </Col>
        <Col xs={12} className={"mt-auto text-center"}>
          {getSubtitle()}
        </Col>
      </Row>
    </div>
  );
}

ThreeLineDataBlockBase.propTypes = {
  topText: PropTypes.any,
  middleText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  dataPoint: PropTypes.object,
  iconOverlayTitle: PropTypes.string,
  iconOverlayBody: PropTypes.any,
};

export default ThreeLineDataBlockBase;