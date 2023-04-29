import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import useGetKpiIdentifiers from "hooks/insights/kpis/identifiers/useGetKpiIdentifiers";

function KpiIdentifierFilter(
  {
    fieldName,
    filterModel,
    setFilterModel,
    setDataFunction,
    inline,
    className,
    textField,
    valueField,
    status,
    policySupport,
    manualDataEntry,
  }) {
  const {
    kpiIdentifiers,
    isLoading,
    error,
  } = useGetKpiIdentifiers(
    status,
    policySupport,
    manualDataEntry
  );

  const handleDataFunction = (fieldName, selectedOption) => {
    if (setDataFunction) {
      setDataFunction(fieldName, selectedOption);
      return;
    }

    filterModel.setData(fieldName, selectedOption?.identifier);
    filterModel.setData("kpiName", selectedOption?.name);
    setFilterModel({...filterModel});
  };

  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      inline={inline}
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter By KPI"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      busy={isLoading}
      textField={textField}
      valueField={valueField}
      selectOptions={kpiIdentifiers}
      error={error}
      setDataFunction={handleDataFunction}
    />
  );
}

KpiIdentifierFilter.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  status: PropTypes.string,
  policySupport: PropTypes.string,
  manualDataEntry: PropTypes.bool,
};

KpiIdentifierFilter.defaultProps = {
  fieldName: "identifier",
  textField: "name",
  valueField: "identifier",
  status: "active",
};

export default KpiIdentifierFilter;