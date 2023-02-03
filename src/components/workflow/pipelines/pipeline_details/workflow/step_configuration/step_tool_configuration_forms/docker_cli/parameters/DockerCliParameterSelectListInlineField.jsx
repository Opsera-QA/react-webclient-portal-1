import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

export default function DockerCliParameterSelectListInlineField(
  {
    parameter,
    index,
    disabled,
    deleteParameterFunction,
  }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-between ${index % 2 === 0 ? "even-row" : "odd-row"}`}
      key={index}
    >
      <Col sm={11}>
        <Row>
          <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
            {parameter?.parameterName}
          </Col>
          <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
            {parameter?.outputKey ? parameter?.outputKey : ""}
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"pr-3 pl-0 delete-button"}>
        <VanityButtonBase
          variant={"link"}
          onClickFunction={disabled !== true && deleteParameterFunction ? () => deleteParameterFunction(index) : undefined}
          icon={faTimes}
          iconClassName={"danger-red"}
        />
      </Col>
    </div>
  );
}

DockerCliParameterSelectListInlineField.propTypes = {
  parameter: PropTypes.object,
  index: PropTypes.number,
  deleteParameterFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

