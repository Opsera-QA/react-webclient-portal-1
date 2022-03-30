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
    bodyClassName, // TODO: Remove and instead make different sized containers that use this as a base
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
      titleText={title}
      titleIcon={icon}
      className={className}
    >
      <Tab.Container defaultActiveKey={defaultActiveKey}>
        <Row className={bodyClassName}>
          <Col sm={getTabColumnSize()} className={"px-0"}>
            {verticalTabContainer}
          </Col>
          <Col sm={getViewColumnSize()} className={"px-0"}>
            {currentView}
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
};

VanitySetTabAndViewContainer.defaultProps = {
  bodyClassName: "makeup-container-body mx-0",
};

export default VanitySetTabAndViewContainer;