import React from "react";
import PropTypes from "prop-types";
import CardView from "components/common/card/CardView";
import GitScraperActionableInsightsSummaryCard from "./GitScraperActionableInsightsSummaryCard";
import { Row, Col } from "react-bootstrap";

function GitScraperActionableInsightsCardView({ data, metadata, gitScraperDataFilterDto, setGitScraperDataFilterDto, loadData, isLoading }) {

  const getCards = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const metrics = [...data];

    return (
      <Row className="mx-0">
        {metrics.map((metric, index) => {
          return (
            <Col lg={12} className={"px-0"} key={index}>
              <GitScraperActionableInsightsSummaryCard gitScraperData={metric} />
            </Col>
          );
        })}
      </Row>      
    );
  };

  return (      
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      paginationDto={gitScraperDataFilterDto}
      setPaginationDto={setGitScraperDataFilterDto}
      cards={getCards()}
    /> 
  );
}

GitScraperActionableInsightsCardView.propTypes = {
  data: PropTypes.array,
  metadata: PropTypes.array,
  gitScraperDataFilterDto: PropTypes.object,
  setGitScraperDataFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GitScraperActionableInsightsCardView;
