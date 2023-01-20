import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import ApprovalGatesActionableInsightTable from "../ApprovalGatesActionableInsightTable";
import approvalGatesChartsActions from "../../metrics/ApprovalGatesMetric.action";

function ApprovalGatesPiplelineDataTab({ pipeline_id, dashboardData, kpiConfiguration, icon, action, onRowSelect }) {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields, pageSize: 25 },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadContributors();
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

  const loadContributors = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    setIsLoading(true);
    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    let dashboardOrgs =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
        ?.value;
    const response = await approvalGatesChartsActions.approvalGatesTableData(
      getAccessToken,
      cancelSource,
      kpiConfiguration,
      dashboardTags,
      dashboardOrgs,
      filterDto,
      pipeline_id,
      action
    );
    let dataObject = response?.data ? response?.data?.data?.data : [];
    let dataCount = response?.data ? response?.data?.data?.count : 0;
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", dataCount);
    setFilterModel({ ...newFilterDto });
    if (isMounted?.current === true && dataObject) {
      setMetrics(dataObject);
    }
  };

  return (
    <div className={"p-2"}>
      <ApprovalGatesActionableInsightTable
        metrics={metrics}
        isLoading={isLoading}
        loadData={loadData}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        title={"Contributors"}
        tableTitleIcon={icon}
        onRowSelect={onRowSelect}
      />
    </div>
  );
}
ApprovalGatesPiplelineDataTab.propTypes = {
  pipeline_id: PropTypes.string,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object,
  action: PropTypes.string,
  onRowSelect: PropTypes.func
};
export default ApprovalGatesPiplelineDataTab;
