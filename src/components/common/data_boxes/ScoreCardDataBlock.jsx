import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function DataBlock({
  title,
  subTitle,
  toolTipText,
  clickAction,
  statusColor,
  ellipsesContent,
  footerText,
  modal,
  view,
  text,
}) {
  const statusColors = {
    success: "#00897b",
    danger: "#E57373",
    warning: "#F1AD0F",
    yellowGreen: "#acd32",
    yellow: "#FFFF00",
    yellowOrange: "#f8d568",
    orange: "#FFA500",
    redOrange: "#ff5349",
    red: "#ff0000",
  };

  return (
    <>
      <TooltipWrapper innerText={toolTipText}>
        <Card
          className="box-metric pointer"
          style={{ height: view !== "small" ? "100px" : "auto", maxWidth: "250px" }}
          onClick={clickAction}
        >
          <Card.Body className="data-blocks-body">
            <div className="data-blocks-status" style={{ backgroundColor: statusColors[statusColor] }}></div>
            <Card.Title className="data-blocks-title">{title}</Card.Title>
            {subTitle && (
              <Card.Subtitle className="data-blocks-subtitle">
                {subTitle && <div>{subTitle}</div>}
                {footerText && <div>{footerText}</div>}
                {ellipsesContent && <div className="data-blocks-ellipses">{ellipsesContent}</div>}
              </Card.Subtitle>
            )}
            {text && <Card.Text style={{ height: view !== "small" ? "350px" : "auto" }}>{text}</Card.Text>}
          </Card.Body>
        </Card>
      </TooltipWrapper>
      {modal}
    </>
  );
}

DataBlock.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  toolTipText: PropTypes.string,
  clickAction: PropTypes.func,
  statusColor: PropTypes.string,
  ellipsesContent: PropTypes.node,
  footerText: PropTypes.node,
  modal: PropTypes.node,
  view: PropTypes.string,
  text: PropTypes.string,
};

export default DataBlock;
