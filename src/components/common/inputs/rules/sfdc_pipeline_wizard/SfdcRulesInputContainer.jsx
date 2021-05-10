import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faFilter} from "@fortawesome/pro-light-svg-icons";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import SfdcRuleInput from "components/common/inputs/rules/sfdc_pipeline_wizard/SfdcRuleInput";
import sfdcRuleMetadata from "components/common/inputs/rules/sfdc_pipeline_wizard/sfdc-rule-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RuleTypeSelectInput from "components/common/list_of_values_input/workflow/wizard/rules/RuleTypeSelectInput";
import RuleComponentRangeSelectInput
  from "components/common/list_of_values_input/workflow/wizard/rules/RuleComponentRangeSelectInput";
import RuleFieldSelectInput from "components/common/list_of_values_input/workflow/wizard/rules/RuleFieldSelectInput";
import RuleValueMultiSelectInput
  from "components/common/list_of_values_input/workflow/wizard/rules/RuleValueSelectInput";

// TODO: On final refactor of SFDC Wizard, utilize model/set models here
function SfdcRulesInputContainer({ruleList, setRuleList}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [rules, setRules] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [ruleList]);

  const loadData = () => {
    let currentData = ruleList;

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

    console.log("newPropertyList: " + JSON.stringify(newPropertyList));

    setRules([...newPropertyList]);
    setRuleList([...newPropertyList]);
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
    console.log("deleting index: " + index);
    let newPropertyList = [...rules];
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const getFieldBody = () => {
    if (!rules || rules.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted no-data-message">No rules have been added</div>
        </div>
      );
    }

    return (
      <div>
        {rules.map((ruleData, index) => {
          return (
            <SfdcRuleInput
              key={index}
              index={index}
              addRule={addRule}
              deleteRule={deleteRule}
              ruleData={ruleData}
              updateRule={updateRule}
            />
          );
        })}
      </div>
    );
  };

  const isPropertyComplete = (property) => {
    return !(property?.name === "" || property?.email === "");
  };

  const lastPropertyComplete = () => {
    let newPropertyList = rules;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return isPropertyComplete(lastObject);
  };

  const lastPropertyEdited = () => {
    let newPropertyList = rules;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return lastObject.name !== "" || lastObject.email !== "";
  };

  const getHeaderBar = () => {
    return (
      <Row className="d-flex mt-1 mx-2 justify-content-between">
        <Col sm={11} className={"px-0 my-auto"}>
          <Row className={"mx-0"}>
            <Col xs={3}>
              Type
            </Col>
            <Col xs={3}>
              Range
            </Col>
            <Col xs={3}>
              Field
            </Col>
            <Col xs={3}>
              Value
            </Col>
            {/*<Col>*/}
            {/*  <RuleComparisonSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />*/}
            {/*</Col>*/}
          </Row>
        </Col>
        <Col sm={1} />
      </Row>
    );
  };

  return (
    <>
      <PropertyInputContainer
        titleIcon={faFilter}
        field={null}
        titleText={"File Selection Rule Filter"}
        errorMessage={errorMessage}
      >
        <div>
          {getHeaderBar()}
        </div>
        <div className="properties-body-alt">
          {getFieldBody()}
        </div>
        {/*{getIncompletePropertyMessage()}*/}
      </PropertyInputContainer>
      <small className="text-muted form-text"><div>A file will be included if it meets all of these rules.</div></small>
    </>
  );
}

SfdcRulesInputContainer.propTypes = {
  ruleList: PropTypes.array,
  setRuleList: PropTypes.func,
};

export default SfdcRulesInputContainer;