import React, {useEffect, useState} from "react";
import DateRangeInputBase from "components/common/inputs/date/range/DateRangeInputBase";
import SalesforceComponentTypeMultiSelectInput
  from "components/insights/lookup/filters/SalesforceComponentTypeMultiSelectInput";
import TasksSelectInput from "./filters/TasksSelectInput";
import OrgsSelectInput from "./filters/OrgsSelectInput";
import PipelineSelectInput from "./filters/PipelineSelectInput";
import SalesforceComponentNameMultiSelectInput
  from "components/insights/lookup/filters/SalesforceComponentNameMultiSelectInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import FilterSelectionOverlayContainer from "components/common/filters/buttons/FilterSelectionOverlayContainer";

export default function SalesforceLookupFilters(
  {
    loadDataFunction,
    salesforceLookupFilterModel,
    salesforceComponentNames,
  }) {
  const [filterModel, setFilterModel] = useState(undefined);

  useEffect(() => {
    setFilterModel(salesforceLookupFilterModel?.clone());
  }, [salesforceLookupFilterModel]);


  if (filterModel == null || setFilterModel == null || loadDataFunction == null) {
    return null;
  }

  return (
    <FilterSelectionOverlayContainer
      filterModel={filterModel}
      loadDataFunction={loadDataFunction}
    >
      <Row>
        <Col xs={12}>
          <DateRangeInputBase
            model={filterModel}
            setModel={setFilterModel}
          />
        </Col>
        <Col xs={12}>
          <SalesforceComponentTypeMultiSelectInput
            fieldName={"selectedComponentFilterData"}
            model={filterModel}
            setModel={setFilterModel}
            className={"mx-2"}
          />
        </Col>
        <Col xs={12}>
          <SalesforceComponentNameMultiSelectInput
            fieldName={"selectedComponentNames"}
            model={filterModel}
            setModel={setFilterModel}
            className={"mx-2"}
            data={salesforceComponentNames}
          />
        </Col>
        <Col xs={12}>
          <PipelineSelectInput
            fieldName={"pipelineComponentFilterData"}
            model={filterModel}
            setModel={setFilterModel}
            className={"mx-2"}
          />
        </Col>
        {/*<Col xs={12}>*/}
        {/*  <TasksSelectInput*/}
        {/*    fieldName={"tasksComponentFilterData"}*/}
        {/*    model={filterModel}*/}
        {/*    setModel={setFilterModel}*/}
        {/*    className={"mx-2"}*/}
        {/*  />*/}
        {/*</Col>*/}
        <Col xs={12}>
          <OrgsSelectInput
            fieldName={"orgsComponentFilterData"}
            model={filterModel}
            setModel={setFilterModel}
            className={"mx-2"}
          />
        </Col>
        {/*<Col xs={12}>*/}
        {/*  <AnalyticsSalesforceComponentNameMultiSelectInput*/}
        {/*    fieldName={"selectedComponentNames"}*/}
        {/*    model={filterModel}*/}
        {/*    setModel={setFilterModel}*/}
        {/*  />*/}
        {/*</Col>*/}
      </Row>
    </FilterSelectionOverlayContainer>
  );
}

SalesforceLookupFilters.propTypes = {
  loadDataFunction: PropTypes.func,
  salesforceLookupFilterModel: PropTypes.object,
  salesforceComponentNames: PropTypes.array,
};
