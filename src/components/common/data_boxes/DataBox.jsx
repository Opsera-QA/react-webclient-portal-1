import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function DataBox({ title, subTitle, toolTip, clickAction, status, modal }) {
  const statusColor = {
    success: "green",
    fail: "red"
  };

  return (
    <>
      <TooltipWrapper innerText={toolTip}>
        <Card className="box-metric pointer"
              style={{ height: "100px" }}
              onClick={clickAction}>
          <Card.Body className="summary-count-blocks-card-body">
            <div className="summary-count-blocks-status"
                style={{backgroundColor: statusColor[status]}}>      
            </div>
            <Card.Title className="summary-count-blocks-card-title">
              {title}
            </Card.Title>
            <Card.Subtitle className="summary-count-blocks-card-subtitle">
              {subTitle}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </TooltipWrapper>
      {modal} 
    </>
  );
}

DataBox.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  toolTip: PropTypes.string,
  clickAction: PropTypes.func,
  status: PropTypes.string,
  modal: PropTypes.func
};

export default DataBox;