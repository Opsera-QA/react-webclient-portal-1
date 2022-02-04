import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import JsonInput from "../../../../../../../../common/inputs/object/JsonInput";
import HelpOverlayBase from "../../../../../../../../common/overlays/center/help/HelpOverlayBase";
import { DialogToastContext } from "../../../../../../../../../contexts/DialogToastContext";

// TODO: This needs to be refactored.
function TerraformRuntimeArgs({ dataObject, setDataObject }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div className="text-muted mb-2">
        Enter Runtime arguments as a key value pair JSON. You can add any number of runtime arguments to the JSON
        Object. Sample: {" { Key1: \'Value1\', Key2: \'value2\' }"}
      </div>
    );
  };

  const getHelpComponent = () => {
    return (
      <HelpOverlayBase
        closePanel={closePanel}
        showPanel={true}
        helpTopic={"Runtime Arguments"}
        helpDocumentation={getHelpDocumentation()}
      ></HelpOverlayBase>
    );
  };

  return (
    <>
      <JsonInput
        fieldName={"keyValueMap"}
        model={dataObject}
        setModel={setDataObject}
        className={"mt-3"}
        helpComponent={getHelpComponent}
      />
      <small className="form-text text-muted form-group text-left">Enter runtime arguments(if any) as a JSON Object</small>
    </>
  );
}

TerraformRuntimeArgs.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default TerraformRuntimeArgs;
