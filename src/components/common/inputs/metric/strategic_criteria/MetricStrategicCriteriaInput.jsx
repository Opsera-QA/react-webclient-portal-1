import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faFilter} from "@fortawesome/pro-light-svg-icons";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import PipelineWizardRuleInput from "components/workflow/wizards/sfdc_pipeline_wizard/rules/PipelineWizardRuleInput";
import sfdcRuleMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/rules/sfdc-rule-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconBase from "components/common/icons/IconBase";

// TODO: On final refactor of SFDC Wizard, utilize model/set models here
function MetricStrategicCriteriaInput({pipelineWizardModel, setPipelineWizardModel, fieldName, modifiedFiles, isGitTab, isLoading, filePullCompleted, fetchAttribute}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [rules, setRules] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [filePullCompleted]);

  const loadData = () => {
    let currentData = pipelineWizardModel?.getData(fieldName);

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
    pipelineWizardModel.setData(fieldName, [...newPropertyList]);
    setPipelineWizardModel({...pipelineWizardModel});
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
          <div className="text-muted my-3">No rules have been added</div>
        </div>
      );
    }

    return (
      <div>
        {rules.map((ruleData, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <PipelineWizardRuleInput
                index={index}
                addRule={addRule}
                deleteRule={deleteRule}
                ruleData={ruleData}
                pipelineWizardModel={pipelineWizardModel}
                updateRule={updateRule}
                fetchAttribute={fetchAttribute}
                modifiedFiles={modifiedFiles}
                isGitTab={isGitTab}
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
        <Col xs={1} className={"pr-1 pl-0 my-auto"}>
          Type
        </Col>
        <Col xs={3} className={"px-0 my-auto"}>
          Component Type
        </Col>
        <Col xs={2} className={"px-1 my-auto"}>
          Field
        </Col>
        <Col xs={2} className={"px-1 my-auto"}>
          Filter
        </Col>
        <Col xs={4} className={"px-0 my-auto"}>
          Value
        </Col>
      </Row>
    );
  };

  const getBody = () => {
    if (!filePullCompleted) {
      return (
        <div className="rules-input">
          <div className="text-center text-muted pt-3"><IconBase className={"mr-2"} isLoading={!filePullCompleted} />Waiting on File Pull to Complete</div>
        </div>
      );
    }

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
      isLoading={!filePullCompleted || isLoading}
      titleText={"File Selection Rule Filter"}
      errorMessage={errorMessage}
    >
      {getBody()}
    </PropertyInputContainer>
  );
}

MetricStrategicCriteriaInput.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  fieldName: PropTypes.string,
  modifiedFiles: PropTypes.array,
  isGitTab: PropTypes.bool,
  isLoading: PropTypes.bool,
  filePullCompleted: PropTypes.bool,
  fetchAttribute: PropTypes.string
};

export default MetricStrategicCriteriaInput;