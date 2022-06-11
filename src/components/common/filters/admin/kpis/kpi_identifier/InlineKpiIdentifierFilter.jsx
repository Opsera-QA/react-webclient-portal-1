import React from "react";
import PropTypes from "prop-types";
import KpiIdentifierFilter from "components/common/filters/admin/kpis/kpi_identifier/KpiIdentifierFilter";

function InlineKpiIdentifierFilter({ fieldName, filterModel, setFilterModel, loadData, className, textField, valueField, status, policySupport, manualDataEntry}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, selectedOption?.identifier);
    newDataObject.setData("identifierName", selectedOption?.name);
    loadData(newDataObject);
  };

  if (loadData == null) {
    return null;
  }

  return (
    <KpiIdentifierFilter
      inline={true}
      fieldName={fieldName}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      className={className}
      textField={textField}
      valueField={valueField}
      status={status}
      policySupport={policySupport}
      manualDataEntry={manualDataEntry}
      setDataFunction={setDataFunction}
    />
  );
}

InlineKpiIdentifierFilter.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  status: PropTypes.string,
  policySupport: PropTypes.string,
  manualDataEntry: PropTypes.bool,
};

InlineKpiIdentifierFilter.defaultProps = {
  fieldName: "identifier",
  textField: "name",
  valueField: "identifier",
};

export default InlineKpiIdentifierFilter;