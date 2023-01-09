import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import githubPendingMergeRequestsMetadata from "components/insights/charts/github/table/pending_merge_requests/github-pending-merge-requests-metadata.js";
import Model from "core/data_model/model";
import FilterContainer from "../../../../../common/table/FilterContainer";
import VanitySetTabViewContainer from "../../../../../common/tabs/vertical_tabs/VanitySetTabViewContainer";
import GithubPendingMergeRequestVerticalTabContainer from "./GithubPendingMergeRequestVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import {
  getLimitedTableTextColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import CustomTable from "../../../../../common/table/CustomTable";
import { getField } from "components/common/metadata/metadata-helpers";
import GithubPendingMergeRequestHelpDocumentation
  from "../../../../../common/help/documentation/insights/charts/github/GithubPendingMergeRequestHelpDocumentation";

function GithubPendingMergeRequests({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const fields = githubPendingMergeRequestsMetadata.fields;
  const [activeTab, setActiveTab] = useState();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...githubPendingMergeRequestsMetadata.newObjectFields  }, githubPendingMergeRequestsMetadata, false)
  );

  const noDataMessage = "No Data is available for this chart at this time";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "AuthorName"), "no-wrap-inline"),
      // getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "AssigneeName")),
      getLimitedTableTextColumn(getField(fields, "MergeRequestTitle"), 20),
      getLimitedTableTextColumn(getField(fields, "ProjectName"), 20),
      getLimitedTableTextColumn(getField(fields, "BranchName"), 20),
      getTableDateTimeColumn(getField(fields, "mrCompletionTimeTimeStamp")),
      getTableTextColumn(getField(fields, "mergeRequestUrl")),
    ],
    []
  );

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    if(activeTab){
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let dashboardFilters =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "hierarchyFilters")]
          ?.value;
      let projectName;
      if(!filterDto.getData('search')){
        projectName =filterDto.getData('projectName') ;
      }

      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubPendingMergeRequests",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        dashboardFilters,
        dashboardOrgs,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        projectName,
      );
      let dataObject = response?.data?.data[0]?.githubPendingMergeRequests?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data[0]?.githubPendingMergeRequests?.count);
        setTableFilterDto({ ...newFilterDto });
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
  const getVerticalTabContainer = () => {
    return <GithubPendingMergeRequestVerticalTabContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        dashboardData={dashboardData}
        setKpis={setKpis}
        metric={metrics}
        handleTabClick={handleTabClick}
        activeTab={activeTab}/>;
  };

  const getTabContentContainer = () => {
    return (
        <VanitySetTabViewContainer className={"mb-3"}>
          <FilterContainer
              filterDto={tableFilterDto}
              setFilterDto={setTableFilterDto}
              body={getBody()}
              isLoading={isLoading}
              loadData={loadData}
              supportSearch={true}
          />
        </VanitySetTabViewContainer>
    );
  };
  const getBody = () => {
    return (
      <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
      />
    );
  };

  const handleTabClick = async (projectName) => {
    let newFilterDto = tableFilterDto;
    newFilterDto.setData("projectName",projectName);
    newFilterDto.setDefaultValue("search");
    setTableFilterDto({ ...newFilterDto });
    // if no projectName then right side table will be empty and api will not be called
    if(!projectName){
      setMetrics([]);
    } else {
      setActiveTab(projectName);
      await loadData(cancelTokenSource,newFilterDto);
    }
  };
  const getFilterContainer = () => {
    return (
        <TabAndViewContainer
            verticalTabContainer={getVerticalTabContainer()}
            currentView={getTabContentContainer()}
            defaultActiveKey={metrics && Array.isArray(metrics) && metrics[0]?.id && metrics[0]?.id}
            bodyClassName="mx-0"
            maximumHeight="calc(100vh - 264px)"
            overflowYContainerStyle={"hidden"}
            overflowYBodyStyle="auto"
        />
    );
  };
  return (
    <div>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getFilterContainer()}
        loadChart={loadData}
        dashboardData={dashboardData}
        tableChart={true}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => <GithubPendingMergeRequestHelpDocumentation closeHelpPanel={closeHelpPanel} />}
      />
    </div>
  );
}

GithubPendingMergeRequests.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GithubPendingMergeRequests;
