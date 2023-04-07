import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import { AuthContext } from "contexts/AuthContext";
import {
  getDeploymentStageFromKpiConfiguration,
  getResultFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
  MATURITY_SCORE_TEXT
} from "../charts-helpers";
import doraActions from "../dora/dora.action";
import { MaturityScoreItemType } from './maturityScoreItemType';
import SystemDrivenMaturityTimelineChart from './SystemDrivenMaturityTimelineChart';
import SystemDrivenMaturityChart from './SystemDrivenMaturityChart';

function SystemDrivenMaturityGroupsTab ({ kpiConfiguration, dashboardData, orgTag, onSelectGroup }) {
  const [groups, setGroups] = useState(null);

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

      console.log({ selectedDeploymentStages, jiraResolutionNames, useDashboardTags, dashboardOrgs, dashboardTags });

      if (selectedDeploymentStages && jiraResolutionNames?.length && useDashboardTags && dashboardOrgs?.length) {
        const response = await doraActions.systemDrivenMaturityGroups({
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          jiraResolutionNames
        });

        // const response = {
        //   data: {
        //     data: [
        //       {
        //         name: "Org Tag One",
        //         score: MATURITY_SCORE_TEXT.HIGH,
        //         previousScore: MATURITY_SCORE_TEXT.MEDIUM
        //       },
        //       {
        //         name: "Org Tag Two",
        //         score: MATURITY_SCORE_TEXT.MEDIUM,
        //         previousScore: MATURITY_SCORE_TEXT.MEDIUM
        //       },
        //       {
        //         name: "Org Tag Three",
        //         score: MATURITY_SCORE_TEXT.LOW,
        //         previousScore: MATURITY_SCORE_TEXT.MEDIUM
        //       },
        //       {
        //         name: "Org Tag Four",
        //         score: MATURITY_SCORE_TEXT.ELITE,
        //         previousScore: MATURITY_SCORE_TEXT.LOW
        //       }
        //     ]
        //   }
        // };

        const groups = response?.data?.groups;

        if (isMounted?.current === true && groups?.length) {
          setMetricData(
            groups.map(({ name, overallMaturityScoreText }) => ({
              name,
              score: overallMaturityScoreText,
              previousScore: MATURITY_SCORE_TEXT.LOW
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

  if (isLoading) {
    return (
      <h3 className='text-center'>Loading...</h3>
    );
  }

  if (error) {
    return (
      <h3>Error occured: {error?.message}</h3>
    );
  }

  return (
    <Container>
      <SystemDrivenMaturityTimelineChart />
      <div style={{ fontSize: '2rem' }}>
        <SystemDrivenMaturityChart items={metricData} onRowSelect={onSelectGroup} />
      </div>
    </Container>
  );
}

SystemDrivenMaturityGroupsTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  orgTag: MaturityScoreItemType,
  onSelectGroup: PropTypes.func
};

export default SystemDrivenMaturityGroupsTab;