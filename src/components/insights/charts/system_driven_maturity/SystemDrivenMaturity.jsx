import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import SystemDrivenMaturityHelpDocumentation from "components/common/help/documentation/insights/charts/SystemDrivenMaturityHelpDocumentation";
import {
  getDeploymentStageFromKpiConfiguration,
  getResultFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration
} from "../charts-helpers";
import doraActions from "../dora/dora.action";
import SystemDrivenMaturityChart from './SystemDrivenMaturityChart';
import SystemDrivenMaturityOverlay from "./SystemDrivenMaturityOverlay";

function SystemDrivenMaturity ({ kpiConfiguration, dashboardData, index, setKpiConfiguration, setKpis }) {
  const toastContext = useContext(DialogToastContext);

  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      const selectedDeploymentStages = getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
      const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
      const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

      if (selectedDeploymentStages && jiraResolutionNames?.length && useDashboardTags && dashboardOrgs?.length) {
        const response = await doraActions.systemDrivenMaturityGroups({
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          jiraResolutionNames
        });

        const maturityScores = response?.data?.data;

        if (isMounted?.current === true && Object.keys(maturityScores).length) {
          setMetricData(
            maturityScores.map(({ name, overallMaturityScoreText, previousOverallMaturityScoreText }) => ({
              name,
              score: overallMaturityScoreText,
              previousScore: previousOverallMaturityScoreText
            }))
          );
        } else {
          setMetricData([]);
        }
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

  const onRowSelect = group => {
    toastContext.showOverlayPanel(
      <SystemDrivenMaturityOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        group={group}
      />
    );
  };

  const getChartBody = () => {
    return (
      <Container className="p-3" style={{fontSize: '2rem'}}>
        <SystemDrivenMaturityChart items={metricData} onRowSelect={onRowSelect} />
      </Container>
    );
  };

  return (
    <VanityMetricContainer
      title={"System Driven Maturity"}
      kpiConfiguration={kpiConfiguration}
      setKpiConfiguration={setKpiConfiguration}
      chart={getChartBody()}
      dashboardData={dashboardData}
      index={index}
      error={error}
      setKpis={setKpis}
      isLoading={isLoading}
      chartHelpComponent={(closeHelpPanel) => (
        <SystemDrivenMaturityHelpDocumentation onClose={closeHelpPanel} />
      )}
    />
  );
}

SystemDrivenMaturity.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SystemDrivenMaturity;