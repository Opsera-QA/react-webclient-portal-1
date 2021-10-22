import React from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

// TODO: Is there a way to force height to be 100% based on where this is placed?
function InlineLoadingDialog({ message, height }) {
  return (
    <Row className={"loading-dialog h-100"} style={{minHeight: height}}>
      <Col xs={12} className="my-auto text-center text-muted h-100">
        <IconBase isLoading={true} className="mr-2 vertical-align-item"/>
        {message}
      </Col>
    </Row>
  );
}

InlineLoadingDialog.propTypes = {
  message: PropTypes.string,
  height: PropTypes.string,
};

InlineLoadingDialog.defaultProps = {
  message: "Loading Data",
  height: "250px",
};

export default InlineLoadingDialog;