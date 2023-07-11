import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import dataPointVisibilityMetadata from "components/common/inputs/metric/data_points/visibility/dataPointVisibility.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import H4MetricSubHeader from "components/common/fields/subheader/metric/H4MetricSubHeader";

function DashboardDefaultNotificationInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    className,
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
  };

  if (model == null || dataPointVisibilityModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H4MetricSubHeader subheaderText={"Notifications"}/>
      <BooleanToggleInput
        dataObject={dataPointVisibilityModel}
        setDataObject={setDataFunction}
        fieldName={"sendDefaultCriteriaNotification"}
        disabled={disabled}
      />
    </div>
  );
}

DashboardDefaultNotificationInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fromDashboardMetric: PropTypes.bool,
  dataPoint: PropTypes.object,
  className: PropTypes.string,
};

DashboardDefaultNotificationInput.defaultProps = {
  fieldName: "visibility",
};

export default DashboardDefaultNotificationInput;