import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import BuildStatisticsActionableInsightsMetadata from "./build-statistics-actionable-insights-metadata";
import { getTableTextColumn, getTableTextColumnWithoutField } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass, faExternalLink } from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import TotalBuilds from "../data_blocks/TotalBuilds";
import SuccessfulBuildsDeployments from "../data_blocks/SuccessfulBuildsDeployments";
import FailedBuildsDeployments from "../data_blocks/FailedBuildsDeployments";
import AverageDuration from "../data_blocks/AverageDuration";
import AverageDurationToResolve from "../data_blocks/AverageDurationToResolve";
import TotalDurationToResolve from "../data_blocks/TotalDurationToResolve";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import IconBase from "components/common/icons/IconBase";

function BuildStatisticsActionableInsightsTable({ kpiConfiguration, dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [buildStatsData, setBuildStatsData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [buildSummaryData, setBuildSummaryData] = useState(undefined);

  const noDataMessage = "Opsera Build Statistics report is currently unavailable at this time";

  const fields = BuildStatisticsActionableInsightsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipelineName")),
      getTableTextColumn(getField(fields, "total")),
      getTableTextColumn(getField(fields, "success")),
      getTableTextColumn(getField(fields, "failure")),
      getTableTextColumn(getField(fields, "duration")),
      getTableTextColumn(getField(fields, "timeToResolve")),
      getTableTextColumnWithoutField("Actions", "_blueprint"),
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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "opseraBuildActionableInsights",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs
      );

      if (isMounted?.current === true && response?.status === 200) {
        const buildData = response?.data?.data[0]?.opseraBuildActionableInsights?.data[0]?.data;

        await setBuildStatsData(
          buildData.map((bd, index) => ({
            ...bd,
            _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
          }))
        );
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          response?.data?.data[0]?.opseraBuildActionableInsights?.data[0]?.count[0]?.count
        );
        setTableFilterDto({ ...newFilterDto });
        setBuildSummaryData(response?.data?.data[0]?.opseraBuildActionableInsights?.data[0]?.summaryData[0]);
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

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const getBody = () => {
    return (
      <>
        {getDateRange()}
        {getBuildSummaryDetails()}
        <FilterContainer
          isLoading={isLoading}
          title={`Opsera Build Statistics Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}
          className={"px-2 pb-2"}
        />
      </>
    );
  };

  const getBuildSummaryDetails = () => {
    if (!buildSummaryData) {
      return null;
    }
    return (
      <Row className="pb-3 px-2">
        <Col lg={4} md={6} className="mt-3">
          <TotalBuilds displayValue={buildSummaryData?.total} displayText="Total Builds" />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <SuccessfulBuildsDeployments displayValue={buildSummaryData?.success} displayText="Successful Builds" />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <FailedBuildsDeployments displayValue={buildSummaryData?.failure} displayText="Failed Builds" />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <AverageDuration displayValue={buildSummaryData?.avgDuration} />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <AverageDurationToResolve displayValue={buildSummaryData?.avgTimeToResolve} />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <TotalDurationToResolve displayValue={buildSummaryData?.timeToResolve} />
        </Col>
      </Row>
    );
  };

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount} />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={buildStatsData}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        onRowSelect={onRowSelect}
      />
    );
  };

  return <>{getBody()}</>;
}

BuildStatisticsActionableInsightsTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default BuildStatisticsActionableInsightsTable;
