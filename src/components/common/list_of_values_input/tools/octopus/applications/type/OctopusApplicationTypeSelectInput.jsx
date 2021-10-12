import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  OCTOPUS_APPLICATION_TYPE_LABELS,
  OCTOPUS_APPLICATION_TYPES
} from "components/common/list_of_values_input/tools/octopus/applications/type/octopus.application.types";

export const OCTOPUS_APPLICATION_TYPE_OPTIONS = [
  {
    text: OCTOPUS_APPLICATION_TYPES.ACCOUNT,
    value: OCTOPUS_APPLICATION_TYPE_LABELS.ACCOUNT,
  },
  {
    text: OCTOPUS_APPLICATION_TYPES.ENVIRONMENT,
    value: OCTOPUS_APPLICATION_TYPE_LABELS.ENVIRONMENT,
  },
  {
    text: OCTOPUS_APPLICATION_TYPES.EXTERNAL_FEED,
    value: OCTOPUS_APPLICATION_TYPE_LABELS.EXTERNAL_FEED,
  },
  {
    text: OCTOPUS_APPLICATION_TYPES.TARGET,
    value: OCTOPUS_APPLICATION_TYPE_LABELS.TARGET,
  },
  {
    text: OCTOPUS_APPLICATION_TYPES.TOMCAT_MANAGER,
    value: OCTOPUS_APPLICATION_TYPE_LABELS.TOMCAT_MANAGER,
  },
];

function OctopusApplicationTypeSelectInput({model, setModel, fieldName, disabled, setDataFunction, clearDataFunction}) {
  return (
    <SelectInputBase
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      textField={"text"}
      valueField={"value"}
      dataObject={model}
      clearDataFunction={clearDataFunction}
      selectOptions={OCTOPUS_APPLICATION_TYPE_OPTIONS}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

OctopusApplicationTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default OctopusApplicationTypeSelectInput;