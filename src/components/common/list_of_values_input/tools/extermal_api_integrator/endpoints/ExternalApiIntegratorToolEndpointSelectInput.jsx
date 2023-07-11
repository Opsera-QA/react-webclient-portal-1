import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetExternalApiIntegratorEndpoints from "hooks/tools/external_api_integrator/endpoints/useGetExternalApiIntegratorEndpoints";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function ExternalApiIntegratorToolEndpointSelectInput(
  {
    fieldName,
    model,
    setModel,
    toolId,
    disabled,
    setDataFunction,
    clearDataFunction,
    valueField,
    textField,
  }) {
  const {
    endpoints,
    isLoading,
    error,
  } = useGetExternalApiIntegratorEndpoints(toolId);
  const [internalError, setInternalError] = useState("");

  useEffect(() => {
    setInternalError("");

    if (
      DataParsingHelper.isMongoDbId(toolId) === true &&
      model &&
      endpoints &&
      isLoading === false
    ) {
      const selectedEndpointId = model?.getData(fieldName);

      if (DataParsingHelper.isMongoDbId(selectedEndpointId) === true) {
        const foundEndpoint = endpoints.find((endpoint) => endpoint[valueField] === selectedEndpointId);

        if (foundEndpoint == null) {
          setInternalError(
            "Previously saved Endpoint is no longer available. It may have been deleted. Please select another Endpoint from the list."
          );
        }
      }
    }
  }, [endpoints, isLoading]);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={endpoints}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      error={error || internalError}
    />
  );
}

ExternalApiIntegratorToolEndpointSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

ExternalApiIntegratorToolEndpointSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};

export default ExternalApiIntegratorToolEndpointSelectInput;
