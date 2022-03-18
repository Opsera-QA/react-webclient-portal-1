import React, {useContext, useEffect, useRef, useState} from "react";
import { Row, Col, Container} from "react-bootstrap";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import { getTimeDisplay } from "../github_actions-utility";
import DeploymentFrequencyStatisticsDataBlockContainer
  from "../bar_chart/metrics/deployment_frequency_statistics/DeploymentFrequencyStatisticsDataBlockContainer";
import LeadTimeAndReleaseDurationDeployMetric from "../bar_chart/metrics/deploy/LeadTimeAndReleaseDurationDeployMetric";

function LeadTimeAndReleaseDurationDataBlockContainer({ data, kpiConfiguration, dashboardData, meanData, countData, metric, statisticsData, chartData }) {
  console.log('LeadTimeAndReleaseDurationDataBlockContainer data', data);
  console.log('LeadTimeAndReleaseDurationDataBlockContainer rest', meanData, countData, metric, statisticsData, chartData);
  let className = `p-2 dark-gray-text-primary`;

  return (
    <>
      <HorizontalDataBlocksContainer title={"Metrics Total"} className="mt-4">
        <Row className="px-4 w-100">
          <Col lg={3} md={6} className={"my-3"}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock 
                score={data.total_commits} 
                subtitle={"Total Commits"}
                className={className}  
              />
            </DataBlockBoxContainer>
          </Col>
          <Col lg={3} md={6} className={"my-3"}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                score={data.total_repo_changes}
                subtitle={"Total Repo Changes"}
                className={className}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col lg={3} md={6} className={"my-3"}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                score={data.total_merges}
                subtitle={"Total Merges"}
                className={className}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col lg={3} md={6} className={"my-3"}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock 
                score={data.total_deployments} 
                subtitle={"Total Deployments"} 
                className={className} 
              />
            </DataBlockBoxContainer>
          </Col>
        </Row>
      </HorizontalDataBlocksContainer>

      <HorizontalDataBlocksContainer title={"Metrics Average"} className="mt-3">
        <Row className="px-4 w-100">
          <Col lg={3} md={6} className={"my-3"}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                score={getTimeDisplay(data.mean_time_to_build)}
                subtitle={"Average Time to Build"}
                className={className}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col lg={3} md={6} className={"my-3"}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                score={getTimeDisplay(data.mean_time_to_commit)}
                subtitle={"Average Time to Commit"}
                className={className}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col lg={3} md={6} className={"my-3"}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                score={getTimeDisplay(data.mean_time_to_merge)}
                subtitle={"Average Time to Merge"}
                className={className}
              />
            </DataBlockBoxContainer>
          </Col>
          <Col lg={3} md={6} className={"my-3"}>
            <DataBlockBoxContainer showBorder={true}>
              <TwoLineScoreDataBlock
                score={getTimeDisplay(data.mean_time_to_deploy)}
                subtitle={"Average Time to Deploy"}
                className={className}
              />
            </DataBlockBoxContainer>
          </Col>
        </Row>
      </HorizontalDataBlocksContainer>

      {/* <HorizontalDataBlocksContainer title={"Deployment Frequency"} className="mt-4">
        <div className="new-chart mb-3 pointer" style={{ minHeight: "200px", display: "flex" }}>
          <Row className="mr-1">
            <Col xs={12} className={"px-0"}>
              <DeploymentFrequencyStatisticsDataBlockContainer
                metricData={statisticsData}
                chartData={chartData}
                goalsData={1}
                kpiConfiguration={kpiConfiguration}
              />
            </Col>
          </Row>
        </div>
      </HorizontalDataBlocksContainer> */}
      <Row className="mr-1 mt-4">
        <Col xs={12}>
          <DeploymentFrequencyStatisticsDataBlockContainer
            metricData={statisticsData}
            chartData={chartData}
            goalsData={1}
            kpiConfiguration={kpiConfiguration}
          />
        </Col>
      </Row>

      <HorizontalDataBlocksContainer title={"Deployment Duration"} className="mt-3">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} className={"pt-2"}>
              <LeadTimeAndReleaseDurationDeployMetric
                metric={metric}
                kpiConfiguration={kpiConfiguration}
                meanData={meanData}
                countData={countData}
                goalsData={123}
                dashboardData={dashboardData}
              />
            </Col>
          </Row>
      </Container>
      </HorizontalDataBlocksContainer>
    </>
  );
}

LeadTimeAndReleaseDurationDataBlockContainer.propTypes = {
  data: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
  statisticsData: PropTypes.array,
  chartData: PropTypes.array,
};

export default LeadTimeAndReleaseDurationDataBlockContainer;
