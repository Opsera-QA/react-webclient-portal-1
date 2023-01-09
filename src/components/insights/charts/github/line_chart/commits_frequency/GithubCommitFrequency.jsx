import React, { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import GitlabDeployFrequencyChartHelpDocumentation from "components/common/help/documentation/insights/charts/GitlabDeployFrequencyChartHelpDocumentation";
import chartsActions from "components/insights/charts/charts-actions";
import { getDateObjectFromKpiConfiguration } from "components/insights/charts/charts-helpers";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import { AuthContext } from "contexts/AuthContext";
import useIsMountedStateReference from "hooks/useIsMountedStateReference";
import GithubCommitFrequencyDataBlock from "./GithubCommitFrequencyDataBlock";
import GithubCommitFrequencyLineChartContainer from './GithubCommitFrequencyLineChartContainer';
import moment from "moment";

// const getMonthDifference = (startDate, endDate) => {
//   return (
//     endDate.getMonth() -
//     startDate.getMonth() +
//     12 * (endDate.getFullYear() - startDate.getFullYear())
//   );
// };

function GithubCommitFrequency({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const isMounted = useIsMountedStateReference();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const [totalCount, setTotalCount] = useState(null);
  const [authorWithMostCommits, setAuthorWithMostCommits] = useState(null);
  const [minCommitRepository, setMinCommitRepository] = useState(null);
  const [minCommitRepositoryValue, setMinCommitRepositoryValue] = useState(null);
  const [maxCommitRepository, setMaxCommitRepository] = useState(null);
  const [maxCommitRepositoryValue, setMaxCommitRepositoryValue] = useState(null);
  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
    };
  },[]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const { data, status} = await chartsActions.getGithubCommitFrequency({
        getAccessToken,
        cancelTokenSource: cancelSource,
        kpiConfiguration
      });

      if (status !== 200 || !data) {
        throw new Error('Invalid API response');
      }

      // determine totals commits per time unit
      const commits = {};

      const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);

      const startDate = moment(dateRange.start);
      const endDate = moment(dateRange.end);

      // TODO: create buckets of dates based on length of date range
      // <= 8 days, days
      // <= 91 days, weeks
      // <= 366 days, months

      let dateUnit = "days";
      const dateDifference = endDate.diff(startDate, "days");

      if (dateDifference <= 8) {
        dateUnit = "days";
      } else if (dateDifference <= 91) {
        dateUnit = "week";
      } else {
        dateUnit = "month";
      }

      // const firstBucket = dateUnit === 'days' ? startDate : moment(startDate).add(1, dateUnit);


      for (let date = startDate; date.isBefore(endDate); date.add(1, dateUnit)) {
        commits[date.format("YYYY-MM-DD")] = {
          total: 0,
          title: '0 commits',
          byRepo: {}
        };
      }

      if (!commits[endDate.format("YYYY-MM-DD")]) {
        commits[endDate.format("YYYY-MM-DD")] = {
          total: 0,
          title: '0 commits',
          byRepo: {}
        };
      }
      
      data.byDate.forEach(({ _id: { year, month, day, repositoryId, repositoryName }, count }) => {
        const date = `${year}-${month}-${day}`;

        let previousDate = startDate.format("YYYY-MM-DD");
        let dateBucket = null;

        for (let bucket of Object.keys(commits)) {
          const bucketDate = moment(bucket);

          if (moment(date).isSameOrBefore(bucketDate)) {
            dateBucket = bucket;
            break;
          }

          previousDate = bucket;
        }

        commits[dateBucket].total += count;

        commits[dateBucket].title = `${commits[dateBucket].total} total commits ${dateUnit !== "days" ? `between ${previousDate} and` : 'on'} ${dateBucket}`;

        if (commits[dateBucket].byRepo[repositoryId]) {
          commits[dateBucket].byRepo[repositoryId].count += count;
        } else {
          commits[dateBucket].byRepo[repositoryId] = {
            name: repositoryName,
            count
          };
        }
      });

      const formattedChartDate = Object.keys(commits).map(date => ({
        x: date,
        y: commits[date].total,
        byRepo: commits[date].byRepo,
        title: commits[date].title
      }));

      setChartData(formattedChartDate);

      setTotalCount(data && data.total.length > 0 ? data.total[0].totalCount : 0);

      // determine author with most commits
      let maxAuthorCommits = Number.MIN_SAFE_INTEGER;
      let authorWithMaxCommits = null;
      for (const author of data.byAuthor) {
        if (author.count > maxAuthorCommits) {
          maxAuthorCommits = author.count;
          authorWithMaxCommits = author._id;
        }
      }
      setAuthorWithMostCommits(authorWithMaxCommits);

      // determine repostiory with max and min commits
      let minRepositoryCommits = Number.MAX_SAFE_INTEGER;
      let maxRepositoryCommits = Number.MIN_SAFE_INTEGER;
      let repositoryWithMinCommits = null;
      let repositoryWithMaxCommits = null;
      for (const repository of data.byRepo) {
        if (repository.count < minRepositoryCommits) {
          minRepositoryCommits = repository.count;
          repositoryWithMinCommits = repository.repositoryName;
        }
        if (repository.count > maxRepositoryCommits) {
          maxRepositoryCommits = repository.count;
          repositoryWithMaxCommits = repository.repositoryName;
        }
      }
      minRepositoryCommits = minRepositoryCommits === Number.MAX_SAFE_INTEGER ? 0 : minRepositoryCommits;
      maxRepositoryCommits = maxRepositoryCommits === Number.MIN_SAFE_INTEGER ? 0 : maxRepositoryCommits;
      setMinCommitRepository(repositoryWithMinCommits);
      setMinCommitRepositoryValue(minRepositoryCommits);
      setMaxCommitRepository(repositoryWithMaxCommits);
      setMaxCommitRepositoryValue(maxRepositoryCommits);
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

  const getChartBody = () => {
    if (!chartData) {
      return null;
    }
    return (
      <div className="new-chart m-3 p-0">
        <Row className={"w-100"}>
          <Row className={"mb-2 d-flex justify-content-center"}>
            <Col className={"mx-2"}>
              <GithubCommitFrequencyDataBlock
                value={totalCount}
                topText={"Total Commits"}
              />
            </Col>
            <Col className={"mx-2"}>
              <GithubCommitFrequencyDataBlock
                value={authorWithMostCommits}
                topText={"Most active contributor"}
                bottomText={"By Commits"}
              />
            </Col>
            <Col className={"mx-2"}>
              <GithubCommitFrequencyDataBlock
                value={minCommitRepository}
                topText={"Repository with minimum commits"}
                bottomText={minCommitRepositoryValue}
              />
            </Col>
            <Col className={"mx-2"}>
              <GithubCommitFrequencyDataBlock
                value={maxCommitRepository}
                topText={"Repository with maximum commits"}
                bottomText={maxCommitRepositoryValue}
              />
            </Col>
          </Row>
          <Col xs={12} className={"my-2 p-0 d-flex flex-column align-items-end"}>
            <GithubCommitFrequencyLineChartContainer data={chartData} />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <VanityMetricContainer
      title={"Github Commit Frequency"}
      kpiConfiguration={kpiConfiguration}
      setKpiConfiguration={setKpiConfiguration}
      chart={getChartBody()}
      loadChart={loadData}
      dashboardData={dashboardData}
      index={index}
      error={error}
      setKpis={setKpis}
      isLoading={isLoading}
      chartHelpComponent={(closeHelpPanel) => (
        <GitlabDeployFrequencyChartHelpDocumentation
          closeHelpPanel={closeHelpPanel}
        />
      )}
    />
  );
}

GithubCommitFrequency.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GithubCommitFrequency;
