import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {cutOffExcessCharacters} from "components/common/helpers/string-helpers";
import LoadingIcon from "components/common/icons/LoadingIcon";

function IconTitleBar({ title, icon, isLoading, inactive, characterLimit }) {
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

  if (isLoading) {
    return (<span><LoadingIcon className={"mr-1"}/>Loading Data</span>);
  }

  return (
    <Row>
      <Col sm={12}>
        <div className="d-flex w-100 mt-2 mb-4">
          <div className="mx-auto title-icon">{icon}</div>
        </div>
      </Col>
      <Col sm={12}>
        <div className="d-flex w-100 mt-2 pl-1">
          <div className="icon-card-title">{cutOffExcessCharacters(title, characterLimit)}</div>
        </div>
      </Col>
      {getStateColumn()}
    </Row>
  );
}


IconTitleBar.propTypes = {
  inactive: PropTypes.bool,
  title: PropTypes.string,
  parentBreadcrumb: PropTypes.object,
  icon: PropTypes.object,
  characterLimit: PropTypes.number,
  isLoading: PropTypes.bool
};

IconTitleBar.defaultProps = {
  characterLimit: 50
};

export default IconTitleBar;