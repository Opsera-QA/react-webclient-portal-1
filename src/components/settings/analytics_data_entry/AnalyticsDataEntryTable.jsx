import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableLeaderColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserChart} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {analyticsDataMetadata} from "components/settings/analytics_data_entry/analytics-data-metadata";
import NewAnalyticsDataEntryOverlay from "components/settings/analytics_data_entry/NewAnalyticsDataEntryOverlay";

function AnalyticsDataEntryTable({ analyticsDataEntries, isLoading, loadData, isMounted, analyticsDataEntryFilterModel, setAnalyticsDataEntryFilterModel }) {
  const toastContext = useContext(DialogToastContext);
  let fields = analyticsDataMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "owner_name")),
      getTableLeaderColumn(getField(fields, "kpi_identifier")),
      getTableBooleanIconColumn(getField(fields, "active"))
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
        className={"no-table-border"}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={analyticsDataEntries}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createAnalyticsDataEntry}
      supportSearch={true}
      isLoading={isLoading}
      body={getAnalyticsDataEntryTable()}
      metadata={analyticsDataMetadata}
      titleIcon={faUserChart}
      filterDto={analyticsDataEntryFilterModel}
      setFilterDto={setAnalyticsDataEntryFilterModel}
      title={"Analytics Data Entries"}
      type={"Analytics Data Entry"}
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
  setAnalyticsDataEntryFilterModel: PropTypes.func
};

export default AnalyticsDataEntryTable;