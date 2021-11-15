import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faFilter} from "@fortawesome/pro-light-svg-icons";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import sfdcRuleMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/rules/sfdc-rule-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MetricStrategicCriteriaInputRow
  from "components/common/inputs/metric/strategic_criteria/MetricStrategicCriteriaInputRow";

function MetricStrategicCriteriaInput({model, setModel, fieldName, isLoading}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [rules, setRules] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = () => {
    let currentData = model?.getData(fieldName);

    let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];

    if (items.length === 0) {
      items.push({...sfdcRuleMetadata.newObjectFields});
    }

    setRules([...items]);
  };

  const validateAndSetData = (newPropertyList) => {
    let newArray = [];

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((property) => {
        newArray.push(property);
      });
    }

    if (newArray.length === 0) {
      newPropertyList.push({...sfdcRuleMetadata.newObjectFields});
    }

    setRules([...newPropertyList]);
    model.setData(fieldName, [...newPropertyList]);
    setModel({...model});
  };

  const updateRule = (index, rule) => {
    let newRules = [...rules];
    newRules[index] = rule;
    validateAndSetData(newRules);
  };

  const addRule = () => {
    let newPropertyList = rules;
    newPropertyList.push({...sfdcRuleMetadata.newObjectFields});
    validateAndSetData(newPropertyList);
  };

  const deleteRule = (index) => {
    let newPropertyList = [...rules];
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const getFieldBody = () => {
    if (!rules || rules.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted my-3">No strategic criteria rules have been added</div>
        </div>
      );
    }

    return (
      <div>
        {rules.map((ruleData, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <MetricStrategicCriteriaInputRow
                index={index}
                addRule={addRule}
                deleteRule={deleteRule}
                ruleData={ruleData}
                model={model}
                updateRule={updateRule}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <Row className="d-flex mx-1 py-1 justify-content-between">
        <Col xs={2} className={"pr-1 pl-0 my-auto"}>
          Type
        </Col>
        <Col xs={2} className={"px-0 my-auto"}>
          Trigger Criteria
        </Col>
        <Col xs={4} className={"px-1 my-auto"}>
          Value
        </Col>
      </Row>
    );
  };

  const getBody = () => {
    return (
      <div>
        <div className={"filter-bg-white"}>
          {getHeaderBar()}
        </div>
        <div className="rules-input">
          {getFieldBody()}
        </div>
      </div>
    );
  };

  return (
    <PropertyInputContainer
      titleIcon={faFilter}
      field={null}
      isLoading={isLoading}
      titleText={"Strategic Criteria"}
      errorMessage={errorMessage}
    >
      {getBody()}
    </PropertyInputContainer>
  );
}

MetricStrategicCriteriaInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MetricStrategicCriteriaInput;