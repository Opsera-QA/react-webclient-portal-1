import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import SonarRatingCodeCoverageActionableInsightTable from "../sonar_ratings/actionable_insights/coverage/SonarRatingCodeCoverageActionableInsightTable";

function SonarCoverageActionableTable({ kpiConfiguration, dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [coverageData, setCoverageData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);

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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarCodeCoverageActionableInsights",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        undefined,
        dashboardOrgs,
        undefined,
        undefined,
        undefined,
        undefined
      );

      const metrics = response?.data.data[0].sonarCodeCoverageActionableInsights.data[0].data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setCoverageData(metrics);

        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data[0]?.sonarCodeCoverageActionableInsights?.data[0]?.count[0]?.count);
        setFilterModel({ ...newFilterDto });
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

  return (
      <div className={"p-3"}>
        <SonarRatingCodeCoverageActionableInsightTable
          isLoading={isLoading}
          coverageData={coverageData}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
        />
      </div>
  );
}

SonarCoverageActionableTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SonarCoverageActionableTable;
