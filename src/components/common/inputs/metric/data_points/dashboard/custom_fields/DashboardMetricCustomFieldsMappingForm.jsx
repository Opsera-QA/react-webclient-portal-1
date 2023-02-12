import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import H4MetricSubHeader from "components/common/fields/subheader/metric/H4MetricSubHeader";
import AverageMttrCustomFieldsMappingInput from "./inputs/average_mttr/AverageMttrCustomFieldsMappingInput";
import dataPointCustomFieldsMappingMetadata
  from "components/common/inputs/metric/data_points/custom_fields/dataPointCustomFieldsMapping.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import DashboardMetricUseCustomFieldsToggleInput from "./DashboardMetricUseCustomFieldsToggleInput";

function DashboardMetricCustomFieldsMappingForm(
  {    
    model,
    setModel,
    dataPoint,
    fromDashboardMetric,
    className,
    fieldName
  }) {

  const [customFieldsMappingModel, setCustomFieldsMappingModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setCustomFieldsMappingModel(undefined);

    if (model) {
      const customFields = model?.getData(fieldName);
      const newModel = modelHelpers.parseObjectIntoModel(customFields, dataPointCustomFieldsMappingMetadata);
      setCustomFieldsMappingModel({...newModel});
    }

    return () => {
      isMounted.current = false;
    };
  }, [model]);

  const setDataFunction = (newModel) => {    
    const customMapping = newModel?.getPersistData();
    model?.setData(fieldName, customMapping);
    setModel({...model});
  };

  const getMappingFields = () => {
    if (!customFieldsMappingModel.getData("useCustomFields")) {
      return null;
    }
    const identifier = dataPoint?.identifier;
    switch (identifier) {
      case "average-mttr-data-block-data-point":
        return (
          <AverageMttrCustomFieldsMappingInput
            fieldName={"mappedFields"}
            model={customFieldsMappingModel}
            setModel={setDataFunction}
          />
        );
      default:
        return null;
    }
  };

  if (model == null || customFieldsMappingModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H4MetricSubHeader subheaderText={"Custom Fields Mapping"} />
      <DashboardMetricUseCustomFieldsToggleInput
        model={customFieldsMappingModel}
        setModel={setDataFunction}
        fieldName={"useCustomFields"}
      />
      {getMappingFields()}
    </div>
  );
}

DashboardMetricCustomFieldsMappingForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,  
  fromDashboardMetric: PropTypes.bool,
  dataPoint: PropTypes.object,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

DashboardMetricCustomFieldsMappingForm.defaultProps = {
  fieldName: "customFieldsMapping",
};

export default DashboardMetricCustomFieldsMappingForm;
