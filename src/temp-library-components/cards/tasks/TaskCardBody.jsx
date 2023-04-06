import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";

export default function TaskCardBody(
  {
    taskModel,
  }) {
  const getCardBodyByType = () => {
    switch (taskModel?.getData("type")) {
      default:
        return null;
    }
  };

  if (taskModel == null) {
    return undefined;
  }

  return (
    <div
      style={{
        minHeight: "50px",
      }}
    >
      <Row className={"small"}>
        {getCardBodyByType()}
        {/*<Col xs={12}>*/}
        {/*<DescriptionField dataObject={taskModel} className={"description-height"} />*/}
        {/*</Col>*/}
      </Row>
    </div>
  );
}

TaskCardBody.propTypes = {
  taskModel: PropTypes.object,
};