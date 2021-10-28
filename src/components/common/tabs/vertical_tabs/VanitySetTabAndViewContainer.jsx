import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import TitleBarBase from "components/common/fields/TitleBarBase";

function VanitySetTabAndViewContainer({verticalTabContainer, currentView, className, tabColumnSize, icon, title, defaultActiveKey}) {
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
    <>
      <div className={`${className} object-properties-input`}>
        <div className="content-container">
          <TitleBarBase title={title} icon={icon} />
          <Tab.Container defaultActiveKey={defaultActiveKey}>
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
      </div>
      <div className={"object-properties-footer"}/>
    </>
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
};

export default VanitySetTabAndViewContainer;