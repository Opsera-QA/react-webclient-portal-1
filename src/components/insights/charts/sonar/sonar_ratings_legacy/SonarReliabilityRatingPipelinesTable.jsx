import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import CustomTable from "components/common/table/CustomTable";
import {AuthContext} from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import {
  getLimitedTableTextColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import chartsActions from "components/insights/charts/charts-actions";
import SonarBugsMetricScorecardMetaData from "components/insights/charts/sonar/table/bugs-scorecard/SonarBugsMetricScorecardMetaData";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import FilterContainer from "components/common/table/FilterContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";

function SonarReliabilityRatingPipelinesTable({ dashboardData, kpiConfiguration }) {
  const toastContext = useContext(DialogToastContext);
  const fields = SonarBugsMetricScorecardMetaData.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, SonarBugsMetricScorecardMetaData, false)
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

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(<BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.run_count} />);
  };

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarBugsCodeBasedMetricScorecard",
        kpiConfiguration,
        dashboardTags,
        filterDto
      );
      let dataObject = response?.data?.data[0]?.sonarBugsCodeBasedMetricScorecard?.data[0]?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          response?.data?.data[0]?.sonarBugsCodeBasedMetricScorecard?.data[0]?.count[0]?.count
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

  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "run_count")),
      getLimitedTableTextColumn(getField(fields, "projectName"), 20),
      getLimitedTableTextColumn(getField(fields, "pipelineName"), 20),
      getTableDateTimeColumn(getField(fields, "timestamp")),
      getTableTextColumn(getField(fields, "sonarLatestMeasureValue")),
    ],
    []
  );

  const getChartTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={tableFilterDto}
      setFilterDto={setTableFilterDto}
      isLoading={isLoading}
      body={getChartTable()}
      metadata={genericChartFilterMetadata}
      titleIcon={faTable}
      title={"Sonar Pipelines"}
    />
  );
}

SonarReliabilityRatingPipelinesTable.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
};

export default SonarReliabilityRatingPipelinesTable;