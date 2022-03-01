import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";

function FontAwesomeIconTitleBar({ title, titleIcon, isLoading, inactive }) {
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
        <div className="d-flex w-100">
          <div className="mx-auto"><IconBase icon={titleIcon} className={"mr-1"}/></div>
        </div>
      </Col>
      <Col sm={12}>
        <div className="d-flex w-100">
          <div className="mx-auto">{title}</div>
        </div>
      </Col>
      {getStateColumn()}
    </Row>
  );
}


FontAwesomeIconTitleBar.propTypes = {
  inactive: PropTypes.bool,
  title: PropTypes.string,
  parentBreadcrumb: PropTypes.object,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool
};

export default FontAwesomeIconTitleBar;