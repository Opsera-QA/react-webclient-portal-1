import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import kpiConfigurationMetadata from "components/admin/kpi_editor/kpiConfiguration.metadata";
import {
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import NewKpiOverlay from "components/admin/kpi_editor/NewKpiOverlay";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";

function KpiTable({ data, loadData, isLoading, kpiFilterDto, setKpiFilterDto, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  let fields = kpiConfigurationMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getTableBooleanIconColumn(getField(fields, "active")),
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
    return <ActiveFilter filterDto={kpiFilterDto} setFilterDto={setKpiFilterDto} />;
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

KpiTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  kpiFilterDto: PropTypes.object,
  setKpiFilterDto: PropTypes.func,
  isMounted: PropTypes.object
};

export default KpiTable;
