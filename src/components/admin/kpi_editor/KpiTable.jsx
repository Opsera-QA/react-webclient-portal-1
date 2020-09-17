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

function KpiTable({ data, isLoading, loadData }) {
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

  const onRowSelect = (rowData, type) => {
    history.push("/admin/kpis/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const createKpi = () => {
    setShowKpiModal(true);
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable onRowSelect={onRowSelect} isLoading={isLoading} data={data} rowStyling={rowStyling} columns={columns} createNewRecord={createKpi} type={"KPI"} tableTitle={"KPIs"} />
      </div>
      <NewKpiModal showModal={showKpiModal} setShowModal={setShowKpiModal} loadData={loadData}/>
    </>
  );
}

KpiTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default KpiTable;