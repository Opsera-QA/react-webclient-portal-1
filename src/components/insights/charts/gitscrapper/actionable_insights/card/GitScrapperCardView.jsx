import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";
import GitScrapperSummaryCard from "./GitScrapperSummaryCard";
function GitScrapperCardView({ data, gitScrapperDataFilterDto, setGitScrapperDataFilterDto, type, loadData, isLoading, kpiConfiguration, dashboardData }) {

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
              <GitScrapperSummaryCard gitScrapperData={metric} type={type} kpiConfiguration={kpiConfiguration} dashboardData={dashboardData}
              />
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
      paginationDto={gitScrapperDataFilterDto}
      setPaginationDto={setGitScrapperDataFilterDto}
      cards={getCards()}
    />
  );
}

GitScrapperCardView.propTypes = {
  data: PropTypes.array,
  gitScrapperDataFilterDto: PropTypes.object,
  setGitScrapperDataFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GitScrapperCardView;
