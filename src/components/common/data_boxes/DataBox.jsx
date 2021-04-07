import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function DataBox({ title, subTitle, toolTipText, clickAction, statusColor, 
                   additionalContent, footer, modal, view }) {
  const statusColors = {
    success: "#00897b",
    danger: "#E57373",
    warning: "#F1AD0F"
  };

  return (
    <>
      <TooltipWrapper innerText={toolTipText}>
        <Card className="box-metric pointer"
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
              <div>{subTitle}</div>
            </Card.Subtitle>
            {additionalContent}
          </Card.Body>
          {footer}
        </Card>
      </TooltipWrapper>
      {modal} 
    </>
  );
}

DataBox.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  toolTipText: PropTypes.string,
  clickAction: PropTypes.func,
  statusColor: PropTypes.string,
  additionalContent: PropTypes.node,
  footer: PropTypes.node,
  modal: PropTypes.node,
  view: PropTypes.string
};

export default DataBox;