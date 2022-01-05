import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataBlockInfoOverlayIcon from "components/common/icons/metric/info/DataBlockInfoOverlayIcon";

function TwoLineDataBlockBase(
  {
    title,
    subtitle,
    className,
    icon,
    dataPoint,
  }) {
  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div>
          <IconBase icon={icon}  />
        </div>
      );
    }
  };

  const getInfoOverlayIcon = () => {
    return (
      <DataBlockInfoOverlayIcon
        dataPoint={dataPoint}
      />
    );
  };

  const getTitle = () => {
    if (title) {
      return (
        <div className={"font-inter-light-400 metric-block-content-text dark-gray-text-primary"}>
          {title}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (subtitle) {
      return (
        <div className={"font-inter-light-400 light-gray-text-secondary metric-block-footer-text"}>
          {subtitle}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <Row className={"w-100 h-100 text-center mx-auto"}>
        <Col xs={12} className={"d-flex justify-content-between"}>
          <div className={"data-block-icon"}>{getLeftDataBlockIcon()}</div>
          <div>{getTitle()}</div>
          <div className={"data-block-icon"}>{getInfoOverlayIcon()}</div>
        </Col>
        <Col xs={12} className="text-center">
          {getSubtitle()}
        </Col>
      </Row>
    </div>
  );
}

TwoLineDataBlockBase.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  dataPoint: PropTypes.object,
};

export default TwoLineDataBlockBase;