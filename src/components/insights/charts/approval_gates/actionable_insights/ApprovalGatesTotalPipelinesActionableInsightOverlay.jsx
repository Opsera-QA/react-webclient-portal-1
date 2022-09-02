import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import approvalGatesChartsActions from "../metrics/ApprovalGatesMetric.action";
import ApprovalGatesActionableInsightTotalPipelinesTable from "./ApprovalGatesActionableInsightTotalPipelinesTable";
import { metricHelpers } from "components/insights/metric.helpers";
import { useHistory } from "react-router-dom";

function ApprovalGatesTotalPipelinesActionableInsightOverlay({
  kpiConfiguration,
  dashboardData,
  request,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...genericChartFilterMetadata.newObjectFields },
      genericChartFilterMetadata,
      false,
    ),
  );
  const history  = useHistory();
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

  const loadData = async (
    cancelSource = cancelTokenSource,
    filterDto = filterModel,
  ) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      const response = await approvalGatesChartsActions.pipelinesWithApprovalgatesTableData(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
        filterDto,
      );

      let dataObject = response?.data
        ? response?.data?.data
        : { data: [], count: [{ count: 0 }] };
      let newFilterDto = filterDto;

      newFilterDto.setData("totalCount", dataObject?.count);
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

  const onRowSelect = (id) =>{
    closePanel();
    history.push(`/workflow/details/${(id)}/summary`);
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Approval Gates - Total Pipelines Executed`}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        <ApprovalGatesActionableInsightTotalPipelinesTable
          isLoading={isLoading}
          metrics={metrics}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
          onRowSelect={onRowSelect}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

ApprovalGatesTotalPipelinesActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  request: PropTypes.string,
};

export default ApprovalGatesTotalPipelinesActionableInsightOverlay;
