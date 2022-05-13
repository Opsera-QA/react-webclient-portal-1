import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";

import {
  getLimitedTableTextColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import DeploymentAnalyticsMetadata from "./development-analysis-metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ModalLogs from "components/common/modal/modalLogs";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import DeploymentAnalyticsTable from "./DeploymentAnalyticsTable";

function DeploymentAnalytics({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const fields = DeploymentAnalyticsMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [activeTab,setActiveTab] =useState();
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...genericChartFilterMetadata.newObjectFields },
      genericChartFilterMetadata,
      false,
    ),
  );
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const [metadataInfo, setMetadataInfo] = useState([]);

  // const noDataMessage = "No Data is available for this chart at this time";

  const columns = useMemo(
    () => [
      getLimitedTableTextColumn(getField(fields, "destination"), 30),
      getTableTextColumn(getField(fields, "namespace")),
      getTableTextColumn(getField(fields, "pipelineId")),
      getTableTextColumn(getField(fields, "runCount")),
      getTableTextColumn(getField(fields, "status")),
      getTableTextColumn(getField(fields, "metadataName")),
      getLimitedTableTextColumn(getField(fields, "artifactoryName"), 20),
      getTableTextColumn(getField(fields, "pipelineName")),
      getTableTextColumn(getField(fields, "version")),
    ],
    [],
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

  const loadMetadataInfo = async (cancelSource = cancelTokenSource) => {
    const response = await chartsActions.getMetadataInfo(
      kpiConfiguration,
      getAccessToken,
      cancelSource,
    );
    setMetadataInfo(response?.data?.data);
    setActiveTab(response?.data?.data[0].metadataName);
  };

  const loadData = async (
    cancelSource = cancelTokenSource,
    filterDto = tableFilterDto,
  ) => {
    try {
      setIsLoading(true);
      await loadMetadataInfo(cancelSource);
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
    if (!metadataInfo || metadataInfo.length === 0) {
      return null;
    }
    return (
      <VanitySetTabViewContainer>
        {metadataInfo.map((item) => (
          <VanitySetTabView
            key={item.metadataName}
            tabKey={item.metadataName}
            
        handleTabClick={handleTabClick}
        activeTab={activeTab}
          >
            <DeploymentAnalyticsTable metadataName={item.metadataName} dashboardData={dashboardData} kpiConfiguration={kpiConfiguration} />
          </VanitySetTabView>
        ))}
      </VanitySetTabViewContainer>
    );
  };

  const getVerticalTabContainer = () => {
    if (!metadataInfo || metadataInfo.length === 0) {
      return null;
    }
    const tabs = [];
    if (Array.isArray(metadataInfo) && metadataInfo.length > 0) {
      for (let i = 0; i <= metadataInfo.length - 1; i++) {
        tabs.push(
          <VanitySetVerticalTab
            tabText={metadataInfo[i]?.metadataName}
            tabName={metadataInfo[i]?.metadataName} 
          />
        );
      }
    }
    return (
      <div className={"h-100"}>
        <div
          style={{ backgroundColor: "#F3F3F1", border: "1px solid #e4e4e4" }}
          className={"py-2 w-100 px-2"}
        >
          <div>Application Name</div>
        </div>
        <VanitySetVerticalTabContainer className={"h-100"}>
          {tabs}
        </VanitySetVerticalTabContainer>
      </div>
    );
  };

  const getData = () => {
    if (!metadataInfo || metadataInfo.length === 0) {
      return null;
    }
    return (
      <VanitySetTabAndViewContainer
        className={"mb-3"}
        defaultActiveKey={metadataInfo[0]?.metadataName}
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getTable()}
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
        header="Deployemnt Analysis"
        size="lg"
        jsonMessage={modalData}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

DeploymentAnalytics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default DeploymentAnalytics;
