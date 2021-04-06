import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

function DataBox({ title, subTitle, clickAction, modal }) {
  return (
    <>
      <Card className="box-metric pointer"
            style={{ height: "100px" }}
            onClick={clickAction}>
        <Card.Body className="summary-count-blocks-card-body">
          <Card.Title className="summary-count-blocks-card-title">
            {title}
          </Card.Title>
          <Card.Subtitle className="summary-count-blocks-card-subtitle">
            {subTitle}
          </Card.Subtitle>
        </Card.Body>
      </Card>
      {modal} 
    </>
  );
}

DataBox.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  clickAction: PropTypes.func,
  modal: PropTypes.func
};

export default DataBox;