import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {
  getExternalLinkIconColumnDefinition,
  getLimitedTableTextColumn,
  getTableDateTimeColumn, getTableDurationTextColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import gitlabRecentMergeRequestsMetadata from "./gitlab-recent-merge-requests-metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import TabAndViewContainer from "../../../../../common/tabs/tree/TabTreeAndViewContainer";
import FilterContainer from "../../../../../common/table/FilterContainer";
import { ANALYTICS_TEXT_CONSTANTS } from "../../../../../common/constants/text/analytics/analytics.text.constants";
import GitlabRecentMergeRequestVerticalTabContainer from "./GitlabRecentMergeRequestVerticalTabContainer";
import gitlabActions from "../../gitlab.action";

function GitlabRecentMergeRequests({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const fields = gitlabRecentMergeRequestsMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...gitlabRecentMergeRequestsMetadata.newObjectFields },
      gitlabRecentMergeRequestsMetadata,
      false,
    ),
  );
  const [metrics, setMetrics] = useState([]);
  const [activeTab, setActiveTab] = useState();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "AuthorName"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "AssigneeName")),
      getLimitedTableTextColumn(getField(fields, "MergeRequestTitle"), 20),
      getLimitedTableTextColumn(getField(fields, "ProjectName"), 20),
      getLimitedTableTextColumn(getField(fields, "BranchName"), 20),
      getTableDateTimeColumn(getField(fields, "mrCompletionTimeTimeStamp")),
      getTableDurationTextColumn(getField(fields, "MergeRequestTimeTaken")),
      getTableTextColumn(getField(fields, "mrLastAction")),
      getExternalLinkIconColumnDefinition(
        getField(fields, "mergeRequestUrl"),
        "",
      ),
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

  const loadProjectInfo = async (
    cancelSource = cancelTokenSource,
    filterDto = tableFilterDto,
  ) => {
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
    let projectName;
    const search = filterDto.getData("search");
    if (!search) {
      projectName = filterDto.getData("projectName");
    }
    // This can be called only when there is an active tab selected in left panel or a valid search string.
    if(projectName || search) {
      const response = await gitlabActions.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          filterDto,
          projectName,
          dashboardOrgs
      );
      let dataObject =
          response?.data?.data
              ?.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime?.data;
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData(
            "totalCount",
            response?.data?.data
                ?.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime?.count,
        );
        setTableFilterDto({...newFilterDto});
      }
    }
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
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

  const handleTabClick = async (projectName) => {
    let newFilterDto = tableFilterDto;
    newFilterDto.setData("projectName", projectName);
    newFilterDto.setDefaultValue("search");
    newFilterDto.setDefaultValue("currentPage");
    setTableFilterDto({ ...newFilterDto });
    // if no projectName then right side table will be empty and api will not be called
    if (!projectName) {
      setMetrics([]);
    } else {
      setActiveTab(projectName);
      await loadData(null, newFilterDto);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <GitlabRecentMergeRequestVerticalTabContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        dashboardData={dashboardData}
        setKpis={setKpis}
        metric={metrics}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
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
        noDataMessage={ANALYTICS_TEXT_CONSTANTS.NO_CHART_DATA_MESSAGE}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
      />
    );
  };

  const getFilterContainer = () => {
    return (
      <TabAndViewContainer
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getTabContentContainer()}
        defaultActiveKey={
          metrics && Array.isArray(metrics) && metrics[0]?.id && metrics[0]?.id
        }
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
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        tableChart={true}
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
