import React, {useEffect, useContext, useState, useMemo, useRef} from "react";
import CustomTable from "components/common/table/CustomTable";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {
  getChartPipelineStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import gitlabMostActiveContributorsMetadata
  from "components/insights/charts/gitlab/table/most_active_contributors/gitlab-most-active-contributors-metadata.js";
import {getField} from "components/common/metadata/metadata-helpers";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function GitlabMostActiveContributors({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis}) {
  const fields = gitlabMostActiveContributorsMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const noDataMessage = "No Data is available for this chart at this time";

  const columns = useMemo(
    () => [
      {
        Header: "Author Name",
        accessor: "AuthorName",
        // class: "cell-center no-wrap-inline",
        Cell: function formatCell(row) {
          return (
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <div>
                <FontAwesomeIcon icon={faStar} className="cell-icon green" />
              </div>
              <div className="ml-1">{row.value}</div>
            </div>
          );
        },
      },
      getTableTextColumn(getField(fields, "commitCount")),
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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "gitlabMostActiveUsers", kpiConfiguration, dashboardTags);
      let dataObject = response?.data?.data[0]?.gitlabMostActiveUsers?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={<CustomTable columns={columns} data={metrics} noDataMessage={noDataMessage} noFooter={true}/>}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
      />
    </div>
  );
}

GitlabMostActiveContributors.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default GitlabMostActiveContributors;
