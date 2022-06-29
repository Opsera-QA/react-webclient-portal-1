import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";
import PendingMergeRequestSummaryCard from "./PendingMergeRequestSummaryCard";

function PendingMergeRequestCardView({ data, mergeRequestDataFilterDto, setMergeRequestDataFilterDto, loadData, isLoading }) {
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
              <PendingMergeRequestSummaryCard mergeRequestData={metric} loadData={loadData} />
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
      paginationDto={mergeRequestDataFilterDto}
      setPaginationDto={setMergeRequestDataFilterDto}
      cards={getCards()}
    />
  );
}

PendingMergeRequestCardView.propTypes = {
  data: PropTypes.array,
  mergeRequestDataFilterDto: PropTypes.object,
  setMergeRequestDataFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default PendingMergeRequestCardView;
