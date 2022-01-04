import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/tools/informatica/iics_types/informaticaIntelligentCloudService.types";

function InformaticaIntelligentCloudServiceTypeSelectInputBase(
  {
    fieldName,
    model,
    setModel,
    isLoading,
    setDataFunction,
    clearDataFunction,
    disabled,
  }) { 
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      busy={isLoading}
      clearDataFunction={clearDataFunction}
      placeholderText={"Select Informatica Intelligent Cloud Service Type"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

InformaticaIntelligentCloudServiceTypeSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  isLoading: PropTypes.bool,
};

export default InformaticaIntelligentCloudServiceTypeSelectInputBase;