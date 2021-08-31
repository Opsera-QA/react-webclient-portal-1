import React, {useState} from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/pro-light-svg-icons";

// TODO: This needs to be refactored.
function TerraformRuntimeArgs({dataObject, setDataObject}) {
    const [jsonEditorInvalid, setJsonEditorInvalid] = useState(false);
    const [jsonEditor, setJsonEditor] = useState({});


    const handleJsonInputUpdate = (e) => {
        if (e.error) {
          setJsonEditorInvalid(e.error);
          return;
        }
        if (e.jsObject && Object.keys(e.jsObject).length > 0) {
          setJsonEditor(e.jsObject);
          let newDataObject = dataObject;
          newDataObject.setData("keyValueMap", e.jsObject);
          setDataObject({ ...newDataObject });
          return;
        }
      };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={
          <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
            <Popover.Title as="h3">Runtime Arguments</Popover.Title>

            <Popover.Content>
              <div className="text-muted mb-2">
                Enter Runtime arguments as a key value pair JSON. You can add any number of runtime arguments to the
                JSON Object. Sample: {" { Key1: Value1, Key2: value2 }"}
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
      <div className="form-group m-2">
        <label>Runtime Arguments (Optional)</label>
        <div style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}>
          <JSONInput
            placeholder={
              typeof dataObject.getData("keyValueMap") === "object" &&
              Object.keys(dataObject.getData("keyValueMap")).length > 0
                ? dataObject.getData("keyValueMap")
                : undefined
            }
            value={dataObject.getData("keyValueMap")}
            onChange={(e) => handleJsonInputUpdate(e)}
            theme="light_mitsuketa_tribute"
            locale={locale}
            height="175px"
          />
        </div>
      </div>
      <small className="form-text text-muted form-group m-2 text-left">Enter runtime arguments as a JSON Object</small>
    </>
  );
}

TerraformRuntimeArgs.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  };
  
  export default TerraformRuntimeArgs;