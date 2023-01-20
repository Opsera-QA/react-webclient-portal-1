import React from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function LocalInputParameterInlineField(
  {
    parameter,
    disabled,
    index,
    deleteParameterFunction,
  }) {
  const parsedParameter = DataParsingHelper.parseObject(parameter, {});

  return (
    <div
      className={`d-flex align-items-center justify-content-between ${index % 2 === 0 ? "even-row" : "odd-row"}`}
      key={index}
    >
      <Col sm={11}>
        <Row>
          <Col sm={6} className={"pl-2 pr-0"}>
            {parsedParameter?.name}
          </Col>
          <Col sm={6} className={"pl-2 pr-0"}>
            {parsedParameter?.value}
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

LocalInputParameterInlineField.propTypes = {
  index: PropTypes.number,
  deleteParameterFunction: PropTypes.func,
  disabled: PropTypes.bool,
  parameter: PropTypes.object,
};
