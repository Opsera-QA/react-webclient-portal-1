import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import ReactJson from "react-json-view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import JsonInput from "../../../../../../../../common/inputs/object/JsonInput";

const SAMPLE_DATA = [
  {
    name: "variable1",
    value: "value1",
    description: "description1",
    isSensitive: false,
  },
  {
    name: "variable2",
    value: "value2",
    description: "description2",
    isSensitive: false,
  },
];

function OctopusDeploymentVariables({ fieldName, dataObject, setDataObject, disabled }) {
  if (!dataObject?.getData("specifyDepVariables")) {
    return null;
  }

  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={
          <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
            <Popover.Title as="h3">Deployment Variables</Popover.Title>

            <Popover.Content>
              <div className="text-muted mb-2">
                Enter deployment variables as an list of JSON objects. Environment scope is automatically fetched from the previous user selections
                {
                  <div className={"mt-2"}>
                    Sample:
                    <ReactJson
                    className={"mt-1"}
                    src={SAMPLE_DATA}
                    displayDataTypes={false}
                  />
                  </div>
                }
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="fa-pull-right pointer pr-2"
          onClick={() => document.body.click()}
        />
      </OverlayTrigger>
      <div className="form-group">
        <JsonInput fieldName={fieldName} model={dataObject} setModel={setDataObject} disabled={disabled} />
      </div>
      {!disabled && (
        <small className="form-text text-muted form-group m-2 text-left">
          Enter deployment variables as a list of JSON Objects
        </small>
      ) }
    </>
  );
}

OctopusDeploymentVariables.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default OctopusDeploymentVariables;
