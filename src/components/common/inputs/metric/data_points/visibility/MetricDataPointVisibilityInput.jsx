import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import dataPointVisibilityMetadata
  from "components/common/inputs/metric/data_points/visibility/dataPointVisibility.metadata";
import modelHelpers from "components/common/model/modelHelpers";

function MetricDataPointVisibilityInput(
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
    setModel({...model});
    setDataPointVisibilityModel({...newModel});
  };

  const getUserVisibilityToggle = () => {
    return (
      <BooleanToggleInput
        dataObject={dataPointVisibilityModel}
        setDataObject={setDataFunction}
        fieldName={"userVisibilityToggleSupport"}
        disabled={disabled}
      />
    );
  };

  if (model == null || dataPointVisibilityModel == null) {
    return null;
  }

  return (
    <div>
      <H4FieldSubHeader subheaderText={"Visibility"}/>
      {getUserVisibilityToggle()}
      <BooleanToggleInput
        dataObject={dataPointVisibilityModel}
        setDataObject={setDataFunction}
        fieldName={"isVisible"}
        disabled={disabled}
      />
    </div>
  );
}

MetricDataPointVisibilityInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fromDashboardMetric: PropTypes.bool,
};

MetricDataPointVisibilityInput.defaultProps = {
  fieldName: "visibility",
};

export default MetricDataPointVisibilityInput;