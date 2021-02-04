import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import RegistryToolCard from "components/common/fields/inventory/RegistryToolCard";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";

function ToolCardView({ data, toolFilterDto, setToolFilterDto, loadData, isLoading }) {
  const getCards = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return <></>;
    }

    return (
      <Row>
        {data.map((toolData, index) => (
          <Col key={index} sm={6} md={4} lg={2} className="p-1">
            <RegistryToolCard toolData={new Model({ ...toolData }, toolMetadata, false)}/>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <CardView
      title={"Tools"}
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setToolFilterDto}
      paginationDto={toolFilterDto}
      cards={getCards()}
    />
  );
}

ToolCardView.propTypes = {
  data: PropTypes.array,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ToolCardView;