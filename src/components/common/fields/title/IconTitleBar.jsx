import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { cutOffExcessCharacters, hasStringValue } from "components/common/helpers/string-helpers";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";

export default function IconTitleBar(
  {
    title,
    subTitle,
    icon,
    iconColor,
    iconSize,
    isLoading,
    inactive,
    characterLimit,
    className,
  }) {
  const getStateColumn = () => {
    if (inactive != null) {
      return (
        <Col sm={12}>
          <div className="d-flex w-100">
            <div className="mx-auto">{inactive ? "Inactive" : "Active"}</div>
          </div>
        </Col>
      );
    }
  };

  const getSubtitle = () => {
    if (hasStringValue(subTitle) === true) {
      return (
        <div className={"small mt-2"}>
          {subTitle}
        </div>
      );
    }
  };

  if (isLoading) {
    return (<span><LoadingIcon className={"mr-1"}/>Loading Data</span>);
  }

  return (
    <Row className={className}>
      <Col sm={12}>
        <div className="d-flex w-100">
          <div className="mx-auto title-icon">
            <div className={"d-flex w-100 h-100 mt-2 mb-4"}>
              <div className={"my-auto"}>
                <IconBase
                  icon={icon}
                  iconSize={iconSize}
                  iconColor={iconColor}
                />
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col sm={12}>
        <div className="d-flex w-100 mt-3">
          <div className="icon-card-title">
            {cutOffExcessCharacters(title, characterLimit)}
            {getSubtitle()}
          </div>
        </div>
      </Col>
      {getStateColumn()}
    </Row>
  );
}


IconTitleBar.propTypes = {
  className: PropTypes.string,
  inactive: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.object,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
  characterLimit: PropTypes.number,
  isLoading: PropTypes.bool
};

IconTitleBar.defaultProps = {
  characterLimit: 50,
  iconSize: "3x",
};