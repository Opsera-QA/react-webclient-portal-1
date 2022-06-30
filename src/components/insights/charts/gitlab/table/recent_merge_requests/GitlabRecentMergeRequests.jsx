import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {
  getLimitedTableTextColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import gitlabRecentMergeRequestsMetadata from "components/insights/charts/gitlab/table/recent_merge_requests/gitlab-recent-merge-requests-metadata.js";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ModalLogs from "components/common/modal/modalLogs";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
// import DeploymentAnalyticsTable from "components/insights/charts/deployment_analytics/DeploymentAnalyticsTable";
import GitlabRecentMergeRequestsTable from "./GitlabRecentMergeRequestsTable";

function GitlabRecentMergeRequests({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const fields = gitlabRecentMergeRequestsMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const [projectInfo, setProjectInfo] = useState([]);
  const [activeTab,setActiveTab] =useState();

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

  const loadProjectInfo = async (cancelSource = cancelTokenSource,filterDto=tableFilterDto) => {
    let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
          ]?.value;
    let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
          ]?.value;
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "gitlabProjects",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
      );

    setProjectInfo(response?.data?.data[0]?.gitlabProjects?.data);
    if(response?.data?.data[0]?.data && response?.data?.data[0]?.gitlabProjects.data.length>0){
      setActiveTab(response?.data?.data[0]?.gitlabProjects.data?.data[0].ProjectName);
    }
  };


  const loadData = async (
    cancelSource = cancelTokenSource
  ) => {
    try {
      setIsLoading(true);
      await loadProjectInfo(cancelSource);
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

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getTable = () => {
    if (!projectInfo || projectInfo.length === 0) {
      return null;
    }
    return (
      <VanitySetTabViewContainer>
        {projectInfo.map((item) => (
          <VanitySetTabView
            key={item.ProjectName}
            tabKey={item.ProjectName}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          >
            <GitlabRecentMergeRequestsTable ProjectName={item.ProjectName} dashboardData={dashboardData} kpiConfiguration={kpiConfiguration} />
          </VanitySetTabView>
        ))}
      </VanitySetTabViewContainer>
    );
  };

  const getVerticalTabContainer = () => {
    if (!projectInfo || projectInfo.length === 0) {
      return null;
    }
    const tabs = [];
    if (Array.isArray(projectInfo) && projectInfo.length > 0) {
      for (let i = 0; i <= projectInfo.length - 1; i++) {
        tabs.push(
          <VanitySetVerticalTab
            tabText={projectInfo[i]?.ProjectName}
            tabName={projectInfo[i]?.ProjectName} 
          />
        );
      }
    }
    return (
      <div className={"h-100"}>
        <div
          style={{ backgroundColor: "#F3F3F1", border: "1px solid #e4e4e4" }}
          className={"py-2 pl-4 w-100 px-2"}
        >
          <div>Project Name</div>
        </div>
        <VanitySetVerticalTabContainer className={"h-100"}>
          {tabs}
        </VanitySetVerticalTabContainer>
      </div>
    );
  };

  const getData = () => {
    if (!projectInfo || projectInfo.length === 0) {
      return null;
    }
    return (
      <VanitySetTabAndViewContainer
        className={"mb-3"}
        defaultActiveKey={projectInfo[0]?.ProjectName}
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getTable()}
        minimumHeight={'400px'}
        titleClassName={'d-none'}
      />
    );
  };

  return (
    <div>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getData()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        tableChart={true}
      />
      <ModalLogs
        header="Gitlab Recent Merge Requests"
        size="lg"
        jsonMessage={modalData}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

GitlabRecentMergeRequests.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitlabRecentMergeRequests;
