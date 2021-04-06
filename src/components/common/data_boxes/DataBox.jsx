import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function DataBox({ title, subTitle, toolTipText, clickAction, statusColor, 
                   additionalContent, footer, modal, view }) {
  const statusColors = {
    success: "green",
    danger: "red",
    warning: "yellow"
  };

  return (
    <>
      <TooltipWrapper innerText={toolTipText}>
        <Card className="box-metric pointer"
              style={view !== "small" && { height: "100px" }}
              onClick={clickAction}>
          <Card.Body className="summary-count-blocks-card-body">
            <div className="summary-count-blocks-status"
                style={{backgroundColor: statusColors[statusColor]}}>      
            </div>
            <Card.Title className="summary-count-blocks-card-title">
              {title}
            </Card.Title>
            <Card.Subtitle className="summary-count-blocks-card-subtitle">
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

DataBox.defaultProps = {
  view: "large"
};

export default DataBox;