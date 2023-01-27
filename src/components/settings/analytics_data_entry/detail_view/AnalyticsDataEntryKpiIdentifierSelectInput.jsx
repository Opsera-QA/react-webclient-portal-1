import React from "react";
import PropTypes from "prop-types";
import KpiSelectInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiSelectInput";

function AnalyticsDataEntryKpiIdentifierSelectInput({ fieldName, analyticsDataEntryModel, setAnalyticsDataEntryModel, setKpiConfigurationModel}) {
  const setDataFunction = (fieldName, kpi) => {
    analyticsDataEntryModel?.setData(fieldName, kpi?.identifier);
    analyticsDataEntryModel?.setData("data", {});
    setKpiConfigurationModel(undefined);
    setAnalyticsDataEntryModel({...analyticsDataEntryModel});
  };

  return (
    <KpiSelectInput
      fieldName={fieldName}
      dataObject={analyticsDataEntryModel}
      setDataObject={setAnalyticsDataEntryModel}
      setDataFunction={setDataFunction}
      textField={"name"}
      valueField={"identifier"}
      manualDataEntry={true}
    />
  );
}

AnalyticsDataEntryKpiIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  analyticsDataEntryModel: PropTypes.object,
  setAnalyticsDataEntryModel: PropTypes.func,
  setKpiConfigurationModel: PropTypes.func
};

AnalyticsDataEntryKpiIdentifierSelectInput.defaultProps = {
  fieldName: "kpi_identifier",
};

export default AnalyticsDataEntryKpiIdentifierSelectInput;