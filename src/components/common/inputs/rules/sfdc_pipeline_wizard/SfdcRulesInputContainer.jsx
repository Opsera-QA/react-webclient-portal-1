import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faFilter} from "@fortawesome/pro-light-svg-icons";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import PipelineWizardRuleInput from "components/common/inputs/rules/sfdc_pipeline_wizard/PipelineWizardRuleInput";
import sfdcRuleMetadata from "components/common/inputs/rules/sfdc_pipeline_wizard/sfdc-rule-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// TODO: On final refactor of SFDC Wizard, utilize model/set models here
function SfdcRulesInputContainer({ruleList, setRuleList, postBody, modifiedFiles, isGitTab}) {
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
            <PipelineWizardRuleInput
              key={index}
              index={index}
              addRule={addRule}
              deleteRule={deleteRule}
              ruleData={ruleData}
              updateRule={updateRule}
              postBody={postBody}
              modifiedFiles={modifiedFiles}
              isGitTab={isGitTab}
            />
          );
        })}
      </div>
    );
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
              Component Filter
            </Col>
            <Col xs={3}>
              Field
            </Col>
            <Col xs={3}>
              Value
            </Col>
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
      </PropertyInputContainer>
      <small className="text-muted form-text"><div>A file will be included if it meets all of these rules.</div></small>
    </>
  );
}

SfdcRulesInputContainer.propTypes = {
  ruleList: PropTypes.array,
  setRuleList: PropTypes.func,
  postBody: PropTypes.object,
  modifiedFiles: PropTypes.array,
  isGitTab: PropTypes.bool
};

export default SfdcRulesInputContainer;