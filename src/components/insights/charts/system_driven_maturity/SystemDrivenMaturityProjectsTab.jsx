import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import { AuthContext } from "contexts/AuthContext";
import { getResultFromKpiConfiguration } from "../charts-helpers";
import doraActions from "../dora/dora.action";
import { MaturityScoreItemType } from './maturityScoreItemType';
import SystemDrivenMaturityTimelineChart from './SystemDrivenMaturityTimelineChart';

function SystemDrivenMaturityProjectsTab ({ kpiConfiguration, dashboardData, orgTag }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [maturityChartData, setMaturityChartData] = useState(null);
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
      const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');

      const response = await doraActions.systemDrivenMaturityProjects({
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
        jiraResolutionNames,
        orgTag
      });

      const { chartData } = response?.data;

      if (isMounted?.current === true && chartData) {
        const { ltfc, df, mttr, cfr } = chartData;
        setMaturityChartData([
          {
            id: 'LTFC',
            data: ltfc.map(({ x, sdmScore, sdmScoreText, range }) => ({ x, y: sdmScore, sdmScoreText, range })),
          },
          {
            id: 'DF',
            data: df.map(({ x, sdmScore, sdmScoreText, range }) => ({ x, y: sdmScore, sdmScoreText, range })),
          },
          {
            id: 'MTTR',
            data: mttr.map(({ x, sdmScore, sdmScoreText, range }) => ({ x, y: sdmScore, sdmScoreText, range })),
          },
          {
            id: 'CFR',
            data: cfr.map(({ x, sdmScore, sdmScoreText, range }) => ({ x, y: sdmScore, sdmScoreText, range })),
          }
        ]);
      } else {
        setMaturityChartData([]);
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

  if (isLoading) {
    return (
      <h3 className='text-center'>Loading...</h3>
    );
  }

  if (error) {
    return (
      <h3 className='text-center'>Error occured: {error?.message}</h3>
    );
  }

  return (
    <Container style={{ height: '15rem' }}>
      <SystemDrivenMaturityTimelineChart data={maturityChartData} />
    </Container>
  );
}

SystemDrivenMaturityProjectsTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  orgTag: MaturityScoreItemType,
};

export default SystemDrivenMaturityProjectsTab;