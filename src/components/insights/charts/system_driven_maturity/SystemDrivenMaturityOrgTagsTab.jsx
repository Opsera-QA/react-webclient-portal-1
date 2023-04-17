import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import { AuthContext } from "contexts/AuthContext";
import { getResultFromKpiConfiguration } from "../charts-helpers";
import doraActions from "../dora/dora.action";
import { MaturityScoreItemType } from './maturityScoreItemType';
import SystemDrivenMaturityTimelineChart from './SystemDrivenMaturityTimelineChart';
import SystemDrivenMaturityChart from './SystemDrivenMaturityChart';

function SystemDrivenMaturityOrgTagsTab ({ kpiConfiguration, dashboardData, group, onSelectGroup }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState(null);
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

      const response = await doraActions.systemDrivenMaturityOrgTags({
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
        jiraResolutionNames,
        group: group?.name
      });

      const orgTags = response?.data?.orgTags;

      if (isMounted?.current === true && orgTags?.length) {
        setMetricData(
          orgTags.map(({ name, overallMaturityScoreText, previousOverallMaturityScoreText }) => ({
            name,
            score: overallMaturityScoreText,
            previousScore: previousOverallMaturityScoreText
          }))
        );
        setMaturityChartData([
          {
            id: 'df',
            data: [
              {
                x: '2023-01-01',
                y: 2.5,
                range: '2023-01-01 to 2023-01-31',
                sdmScore: 3,
                total: 5
              },
              {
                x: '2023-02-01',
                y: 1.5,
                range: '2023-02-01 to 2023-02-28',
                sdmScore: 2,
                total: 2
              }
            ]
          },
          {
            id: 'mttr',
            data: [
              {
                x: '2023-01-01',
                y: 0.5,
                range: '2023-01-01 to 2023-01-31',
                sdmScore: 1,
                total: 4
              },
              {
                x: '2023-02-01',
                y: 1.5,
                range: '2023-02-01 to 2023-02-28',
                sdmScore: 2,
                total: 2
              }
            ]
          },
          {
            id: 'cfr',
            data: [
              {
                x: '2023-01-01',
                y: 5.3,
                range: '2023-01-01 to 2023-01-31',
                sdmScore: 4,
                total: 1
              },
              {
                x: '2023-02-01',
                y: 3.5,
                range: '2023-02-01 to 2023-02-28',
                sdmScore: 4,
                total: 2
              }
            ]
          }
        ]);
      } else {
        setMetricData([]);
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
    <Container>
      <div style={{ height: '15rem' }}>
        <SystemDrivenMaturityTimelineChart data={maturityChartData} />
      </div>
      <div style={{ fontSize: '2rem' }}>
        <SystemDrivenMaturityChart items={metricData} onRowSelect={onSelectGroup} />
      </div>
    </Container>
  );
}

SystemDrivenMaturityOrgTagsTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  group: MaturityScoreItemType,
  onSelectGroup: PropTypes.func
};

export default SystemDrivenMaturityOrgTagsTab;