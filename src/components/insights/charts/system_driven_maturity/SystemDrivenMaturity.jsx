import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import InfoDialog from "components/common/status_notifications/info";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import SystemDrivenMaturityHelpDocumentation from "components/common/help/documentation/insights/charts/SystemDrivenMaturityHelpDocumentation";
import {
  getResultFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration
} from "../charts-helpers";
import doraActions from "../dora/dora.action";
import SystemDrivenMaturityChart from './SystemDrivenMaturityChart';
import SystemDrivenMaturityOverlay from "./SystemDrivenMaturityOverlay";
import { formatMaturityScoreItems } from "./util";
import IconBase from "../../../common/icons/IconBase";
import {faCircle} from "@fortawesome/pro-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

function SystemDrivenMaturity ({ kpiConfiguration, dashboardData, index, setKpiConfiguration, setKpis }) {
  const toastContext = useContext(DialogToastContext);

  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);
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
      const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

      if (useDashboardTags && dashboardOrgs?.length) {
        const response = await doraActions.systemDrivenMaturityGroups({
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          jiraResolutionNames
        });

        const { groups } = response?.data;
        const { orgsData } = response?.data;
        if (isMounted?.current === true && Object.keys(groups).length) {
          setMetricData(formatMaturityScoreItems(groups));
          setOrganizationData(orgsData);
        } else {
          setMetricData([]);
          setOrganizationData([]);
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
    const orgData = {
      orgTags: [],
      chartData: []
    };
    organizationData?.map(org => {
      if(org?.groupName === group?.name){
        orgData.orgTags.push(org?.orgTags);
        orgData.chartData.push(org?.chartData);
      }
    });
    toastContext.showOverlayPanel(
      <SystemDrivenMaturityOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        group={group}
        orgData={orgData}
        getLegends = {getLegends}
      />
    );
  };

  const getLegends = (items) => {
    if (!(items && items.length)) {
      return null;
    }
    return (
      <div
        className={"mr-2 mt-2"}
        style={{ float: "right", fontSize: "10px", fontWeight: 500 }}
      >
        <IconBase
          className={"ml-2"}
          icon={faCircle}
          iconColor={"green"}
          iconSize={"lg"}
        />
        Improved Maturity Score
        <div className="row" />
        <IconBase
          className={"ml-2"}
          icon={faCircle}
          iconColor={"red"}
          iconSize={"lg"}
        />
        Dropped Maturity Score
        <div className="row" />
        <IconBase
          className={"ml-2"}
          icon={faCircle}
          iconColor={"orange"}
          iconSize={"lg"}
        />
        No Changes to Maturity Score
        <div className="grey" />
        <IconBase
          className={"ml-2"}
          icon={faCircle}
          iconColor={"grey"}
          iconSize={"lg"}
        />
        Previous Maturity Score
      </div>
    );
  };

  const getChartBody = () => {
    const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);
    const dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
    if (!useDashboardTags || !dashboardOrgs?.length) {
      return (
        <Container className="text-center">
          <InfoDialog message="Missing Required Filters. Dashboard Organization tags are mandatory" />
        </Container>
      );
    }

    return (
      <Container className="p-3" style={{fontSize: '2rem'}}>
        <Row>
          <Col xs={9} sm={9} md={9} lg={9} xl={9}>
            <SystemDrivenMaturityChart items={metricData} onRowSelect={onRowSelect} />
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            {getLegends(metricData)}
          </Col>
        </Row>
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
      isBeta
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