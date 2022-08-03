import React, {useState, useEffect, useContext, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { apigeeReportsMetadata } from "./apigeeReports-metadata";
import FilterContainer from "../../../../common/table/FilterContainer";
import CustomTable from "../../../../common/table/CustomTable";
import {
  getTableTextColumn, getTableBooleanIconColumn
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import {parseError} from "../../../../common/helpers/error-helpers";
import apigeeActions from "../apigee.action";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {getMetricFilterValue} from "../../../../common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "../../../../common/badges/date/metrics/MetricDateRangeBadge";

function ApigeeDetailedReportsTable({ pipeline, rowData, dashboardData, kpiConfiguration }) {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...apigeeReportsMetadata.newObjectFields },
      apigeeReportsMetadata,
      false
    )
  );
  const toastContext = useContext(DialogToastContext);
  const noDataMessage = 'No relevant data found.';
  const fields = apigeeReportsMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "name"),
      getTableTextColumn(getField(fields, "type"), "type"),
      getTableTextColumn(getField(fields, "revision"), "revision"),
      getTableTextColumn(getField(fields, "state"), "state"),
      getTableBooleanIconColumn(getField(fields, "isNew"))
    ],
    []
  );

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipeline]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      if(pipeline) {
        await loadPipelineData();
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadPipelineData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    setIsLoading(true);
    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    const response = await apigeeActions.getReportDetails(
      getAccessToken,
      cancelSource,
      kpiConfiguration,
      dashboardTags,
      pipeline?.pipelineId,
      rowData?.organization,
      rowData?.environment,
      filterDto
    );
    let dataObject = response?.data?.data?.data?.[0];
    let dataCount = dataObject?.count ? dataObject?.count : 0;
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", dataCount);
    setFilterModel({ ...newFilterDto });
    if (isMounted?.current === true && dataObject && Array.isArray(dataObject?.report)) {
      setMetrics(dataObject?.report);
    }
  };

  const getDateBadge = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");

    return (
      <MetricDateRangeBadge
        startDate={date?.startDate}
        endDate={date?.endDate}
      />
    );
  };

  const getTable = () => {
    if (error) {
      return (
        <div className="mx-2" >
          <div className="max-content-width p-5 mt-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className={"-5"}>An error has occurred during loading: {parseError(error?.message)}.</span>
          </div>
        </div>
      );
    }
    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <div className={"p-2"}>
      <div className={"d-flex details-title-text"}>
        <div className={'mr-4'}>
          <b>Pipeline Name:</b> {pipeline.pipelineName}
        </div>
        <div className={'mr-4'}>
          <b>Organization:</b> {rowData.organization}
        </div>
        <div className={'mr-4'}>
          <b>Environment:</b> {rowData.environment}
        </div>
      </div>
      <FilterContainer
        isLoading={isLoading}
        body={getTable()}
        className={"p-2"}
        loadData={loadData}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
        showRefreshButton={false}
        supportSearch={true}
      />
      <div className={"d-flex p-2 justify-content-between chart-footer-text"}>
        <div>
          {getDateBadge()}
        </div>
      </div>
    </div>
  );
}
ApigeeDetailedReportsTable.propTypes = {
  pipeline: PropTypes.object,
  rowData: PropTypes.object,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object
};
export default ApigeeDetailedReportsTable;
