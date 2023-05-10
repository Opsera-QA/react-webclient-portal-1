import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import { getDateObjectFromKpiConfiguration } from "components/insights/charts/charts-helpers";
import { AuthContext } from "contexts/AuthContext";
import { getResultFromKpiConfiguration } from "../charts-helpers";
import doraActions from "../dora/dora.action";
import { MaturityScoreItemType } from './maturityScoreItemType';
import SystemDrivenMaturityTimelineChart from './SystemDrivenMaturityTimelineChart';
import SystemDrivenMaturityChart from './SystemDrivenMaturityChart';
import { formatForSDMTimelineChart, formatMaturityScoreItems } from './util';
import {Col, Row} from "react-bootstrap";

function SystemDrivenMaturityOrgTagsTab ({ kpiConfiguration, dashboardData, group, onSelect, getLegends }) {
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
        group
      });

      const { orgTags, chartData } = response?.data;

      if (isMounted?.current === true) {
        if (orgTags?.length) {
          setMetricData(formatMaturityScoreItems(orgTags)); 
        }

        if (chartData) {
          const { ltfc, df, mttr, cfr } = chartData;
          setMaturityChartData([
            {
              id: 'LTFC',
              data: formatForSDMTimelineChart(ltfc),
            },
            {
              id: 'DF',
              data: formatForSDMTimelineChart(df),
            },
            {
              id: 'MTTR',
              data: formatForSDMTimelineChart(mttr),
            },
            {
              id: 'CFR',
              data: formatForSDMTimelineChart(cfr),
            }
          ]);
        }
      } else {
        setMetricData([]);
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

  const dateRangeLabel = getDateObjectFromKpiConfiguration(kpiConfiguration)?.label;

  return (
    <Container>
      <h5 className='text-muted'>{dateRangeLabel}</h5>
      <div style={{ height: '15rem' }}>
        <SystemDrivenMaturityTimelineChart data={maturityChartData} />
      </div>
      <div style={{ fontSize: '2rem' }}>
        <Row>
          <Col xs={9} sm={9} md={9} lg={9} xl={9}>
            <SystemDrivenMaturityChart items={metricData} onRowSelect={onSelect} />
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            {getLegends(metricData)}
          </Col>
        </Row>

      </div>
    </Container>
  );
}

SystemDrivenMaturityOrgTagsTab.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  group: MaturityScoreItemType,
  onSelect: PropTypes.func,
  getLegends: PropTypes.func,
};

export default SystemDrivenMaturityOrgTagsTab;