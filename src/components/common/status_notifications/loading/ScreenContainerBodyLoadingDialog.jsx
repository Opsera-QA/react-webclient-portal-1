import React from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function ScreenContainerBodyLoadingDialog({ message }) {
  return (
    <Row className={"detail-container-body loading-dialog"}>
      <Col xs={12} className="my-auto text-center text-muted">
        <IconBase isLoading={true} className="mr-2 vertical-align-item"/>
        {message}
      </Col>
    </Row>
  );
}

ScreenContainerBodyLoadingDialog.propTypes = {
  message: PropTypes.string,
};

ScreenContainerBodyLoadingDialog.defaultProps = {
  message: "Loading Data",
};

export default ScreenContainerBodyLoadingDialog;