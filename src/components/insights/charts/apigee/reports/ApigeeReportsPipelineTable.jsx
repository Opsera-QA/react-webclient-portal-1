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
import ApigeeDetailedReportsTable from "./ApigeeDetailedReportsTable";

function ApigeeReportsPipelineTable({ pipeline, dashboardData, kpiConfiguration }) {
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
      getTableTextColumn(getField(fields, "organization"), "organization"),
      getTableTextColumn(getField(fields, "environment"), "environment"),
      getTableTextColumn(getField(fields, "totalAssetsDeployed"), "totalAssetsDeployed"),
      getTableTextColumn(getField(fields, "newAssets"), "newAssets"),
      getTableTextColumn(getField(fields, "updatedAssets"), "updatedAssets")
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

  const loadPipelineData = async ( cancelSource = cancelTokenSource, filterDto = filterModel) => {
    setIsLoading(true);
    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    const response = await apigeeActions.getReport(
      getAccessToken,
      cancelSource,
      kpiConfiguration,
      dashboardTags,
      filterDto,
      pipeline?.pipelineId
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
        titleText={`APIGEE Detailed Report`}
        showToasts={true}
        isLoading={false}
      >
        <div className={"p-3"}>
          <ApigeeDetailedReportsTable kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} pipeline={pipeline} rowData={rowData?.original} />
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
      <div className={"px-2 pb-2"} style={{textAlign: 'end'}}><IconBase icon={faCircleInfo} className={'m-1'}/>On click of each row, detailed information of the report will be displayed.</div>
      <FilterContainer
        isLoading={isLoading}
        body={getTable()}
        className={"px-2 pb-2"}
        loadData={loadData}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
        showRefreshButton={false}
        supportSearch={true}
      />
    </div>
  );
}
ApigeeReportsPipelineTable.propTypes = {
  pipeline: PropTypes.object,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object
};
export default ApigeeReportsPipelineTable;
