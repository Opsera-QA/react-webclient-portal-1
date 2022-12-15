import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import dataPointCustomFieldsMappingMetadata
  from "components/common/inputs/metric/data_points/custom_fields/dataPointCustomFieldsMapping.metadata";
import modelHelpers from "components/common/model/modelHelpers";

function DataPointAllowCustomMappingInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [dataPointCustomMappingModel, setDataPointCustomMappingModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setDataPointCustomMappingModel(undefined);

    if (model) {
      const customMappingDetails = model?.getData(fieldName);
      const newModel = modelHelpers.parseObjectIntoModel(customMappingDetails, dataPointCustomFieldsMappingMetadata);
      setDataPointCustomMappingModel({...newModel});
    }

    return () => {
      isMounted.current = false;
    };
  }, [model]);

  const setDataFunction = (newModel) => {
    const customMappingDetails = newModel?.getPersistData();
    model?.setData(fieldName, customMappingDetails);
    setModel({...model});
    setDataPointCustomMappingModel({...newModel});
  };

  if (model == null || dataPointCustomMappingModel == null) {
    return null;
  }

  return (
    <div>
      <H4FieldSubHeader subheaderText={"Custom Fields Mapping"}/>      
      <BooleanToggleInput
        dataObject={dataPointCustomMappingModel}
        setDataObject={setDataFunction}
        fieldName={"enabled"}
        disabled={disabled}
      />      
    </div>
  );
}

DataPointAllowCustomMappingInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fromDashboardMetric: PropTypes.bool,
};

DataPointAllowCustomMappingInput.defaultProps = {
  fieldName: "customFieldsMapping",
};

export default DataPointAllowCustomMappingInput;
