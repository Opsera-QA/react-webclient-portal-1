import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {
  getChartTrendStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
  getLimitedTableTextColumn,
} from "components/common/table/table-column-helpers";
import SonarBugsMetricScorecardMetaData from "components/insights/charts/sonar/table/bugs-scorecard/SonarBugsMetricScorecardMetaData";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import sonarPipelineFilterMetadata from "components/insights/charts/sonar/table/sonar-pipeline-filter-metadata";
import { useHistory } from "react-router-dom";
import SonarCardView from "../../card/SonarCardView";
import FilterContainer from "components/common/table/FilterContainer";

function SonarBugsMetricScorecard({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const history = useHistory();
  const fields = SonarBugsMetricScorecardMetaData.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...sonarPipelineFilterMetadata.newObjectFields }, sonarPipelineFilterMetadata, false)
  );

  const noDataMessage = "No Data is available for this chart at this time";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "run_count")),
      getLimitedTableTextColumn(getField(fields, "projectName"), 20),
      getLimitedTableTextColumn(getField(fields, "pipelineName"), 20),
      getTableDateTimeColumn(getField(fields, "timestamp")),
      getChartTrendStatusColumn(getField(fields, "status")),
      getTableTextColumn(getField(fields, "sonarLatestMeasureValue")),
      getLimitedTableTextColumn(getField(fields, "sonarPrimaryLanguage"), 20),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData.original.pipelineId}/${rowData.original.run_count}`);
  };

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

  // const getChartTable = () => {
  //   return (
  //     <CustomTable
  //       columns={columns}
  //       data={metrics}
  //       noDataMessage={noDataMessage}
  //       paginationDto={tableFilterDto}
  //       setPaginationDto={setTableFilterDto}
  //       loadData={loadData}
  //       scrollOnLoad={false}
  //       onRowSelect={onRowSelect}
  //     />
  //   );
  // };

  const getCardView = () => {
    return (
      <SonarCardView
        sonarDataFilterDto={tableFilterDto}
        setSonarDataFilterDto={setTableFilterDto}
        isLoading={isLoading}
        data={metrics}
        loadData={loadData}
        type={"bugs"}
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

SonarBugsMetricScorecard.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SonarBugsMetricScorecard;
