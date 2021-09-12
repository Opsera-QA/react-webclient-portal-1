import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TitleBarBase from "components/common/fields/TitleBarBase";

function VanitySetTreeAndViewContainer({treeContainer, currentView, className, treeColumnSize, icon, title}) {
  const getTreeColumnSize = () => {
    if (typeof treeColumnSize === "number" && treeColumnSize >= 1 && treeColumnSize <= 11) {
      return treeColumnSize;
    }

    return 2;
  };

  const getViewColumnSize = () => {
    if (typeof treeColumnSize === "number" && treeColumnSize >= 1 && treeColumnSize <= 11) {
      return 12 - treeColumnSize;
    }

    return 10;
  };

  return (
    <div className={className}>
      <div className="object-properties-input">
        <div className="content-container">
          <TitleBarBase title={title} icon={icon}/>
          <Row className={"makeup-container-body mx-0"}>
            <Col sm={getTreeColumnSize()} className={"px-0 h-100"}>
              {treeContainer}
            </Col>
            <Col sm={getViewColumnSize()} className={"px-0"}>
              {currentView}
            </Col>
          </Row>
        </div>
      </div>
      <div className={"object-properties-footer"}/>
    </div>
  );
}

VanitySetTreeAndViewContainer.propTypes = {
  treeContainer: PropTypes.object,
  currentView: PropTypes.object,
  className: PropTypes.string,
  treeColumnSize: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.object,
};

export default VanitySetTreeAndViewContainer;