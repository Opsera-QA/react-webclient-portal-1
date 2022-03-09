import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import dataPointVisibilityMetadata
  from "components/common/inputs/metric/data_points/visibility/dataPointVisibility.metadata";
import modelHelpers from "components/common/model/modelHelpers";

function DashboardMetricDataPointVisibilityInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [dataPointVisibilityModel, setDataPointVisibilityModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setDataPointVisibilityModel(undefined);

    if (model) {
      const visibility = model?.getData(fieldName);
      const newModel = modelHelpers.parseObjectIntoModel(visibility, dataPointVisibilityMetadata);
      setDataPointVisibilityModel({...newModel});
    }

    return () => {
      isMounted.current = false;
    };
  }, [model]);

  const setDataFunction = (newModel) => {
    const visibility = newModel?.getPersistData();
    model?.setData(fieldName, visibility);
    console.log("visibility: " + JSON.stringify(visibility));
    setModel({...model});
  };

  if (model == null || dataPointVisibilityModel == null) {
    return null;
  }

  return (
    <div>
      <H4FieldSubHeader subheaderText={"Visibility"}/>
      <BooleanToggleInput
        dataObject={dataPointVisibilityModel}
        setDataObject={setDataFunction}
        fieldName={"isVisible"}
        disabled={disabled}
      />
    </div>
  );
}

DashboardMetricDataPointVisibilityInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fromDashboardMetric: PropTypes.bool,
  dataPoint: PropTypes.object,
};

DashboardMetricDataPointVisibilityInput.defaultProps = {
  fieldName: "visibility",
};

export default DashboardMetricDataPointVisibilityInput;