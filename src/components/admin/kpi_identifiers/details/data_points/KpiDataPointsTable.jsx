import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getLimitedTableTextColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBezierCurve} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import NewKpiDataPointOverlay from "components/admin/kpi_identifiers/details/data_points/NewKpiDataPointOverlay";
import {getDataPointTypeLabel} from "components/common/list_of_values_input/insights/data_points/type/dataPoint.types";
import kpiDataPointMetadata from "components/common/inputs/metric/data_points/kpiDataPoint.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetKpiDataPointModel
  from "components/admin/kpi_identifiers/details/data_points/hooks/useGetKpiDataPointModel";
export default function KpiDataPointsTable(
  {
    dataPoints,
    loadData,
    isLoading,
    kpiId,
    setDataPointModel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const fields = kpiDataPointMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "identifier"), "no-wrap-inline"),
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), getDataPointTypeLabel, "no-wrap-inline"),
      // TODO: Make Strategic Criteria overlay column definition with overlay like the tags overlay
      // getTableDateColumn(getField(fields, "strategic_criteria")),
      getLimitedTableTextColumn(getField(fields, "description"), 100, "no-wrap-inline"),
    ],
    []
  );
  const {
    getNewKpiDataPointModel,
  } = useGetKpiDataPointModel();

  const {
    isOpseraAdministrator
  } = useComponentStateReference();

  const onRowSelect = (tableRow) => {
    const dataPoint = tableRow?.original;
    const newDataPointModel = getNewKpiDataPointModel(
      dataPoint,
      kpiId,
      false,
      );

    setDataPointModel({...newDataPointModel});
  };

  const createDataPoint = () => {
    toastContext.showOverlayPanel(
      <NewKpiDataPointOverlay
        loadData={loadData}
        kpiId={kpiId}
      />
    );
  };

  const getDataPointsTable = () => {
    return (
      <CustomTable
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
      addRecordFunction={isOpseraAdministrator === true ? createDataPoint : undefined}
      isLoading={isLoading}
      body={getDataPointsTable()}
      titleIcon={faBezierCurve}
      type={"Data Point"}
      title={"Data Points"}
      metadata={kpiDataPointMetadata}
      className={"mt-2"}
    />
  );
}

KpiDataPointsTable.propTypes = {
  dataPoints: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  kpiId: PropTypes.string,
  setDataPointModel: PropTypes.func,
};
