import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import FilterContainer from "components/common/table/FilterContainer";
import GitScrapperCardView from "./card/GitScrapperCardView";

import gitScrapperPipelineFilterMetadata from "../git-scrapper-pipeline-filter-metadata";


function GitScrapperActionableInsightOverlay({ title, gitScrapperType, kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [dataScorecardMetrics, setDataScorecardMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...gitScrapperPipelineFilterMetadata.newObjectFields }, gitScrapperPipelineFilterMetadata, false)
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
  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;

      let responseRepoScorecardBlockValues;

      if (gitScrapperType === 'totalNumberofIssues') {
        responseRepoScorecardBlockValues = await chartsActions.getGitScraperIssues(
          kpiConfiguration,
          getAccessToken,
          cancelSource,
          dashboardTags,
          dashboardOrgs
        );
      } else {
        responseRepoScorecardBlockValues = await chartsActions.getGitScraperCleanRepos(
          kpiConfiguration,
          getAccessToken,
          cancelSource,
          dashboardTags,
          dashboardOrgs
        );
      }

      const dataObjectRepoScorecardDataBlocks = responseRepoScorecardBlockValues?.data && responseRepoScorecardBlockValues?.status === 200 ? 
                                                  responseRepoScorecardBlockValues?.data?.data?.data : [];

      if (isMounted?.current === true && dataObjectRepoScorecardDataBlocks) {
        setDataScorecardMetrics(dataObjectRepoScorecardDataBlocks);

        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          responseRepoScorecardBlockValues?.data?.data[0]?.data?.length
        );
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

  const getCardView = () => {
    return (
      <GitScrapperCardView
        gitScrapperDataFilterDto={tableFilterDto}
        setGitScrapperDataFilterDto={setTableFilterDto}
        isLoading={isLoading}
        data={dataScorecardMetrics}
        loadData={loadData}
        type={gitScrapperType}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  const getFilterContainer = () => {
    return (
      <FilterContainer
        filterDto={tableFilterDto}
        setFilterDto={setTableFilterDto}
        body={getCardView()}
        isLoading={isLoading}
        loadData={loadData}
        supportSearch={true}
      />
    );
  };
  

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={title}
      showToasts={true}
      titleIcon={faTable}
      isLoading={isLoading}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        {getDateRange()}
        {getFilterContainer()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitScrapperActionableInsightOverlay.propTypes = {
  title: PropTypes.string,
  gitScrapperSeverity: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  gitScrapperType: PropTypes.string
};

export default GitScrapperActionableInsightOverlay;
