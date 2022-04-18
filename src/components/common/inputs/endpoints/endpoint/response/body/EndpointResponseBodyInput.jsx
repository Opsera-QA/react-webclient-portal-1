import React from "react";
import PropTypes from "prop-types";
import EndpointResponseBodyTypeSelectInput
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseBodyTypeSelectInput";
import EndpointResponseBodyInputBase
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseBodyInputBase";

function EndpointResponseBodyInput(
  {
    model,
    setModel,
    disabled,
  }) {
  return (
    <div className={"m-3"}>
      <EndpointResponseBodyTypeSelectInput
        model={model}
        setModel={setModel}
        fieldName={"responseBodyType"}
        disabled={disabled}
      />
      <EndpointResponseBodyInputBase
        model={model}
        setModel={setModel}
        fieldName={"responseBodyFields"}
      />
    </div>
  );
}

EndpointResponseBodyInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseBodyInput;
