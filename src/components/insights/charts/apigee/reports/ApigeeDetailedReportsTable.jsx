import React, {useState, useEffect, useContext, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { apigeeReportsMetadata } from "./apigeeReports-metadata";
import FilterContainer from "../../../../common/table/FilterContainer";
import CustomTable from "../../../../common/table/CustomTable";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import IconBase from "../../../../common/icons/IconBase";
import {parseError} from "../../../../common/helpers/error-helpers";
import apigeeActions from "../apigee.action";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import SuccessPercentActionableInsights
  from "../../github_actions/data_blocks/AllGithubActions/SuccessPercent/SuccessPercentActionableInsights";

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
      getTableTextColumn(getField(fields, "isNew"), "isNew")
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

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Actionable APIGEE Detailed Report`}
        showToasts={true}
        isLoading={false}
      >
        <div className={"p-3"}>
          <SuccessPercentActionableInsights kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
        </div>
      </FullScreenCenterOverlayContainer>
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
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <div className={"p-2"}>
      <FilterContainer
        isLoading={isLoading}
        body={getTable()}
        className={"px-2 pb-2"}
        loadData={loadData}
        title={pipeline?.pipelineName ? pipeline?.pipelineName : ''}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
        showRefreshButton={false}
        supportSearch={true}
      />
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
