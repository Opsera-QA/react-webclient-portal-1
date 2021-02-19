import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import kpiMetaData from "components/admin/kpi_editor/kpi-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
//import FilterBar from "components/common/filters/FilterBar";
import StatusFilter from "components/common/filters/status/StatusFilter";
import NewKpiModal from "components/admin/kpi_editor/NewKpiModal";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";

function KpiTable({ data, kpiFilterDto, setKpiFilterDto, isLoading, loadData }) {
  let fields = kpiMetaData.fields;
  const history = useHistory();
  const [showKpiModal, setShowKpiModal] = useState(false);
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
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
    setShowKpiModal(true);
  };

  const getDropdownFilters = () => {
    return (
      <StatusFilter filterDto={kpiFilterDto} setFilterDto={setKpiFilterDto}/>
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
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        dropdownFilters={getDropdownFilters()}
        addRecordFunction={createKpi}
        isLoading={isLoading}
        body={getKpiTable()}
        titleIcon={faFileInvoice}
        title={"KPIs"}
        filterDto={kpiFilterDto}
        setFilterDto={setKpiFilterDto}
      />
      <NewKpiModal showModal={showKpiModal} setShowModal={setShowKpiModal} loadData={loadData}/>
    </div>
  );
}

KpiTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  kpiFilterDto: PropTypes.object,
  setKpiFilterDto: PropTypes.func
};

export default KpiTable;