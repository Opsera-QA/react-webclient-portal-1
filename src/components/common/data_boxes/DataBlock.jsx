import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

// TODO: I need to remember to rewrite this
function DataBlock({ title, subTitle, toolTipText, clickAction, statusColor, 
                   ellipsesContent, footerText, modal, view, className }) {
  const statusColors = {
    success: "#00897b",
    danger: "#E57373",
    warning: "#F1AD0F"
  };

  const getCardClassNames = () => {
    let classNames = "box-metric";

    if (clickAction) {
      classNames += " pointer";
    }

    if (className) {
      classNames += " " + className;
    }

    return classNames;
  };

  return (
    <>
      <TooltipWrapper innerText={toolTipText}>
        <Card className={getCardClassNames()}
              style={{ height: view !== "small" ? "100px" : "auto", maxWidth: "250px"}}
              onClick={clickAction}>
          <Card.Body className="data-blocks-body">
            <div className="data-blocks-status"
                style={{backgroundColor: statusColors[statusColor]}}>      
            </div>
            <Card.Title className="data-blocks-title">
              {title}
            </Card.Title>
            <Card.Subtitle className="data-blocks-subtitle">
              {subTitle && <div>{subTitle}</div>}
              {footerText && <div>{footerText}</div>}
              {ellipsesContent && <div className="data-blocks-ellipses">{ellipsesContent}</div>}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </TooltipWrapper>
      {modal} 
    </>
  );
}

DataBlock.propTypes = {
  title: PropTypes.any,
  subTitle: PropTypes.string,
  toolTipText: PropTypes.string,
  clickAction: PropTypes.func,
  statusColor: PropTypes.string,
  ellipsesContent: PropTypes.node,
  footerText: PropTypes.node,
  modal: PropTypes.node,
  view: PropTypes.string,
  className: PropTypes.string
};

export default DataBlock;