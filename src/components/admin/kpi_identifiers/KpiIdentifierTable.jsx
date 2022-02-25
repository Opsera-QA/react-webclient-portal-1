import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import kpiIdentifierMetadata from "components/admin/kpi_identifiers/kpiIdentifier.metadata";
import {
  getLimitedTableTextColumn, getTableArrayCountColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import NewKpiOverlay from "components/admin/kpi_identifiers/NewKpiOverlay";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import KpiPolicySupportFilterSelectInput
  from "components/common/filters/insights/kpi/policy_support/KpiPolicySupportFilterSelectInput";

function KpiIdentifierTable({ data, loadData, isLoading, kpiFilterDto, setKpiFilterDto, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  let fields = kpiIdentifierMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "identifier")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getTableArrayCountColumn(getField(fields, "dataPoints")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getTableBooleanIconColumn(getField(fields, "policySupport")),
      getTableDateColumn(getField(fields, "createdAt")),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    history.push("/admin/kpis/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const createKpi = () => {
    toastContext.showOverlayPanel(<NewKpiOverlay loadData={loadData} isMounted={isMounted} />);
  };

  const getDropdownFilters = () => {
    return (
      <>
        <KpiPolicySupportFilterSelectInput
          filterModel={kpiFilterDto}
          setFilterModel={setKpiFilterDto}
        />
        <ActiveFilter
          filterDto={kpiFilterDto}
          setFilterDto={setKpiFilterDto}
        />
      </>
    );
  };

  const getKpiTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={data}
        rowStyling={rowStyling}
        columns={columns}
        loadData={loadData}
        paginationDto={kpiFilterDto}
        setPaginationDto={setKpiFilterDto}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      dropdownFilters={getDropdownFilters()}
      addRecordFunction={createKpi}
      isLoading={isLoading}
      body={getKpiTable()}
      supportSearch={true}
      titleIcon={faFileInvoice}
      title={"KPIs"}
      className={"px-2 pb-2"}
      filterDto={kpiFilterDto}
      setFilterDto={setKpiFilterDto}
    />
  );
}

KpiIdentifierTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  kpiFilterDto: PropTypes.object,
  setKpiFilterDto: PropTypes.func,
  isMounted: PropTypes.object
};

export default KpiIdentifierTable;
