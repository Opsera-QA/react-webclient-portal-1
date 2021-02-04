import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function IconTitleBar({ title, titleIcon, isLoading, inactive }) {
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
    return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</span>);
  }

  return (
    <Row>
      <Col sm={12}>
        <div className="d-flex w-100">
          <div className="mx-auto title-icon"><FontAwesomeIcon icon={titleIcon} fixedWidth /></div>
        </div>
      </Col>
      <Col sm={12}>
        <div className="d-flex w-100">
          <div className="mx-auto title">{title}</div>
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
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool
};

export default IconTitleBar;