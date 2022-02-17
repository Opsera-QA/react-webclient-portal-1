import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";

import projectWiseUnitTestResultsMetadata from "./project-wise-unit-test-results-metadata";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ModalLogs from "components/common/modal/modalLogs";
import ProjectWiseUnitTestResultCardView from "../card/ProjectWiseUnitTestResultCardView";

function ProjectWiseUnitTestResults({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const fields = projectWiseUnitTestResultsMetadata.fields;
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
      const response = {
        data: { 
          "status": 200,
          "status_text": "ES Pipeline Summary Query Results",
          "message": "ES Query Response from Living Connection",
          "data": [
              {
                "githubTimeTakenToCompleteMergeRequestReviewAndPushTime": {
                    "tool": "github",
                    "data": [
                      {
                          "_id": 819940634,
                          "tests":0,
                          "test_success_density":12,
                          "test_failures":10,
                          "skipped_tests":10,
                          "test_errors":10,
                          "test_execution_time":'10 Mins',
                          "name": 'Test Bucket String Test Bucket String Test',
                          "run_count":10,
                          "ProjectName": "github-webhook",
                      },
                      {
                          "_id": 691676316,
                          "tests":0,
                          "test_success_density":12,
                          "test_failures":10,
                          "skipped_tests":10,
                          "test_errors":10,
                          "test_execution_time":'10 Mins',
                          "name": 'Test bucket string',
                          "run_count":10,
                          "ProjectName": "github-webhook",
                      },
                      {
                          "_id": 621439232,
                          "tests":0,
                          "test_success_density": 12,
                          "test_failures": 10,
                          "skipped_tests": 10,
                          "test_errors": 10,
                          "test_execution_time": '10 Mins',
                          "name": 'Test bucket string',
                          "run_count": 10,
                          "ProjectName": "github-webhook",
                      },
                    ],
                    "length": 3,
                    "status": 200,
                    "status_text": "OK",
                    "count": 17
                }
              }
            ]
          }
        };

      let dataObject = response?.data?.data[0]?.githubTimeTakenToCompleteMergeRequestReviewAndPushTime?.data;
      dataObject = dataObject.map(item => ({...item, status: '-'}));
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          response?.data?.data[0]?.githubTimeTakenToCompleteMergeRequestReviewAndPushTime?.count
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
      <ProjectWiseUnitTestResultCardView
        mergeRequestDataFilterDto={tableFilterDto}
        setMergeRequestDataFilterDto={setTableFilterDto}
        isLoading={isLoading}
        data={metrics}
        loadData={loadData}
      />
    );
  };

  return (
    <div>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getCardView()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        tableChart={true}
      />
      <ModalLogs
        header="Project Wise unit Test Results"
        size="lg"
        jsonMessage={modalData}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

ProjectWiseUnitTestResults.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default ProjectWiseUnitTestResults;
