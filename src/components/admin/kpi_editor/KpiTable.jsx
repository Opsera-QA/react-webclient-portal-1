import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";
import kpiMetaData from "./kpi_detail_view/kpi-form-fields";
import NewKpiModal from "./NewKpiModal";
import FilterBar from "../../common/filters/FilterBar";
import StatusFilter from "../../common/filters/status/StatusFilter";
import SearchFilter from "../../common/filters/search/StatusFilter";

function KpiTable({ data, kpiFilterDto, setKpiFilterDto, isLoading, loadData }) {
  let fields = kpiMetaData.fields;
  const history = useHistory();
  const [showKpiModal, setShowKpiModal] = useState(false);
  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
    ],
    []
  );

  const tableInitialState = {
    pageIndex: 0,
  };

  const onRowSelect = (rowData, type) => {
    history.push("/admin/kpis/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const createKpi = () => {
    setShowKpiModal(true);
  };

  const getFilterBar = () => {
    return(
      <FilterBar
        addRecordFunction={createKpi}
        loadData={loadData}
        filterDto={kpiFilterDto}
        setFilterDto={setKpiFilterDto}
        filters={["status", "search"]}
      >
        <StatusFilter filterDto={kpiFilterDto} setFilterDto={setKpiFilterDto} />
        <SearchFilter filterDto={kpiFilterDto} setFilterDto={setKpiFilterDto} />
      </FilterBar>
    );
  };

  return (
    <div className="mt-2">
      <CustomTable
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={data}
        rowStyling={rowStyling}
        columns={columns}
        createNewRecord={createKpi}
        type={"KPI"}
        tableTitle={"KPIs"}
        loadData={loadData}
        initialState={tableInitialState}
        tableFilterBar={getFilterBar()}
        paginationDto={kpiFilterDto}
        setPaginationDto={setKpiFilterDto}
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