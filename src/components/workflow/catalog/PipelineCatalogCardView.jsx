import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";
import PipelineTemplateCatalogItem from "components/workflow/catalog/PipelineTemplateCatalogItem";

function PipelineCatalogCardView({ data, catalogFilterModel, setCatalogFilterModel, loadData, isLoading, accessRoleData, activeTemplates }) {
  const getCards = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return (
      <Row className="mx-0" >
        {data.map((template, idx) => (
          <Col xl={6} lg={12} key={idx} className="p-2">
            <PipelineTemplateCatalogItem
              template={template}
              accessRoleData={accessRoleData}
              activeTemplates={activeTemplates}
            />
          </Col>))}
      </Row>
    );
  };

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setCatalogFilterModel}
      paginationDto={catalogFilterModel}
      cards={getCards()}
      noDataMessage={"No Catalog Items Found"}
    />
  );
}

PipelineCatalogCardView.propTypes = {
  data: PropTypes.array,
  catalogFilterModel: PropTypes.object,
  setCatalogFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  accessRoleData: PropTypes.object,
  activeTemplates: PropTypes.array
};

export default PipelineCatalogCardView;