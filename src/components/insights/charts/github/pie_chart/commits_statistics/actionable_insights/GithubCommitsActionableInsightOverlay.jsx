import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
// import { Col, Row } from "react-bootstrap";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";

import GithubCommitsActionableInsightTable from "./GithubCommitsActionableInsightTable";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";

function GithubCommitsActionableInsightOverlay({ kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("opened");
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);

  const [closedMetrics, setClosedMetrics] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );
  const [closedFilterModel, setClosedFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
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
      await loadOpenData();
      await loadClosedData();
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

  const loadOpenData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.getGithubPullRequestsMetrics(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs,
        filterDto,
        "opened"
      );
      let dataObject = response?.data ? response?.data?.pull_requests?.data[0]?.data : [];
      let dataCount = response?.data ? response?.data?.pull_requests?.data[0]?.count[0]?.count : 0;
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
  };

  const loadClosedData = async (cancelSource = cancelTokenSource, filterDto = closedFilterModel) => {
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.getGithubPullRequestsMetrics(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs,
        filterDto,
        "closed"
      );
      let dataObject = response?.data ? response?.data?.pull_requests?.data[0]?.data : [];
      let dataCount = response?.data ? response?.data?.pull_requests?.data[0]?.count[0]?.count : 0;
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setClosedFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && dataObject) {
        setClosedMetrics(dataObject);
      }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"Open Pull Requests"} handleTabClick={handleTabClick} tabName={"opened"} />
        <CustomTab activeTab={activeTab} tabText={"Closed Pull Requests"} handleTabClick={handleTabClick} tabName={"closed"} />
        <CustomTab activeTab={activeTab} tabText={"Contributors"} handleTabClick={handleTabClick} tabName={"contributors"} />
      </CustomTabContainer>
    );
  };

  const getBody = () => {
    if (activeTab == "opened") {
      return (
        <div className="p-2">
          <GithubCommitsActionableInsightTable
            data={metrics}
            isLoading={isLoading}
            loadData={loadData}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            title={"Open Pull Requests"}
            type={"open"}
          />
        </div>
      );
    }
    else if (activeTab == "closed") {
      return (
        <div className="p-2">
          <GithubCommitsActionableInsightTable
              data={closedMetrics}
              isLoading={isLoading}
              loadData={loadData}
              filterModel={closedFilterModel}
              setFilterModel={setClosedFilterModel}
              title={"Closed Pull Requests"}
              type={"closed"}
            />
        </div>
      );
    }  else {
      return (
        <div>-</div>
      );
    }
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Github Total commits"}
      showToasts={true}
      titleIcon={faTable}
      isLoading={isLoading}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        <TabPanelContainer currentView={getBody()} tabContainer={getTabContainer()} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubCommitsActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GithubCommitsActionableInsightOverlay;
