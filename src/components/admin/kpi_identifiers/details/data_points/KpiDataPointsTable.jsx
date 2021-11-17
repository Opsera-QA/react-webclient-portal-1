import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBezierCurve} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import NewKpiDataPointOverlay from "components/admin/kpi_identifiers/details/data_points/NewKpiDataPointOverlay";
import KpiDataPointModel from "components/admin/kpi_identifiers/details/data_points/kpiDataPoint.model";
import {AuthContext} from "contexts/AuthContext";

function KpiDataPointsTable(
  {
    dataPoints,
    loadData,
    isLoading,
    isMounted,
    dataPointMetadata,
    kpiId,
    setDataPointModel,
    accessRoleData,
    cancelTokenSource,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(dataPointMetadata);
  }, [JSON.stringify(dataPointMetadata)]);

  const loadColumnMetadata = (newMetadata) => {
    if (isMounted?.current === true && newMetadata?.fields) {
      const fields = newMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
          getTableTextColumn(getField(fields, "identifier"), "no-wrap-inline"),
          // TODO: Make Data point type column definition
          getTableTextColumn(getField(fields, "type"), "no-wrap-inline"),
          // TODO: Make Strategic Criteria overlay column definition with overlay like the tags overlay
          // getTableDateColumn(getField(fields, "strategic_criteria")),
        ]
      );
    }
  };

  const onRowSelect = (rowData) => {
    const newDataPointModel = new KpiDataPointModel(
      {...rowData},
      dataPointMetadata,
      false,
      getAccessToken,
      cancelTokenSource,
      loadData,
      accessRoleData,
      [],
      setDataPointModel,
      kpiId,
    );

    setDataPointModel(newDataPointModel);
  };

  const createDataPoint = () => {
    toastContext.showOverlayPanel(
      <NewKpiDataPointOverlay
        loadData={loadData}
        isMounted={isMounted}
        kpiId={kpiId}
        dataPointMetadata={dataPointMetadata}
      />
    );
  };

  const getDataPointsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={dataPoints}
        columns={columns}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={dataPointMetadata != null ? createDataPoint : undefined}
      isLoading={isLoading}
      body={getDataPointsTable()}
      titleIcon={faBezierCurve}
      type={"Data Point"}
      title={"Data Points"}
      metadata={dataPointMetadata}
      className={"mt-2"}
    />
  );
}

KpiDataPointsTable.propTypes = {
  dataPoints: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  dataPointMetadata: PropTypes.object,
  kpiId: PropTypes.string,
  setDataPointModel: PropTypes.func,
  accessRoleData: PropTypes.object,
  cancelTokenSource: PropTypes.object,
};

export default KpiDataPointsTable;
