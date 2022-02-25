import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IconBase from "components/common/icons/IconBase";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";

function PipelineMappingEnvironmentInputRow(
  { 
    disabled,
    setKeyFunction,
    setValueFunction,
    environment,
    deleteEnvironmentFunction,
  }) {

  // make standalone component
  const getDeletePropertyButton = () => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={deleteEnvironmentFunction}>
          <span>
            <IconBase
              className={"danger-red"}
              icon={faTimes}
            />
          </span>
        </Button>
      );
    }
  };

  return (
    <div className={"d-flex py-2"}>
      <Col sm={11}>
        <Row>
          <Col sm={6} className={"pr-1"}>
            <StandaloneTextInputBase
             value={environment?.key}
             setDataFunction={setKeyFunction}
             disabled={disabled}
            />
          </Col>
          <Col sm={6} className={"pl-2 pr-2"}>
            <StandaloneTextInputBase
              value={environment?.value}
              setDataFunction={setValueFunction}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 mr-auto delete-button"}>
        {getDeletePropertyButton()}
      </Col>
    </div>
  );
}

PipelineMappingEnvironmentInputRow.propTypes = {
  disabled: PropTypes.bool,
  deleteEnvironmentFunction: PropTypes.func,
  setKeyFunction: PropTypes.func,
  setValueFunction: PropTypes.func,
  environment: PropTypes.object,
};

export default PipelineMappingEnvironmentInputRow;