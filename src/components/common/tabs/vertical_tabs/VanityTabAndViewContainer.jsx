import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";

// TODO: We should be able to pass in sizes of the two components
function VanityTabAndViewContainer({verticalTabContainer, currentView, className, tabColumnSize}) {
  const getTabColumnSize = () => {
    if (typeof tabColumnSize === "number" && tabColumnSize >= 1 && tabColumnSize <= 11) {
      return tabColumnSize;
    }

    return 2;
  };

  const getViewColumnSize = () => {
    if (typeof tabColumnSize === "number" && tabColumnSize >= 1 && tabColumnSize <= 11) {
      return 12 - tabColumnSize;
    }

    return 10;
  };

  return (
    <div className={className}>
      <Tab.Container>
        <Row className={"makeup-container-body mx-0"}>
          <Col sm={getTabColumnSize()} className={"px-0"}>
            {verticalTabContainer}
          </Col>
          <Col sm={getViewColumnSize()} className={"px-0"}>
            {currentView}
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

VanityTabAndViewContainer.propTypes = {
  verticalTabContainer: PropTypes.object,
  currentView: PropTypes.object,
  className: PropTypes.string,
  tabColumnSize: PropTypes.number,
};

export default VanityTabAndViewContainer;