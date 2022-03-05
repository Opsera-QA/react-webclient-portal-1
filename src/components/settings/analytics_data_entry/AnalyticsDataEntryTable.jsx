import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableTextColumn,
  getTableDateTimeColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faUserChart } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { analyticsDataEntryMetadata } from "components/settings/analytics_data_entry/analyticsDataEntry.metadata";
import NewAnalyticsDataEntryOverlay from "components/settings/analytics_data_entry/NewAnalyticsDataEntryOverlay";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import KpiIdentifierFilter from "components/common/filters/admin/kpis/kpi_identifier/KpiIdentifierFilter";
import InlineKpiIdentifierFilter from "components/common/filters/admin/kpis/kpi_identifier/InlineKpiIdentifierFilter";

function AnalyticsDataEntryTable({
  analyticsDataEntries,
  isLoading,
  loadData,
  isMounted,
  analyticsDataEntryFilterModel,
  setAnalyticsDataEntryFilterModel,
}) {
  const toastContext = useContext(DialogToastContext);
  let fields = analyticsDataEntryMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "kpi_identifier")),
      getTableTextColumn(getField(fields, "owner_name")),
      getTableTextColumn(getField(fields, "data.domain")),
      getTableTextColumn(getField(fields, "data.application")),
      getTableDateTimeColumn(getField(fields, "data.from")),
      getTableDateTimeColumn(getField(fields, "data.to")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const createAnalyticsDataEntry = () => {
    toastContext.showOverlayPanel(<NewAnalyticsDataEntryOverlay loadData={loadData} isMounted={isMounted} />);
  };

  const onRowSelect = (rowData) => {
    history.push(`/settings/analytics-data-entries/details/${rowData.original._id}`);
  };

  const getAnalyticsDataEntryTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={analyticsDataEntries}
        columns={columns}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineKpiIdentifierFilter
        filterModel={analyticsDataEntryFilterModel}
        setFilterModel={setAnalyticsDataEntryFilterModel}
        manualDataEntry={true}
        loadData={loadData}
        className={"mr-2"}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <>
        <KpiIdentifierFilter
          filterModel={analyticsDataEntryFilterModel}
          setFilterModel={setAnalyticsDataEntryFilterModel}
          manualDataEntry={true}
          className={"mb-2"}
        />
        <ActiveFilter filterDto={analyticsDataEntryFilterModel} setFilterDto={setAnalyticsDataEntryFilterModel} />
      </>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createAnalyticsDataEntry}
      supportSearch={true}
      isLoading={isLoading}
      body={getAnalyticsDataEntryTable()}
      metadata={analyticsDataEntryMetadata}
      titleIcon={faUserChart}
      filterDto={analyticsDataEntryFilterModel}
      dropdownFilters={getDropdownFilters()}
      inlineFilters={getInlineFilters()}
      setFilterDto={setAnalyticsDataEntryFilterModel}
      title={"Analytics Data Entries"}
      type={"Entry"}
      className={"px-2 pb-2"}
    />
  );
}

AnalyticsDataEntryTable.propTypes = {
  analyticsDataEntries: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  analyticsDataEntryFilterModel: PropTypes.object,
  setAnalyticsDataEntryFilterModel: PropTypes.func,
};

export default AnalyticsDataEntryTable;
