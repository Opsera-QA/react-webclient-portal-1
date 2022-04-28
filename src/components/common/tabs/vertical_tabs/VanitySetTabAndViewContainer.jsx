import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import InfoContainer from "components/common/containers/InfoContainer";

function VanitySetTabAndViewContainer(
  {
    verticalTabContainer,
    currentView,
    className,
    tabColumnSize,
    icon,
    title,
    defaultActiveKey,
    bodyClassName,
    minimumHeight,
    maximumHeight,
    isLoading,
    titleRightSideButton,
    loadDataFunction,
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
    <InfoContainer
      titleText={title}
      titleIcon={icon}
      className={className}
      isLoading={isLoading}
      loadDataFunction={loadDataFunction}
      titleRightSideButton={titleRightSideButton}
    >
      <Tab.Container defaultActiveKey={defaultActiveKey}>
        <Row className={bodyClassName} style={getContainerStylingObject()}>
          <Col
            xs={getTabColumnSize()}
            className={"px-0 h-100 makeup-tree-container"}
          >
            <div style={getBodyStylingObject()}>
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
      <div className={"object-properties-footer"}/>
    </InfoContainer>
  );
}

VanitySetTabAndViewContainer.propTypes = {
  verticalTabContainer: PropTypes.object,
  currentView: PropTypes.object,
  className: PropTypes.string,
  tabColumnSize: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.object,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bodyClassName: PropTypes.string,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  isLoading: PropTypes.bool,
  titleRightSideButton: PropTypes.object,
  loadDataFunction: PropTypes.func,
  overflowYBodyStyle: PropTypes.string,
  overflowXBodyStyle: PropTypes.string,
  overflowYContainerStyle: PropTypes.string,
};

VanitySetTabAndViewContainer.defaultProps = {
  bodyClassName: "mx-0",
  minimumHeight: "calc(100vh - 264px)",
  maximumHeight: "calc(100vh - 264px)",
  overflowYBodyStyle: "auto",
  overflowYContainerStyle: "hidden",
};

export default VanitySetTabAndViewContainer;