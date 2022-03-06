import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CenterLoadingIndicator(
  {
    type,
  }) {
  return (
    <Row className={"h-100 text-center mx-0"}>
      <Col>
        <div className={"info-text h-100 d-flex my-auto"}>
          <div className={"m-auto"}>
            <LoadingIcon className={"mr-2"}/>Loading {type}
          </div>
        </div>
      </Col>
    </Row>
  );
}

CenterLoadingIndicator.propTypes = {
  type: PropTypes.string
};

CenterLoadingIndicator.defaultProps = {
  type: "Data",
};

export default CenterLoadingIndicator;