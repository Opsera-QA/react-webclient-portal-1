import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";

function TabAndViewContainer(
  {
    verticalTabContainer,
    currentView,
    defaultActiveKey,
    bodyClassName,
    tabColumnSize,
    minimumHeight,
    maximumHeight,
    overflowYBodyStyle,
    overflowXBodyStyle,
    overflowYContainerStyle,
  }) {
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

  const getContainerStylingObject = () => {
    return ({
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
      overflowY: overflowYContainerStyle,
    });
  };

  const getBodyStylingObject = () => {
    return ({
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
      overflowY: overflowYBodyStyle,
      overflowX: overflowXBodyStyle,
    });
  };

  return (
    <Tab.Container defaultActiveKey={defaultActiveKey}>
      <Row className={bodyClassName} style={getContainerStylingObject()}>
        <Col
          xs={getTabColumnSize()}
          className={"px-0 makeup-tree-container"}
        >
          <div style={getBodyStylingObject()} className={"h-100"}>
            {verticalTabContainer}
          </div>
        </Col>
        <Col
          xs={getViewColumnSize()}
          className={"px-0"}
        >
          <div style={getBodyStylingObject()}>
            {currentView}
          </div>
        </Col>
      </Row>
    </Tab.Container>
  );
}

TabAndViewContainer.propTypes = {
  verticalTabContainer: PropTypes.object,
  currentView: PropTypes.object,
  tabColumnSize: PropTypes.number,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bodyClassName: PropTypes.string,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  overflowYBodyStyle: PropTypes.string,
  overflowXBodyStyle: PropTypes.string,
  overflowYContainerStyle: PropTypes.string,
};

TabAndViewContainer.defaultProps = {
  bodyClassName: "mx-0",
};

export default TabAndViewContainer;