import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ApprovalGatesActionableInsightTable from "./ApprovalGatesActionableInsightTable";
import chartsActions from "components/insights/charts/charts-actions";

function ApprovalGatesActionableInsightOverlay({ kpiConfiguration, dashboardData, request }) {
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState(undefined);

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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.approvalGatesTableData(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
      );
    //   const response = {
    //     "data": {
    //         "tool": "opsera",
    //         "data": [
    //             {
    //                 "slack" : 0.0,
    //                 "teams" : 1.0,
    //                 "email" : 0.0,
    //                 "jira" : 0.0,
    //                 "servicenow" : 0.0,
    //                 "_id" : "624f4031fc6c320012391641",
    //                 "pipeline_name": "Blank Template (Vignesh)",
    //                 "count_of_approval_gates" : 1.0,
    //                 "last_run" : "2022-04-08T17:48:48.935+0000",
    //                 "last_run_in_day": "120 days back"
    //             }
    //         ],
    //         count: 12,
    //         "status": 200,
    //         "status_text": "OK"
    //     }
    // };
      let dataObject = response?.data ? response?.data : { data: [], count: [{ count: 0 }] };
      let newFilterDto = filterDto;

      newFilterDto.setData("totalCount", dataObject?.count[0]?.count);
      setFilterModel({ ...newFilterDto });

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject?.data);
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

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Approval Gates`}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        123456
        <ApprovalGatesActionableInsightTable
          isLoading={isLoading}
          metrics={metrics}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

ApprovalGatesActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  request: PropTypes.string,
};

export default ApprovalGatesActionableInsightOverlay;
