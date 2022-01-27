import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";
import SonarSummaryCard from "./SonarSummaryCard";

function SonarCardView({ data, sonarDataFilterDto, setSonarDataFilterDto, loadData, isLoading, type }) {
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
              <SonarSummaryCard sonarData={metric} loadData={loadData} type={type} />
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
      paginationDto={sonarDataFilterDto}
      setPaginationDto={setSonarDataFilterDto}
      cards={getCards()}
    />
  );
}

SonarCardView.propTypes = {
  data: PropTypes.array,
  sonarDataFilterDto: PropTypes.object,
  setSonarDataFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};

export default SonarCardView;
