import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import DataBlockBoxContainer from "../../../common/metrics/data_blocks/DataBlockBoxContainer";
import {AuthContext} from "../../../../contexts/AuthContext";
import axios from "axios";
import LoadingDialog from "../../../common/status_notifications/loading";
import {parseError} from "../../../common/helpers/error-helpers";
import GitCustodianVulnerabilityTypesChart from "./bar_chart/git_custodian_vulnerability_types_chart/GitCustodianVulnerabilityTypesChart";
import GitCustodianTopRepositoriesChart from "../charts/pie_chart/git_custodian_top_repositories_chart/gitCustodianTopRepositoriesChart";
import GitCustodianTopAuthorsChart
  from "../charts/bar_chart/git_custodian_top_authors_chart/gitCustodianTopAuthorsChart";
import GitCustodianTotalRepositoriesChart
  from "./pie_chart/git_custodian_top_clean_repositories_chart/gitCustodianTotalRepositoriesChart";
import GitCustodianTimelineChart from "../charts/line_chart/git_custodian_timeline_chart/gitCustodianTimelineChart";
import chartsActions from "../../charts/charts-actions";


function GitCustodianChartsView({ gitCustodianData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [chartData, setChartData] = useState([]);

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
  }, [gitCustodianData]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getChartsData(cancelSource);
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

  const getChartsData = async (cancelSource) => {
    const chartsDataResponse = await chartsActions.getGitCustodianChartsData(
      getAccessToken,
      cancelSource,
      gitCustodianData
    );
    const chartsResponse = chartsDataResponse?.data?.data?.data?.[0];
    if(chartsResponse) {
      setChartData(chartsResponse);
    }
  };
  const timeLineData = chartData?.trend ? [{
      "id": "No of Issues added",
      "data": chartData?.trend,
      "color": "#5B5851"
    }] : [{
    "id": "No of Issues added",
    "data": [],
    "color": "#5B5851"
  }];
  const getCharts = () => {
    return (
      <div style={{overflowX: 'auto'}} className={"p-2"}>
        <div style={{display: 'flex', width: '100%'}}>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>CLEAN REPOSITORIES</div>
              <GitCustodianTotalRepositoriesChart dashboardData={gitCustodianData} data={chartData?.cleanRepos ? chartData?.cleanRepos : []}/>
            </DataBlockBoxContainer>
          </Col>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>ISSUES</div>
              <GitCustodianTimelineChart dashboardData={gitCustodianData} data={timeLineData}/>
            </DataBlockBoxContainer>
          </Col>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>VULNERABILITY TYPES</div>
              <GitCustodianVulnerabilityTypesChart dashboardData={gitCustodianData} data={chartData?.vulnerability_types ? chartData?.vulnerability_types : []}/>
            </DataBlockBoxContainer>
          </Col>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>REPOSITORIES</div>
              <GitCustodianTopRepositoriesChart dashboardData={gitCustodianData} data={chartData?.topRepos ? chartData?.topRepos : []}/>
            </DataBlockBoxContainer>
          </Col>
          <Col sm={6} md={4} className={'p-1'}>
            <DataBlockBoxContainer showBorder={true}>
              <div className={"p-2 light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>TOP USERS</div>
              <GitCustodianTopAuthorsChart dashboardData={gitCustodianData} data={chartData?.topAuthors ? chartData?.topAuthors : []}/>
            </DataBlockBoxContainer>
          </Col>
        </div>
      </div>
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    if (error) {
      return (
        <div className="mx-2" >
          <div className="max-content-width p-5 mt-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className={"-5"}>There was an error loading the data: {parseError(error?.message)}. Please check logs for more details.</span>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-2">
        {getCharts()}
      </div>
    );
  };

  return (getBody());
}

GitCustodianChartsView.propTypes = {
  gitCustodianData: PropTypes.object,
};

export default GitCustodianChartsView;
