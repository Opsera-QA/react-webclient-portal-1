import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import InfoContainer from "components/common/containers/InfoContainer";

function VanitySetTabAndViewOverlayContainer(
  {
    verticalTabContainer,
    currentView,
    className,
    tabColumnSize,
    titleIcon,
    titleText,
    defaultActiveKey,
    isLoading,
    viewClassName,
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

  return (
    <InfoContainer
      isLoading={isLoading}
      titleIcon={titleIcon}
      titleText={titleText}
      className={className}
    >
    <div>
      <div className={"overlay-console-log-container"}>
        <div className={"content-container"}>
          <Tab.Container defaultActiveKey={defaultActiveKey}>
            <Row className={"makeup-container-body mx-0"}>
              <Col sm={getTabColumnSize()} className={"px-0 overlay-console-log-container-tabs"}>
                {verticalTabContainer}
              </Col>
              <Col sm={getViewColumnSize()} className={"px-0"}>
                <div className={`${viewClassName ? `${viewClassName} ` : ""}overlay-console-log-container-body`}>
                  {currentView}
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
      <div className={"object-properties-footer"}/>
    </div>
    </InfoContainer>
  );
}

VanitySetTabAndViewOverlayContainer.propTypes = {
  verticalTabContainer: PropTypes.object,
  currentView: PropTypes.object,
  className: PropTypes.string,
  tabColumnSize: PropTypes.number,
  titleText: PropTypes.string,
  titleIcon: PropTypes.object,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool,
  viewClassName: PropTypes.string,
};

export default VanitySetTabAndViewOverlayContainer;