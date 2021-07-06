import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TabTreeAndViewContainer({tabTree, currentView, className, tabTreeClassName, currentViewClassName}) {
  return (
    <Row className={className}>
      <Col lg={2} sm={3} className={tabTreeClassName}>
        {tabTree}
      </Col>
      <Col lg={10} sm={9} className={currentViewClassName}>
        {currentView}
      </Col>
    </Row>
  );
}

TabTreeAndViewContainer.propTypes = {
  tabTree: PropTypes.object,
  currentView: PropTypes.object,
  tabTreeClassName: PropTypes.string,
  currentViewClassName: PropTypes.string,
  className: PropTypes.string,
};

TabTreeAndViewContainer.defaultProps = {
  className: "d-flex"
};

export default TabTreeAndViewContainer;