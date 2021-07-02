import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faFilter, faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import PipelineWizardRuleInput from "components/workflow/wizards/sfdc_pipeline_wizard/rules/PipelineWizardRuleInput";
import sfdcRuleMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/rules/sfdc-rule-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PipelineWizardRuleInputHelpDocumentation
  from "components/common/help/documentation/pipelines/wizard/PipelineWizardRuleInputHelpDocumentation";
import ToggleHelpIcon from "components/common/icons/help/ToggleHelpIcon";

// TODO: On final refactor of SFDC Wizard, utilize model/set models here
function SfdcPipelineWizardRulesInputContainerBase({dataObject, setDataObject, fieldName, postBody, modifiedFiles, isGitTab, isLoading, filePullCompleted}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);
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
    let currentData = dataObject.getData(fieldName);

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

    if (JSON.stringify(newPropertyList) !== JSON.stringify(dataObject.getData(fieldName))) {
      dataObject.setData(fieldName, [...newPropertyList]);
      setDataObject({...dataObject});
    }
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
                updateRule={updateRule}
                postBody={postBody}
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
        <Col sm={11} className={"my-auto"}>
          <Row className={"mx-0"}>
            <Col xs={1} className={"pr-1 pl-0"}>
              Type
            </Col>
            <Col xs={4} className={"px-0"}>
              Component Filter
            </Col>
            <Col xs={2} className={"px-1"}>
              Field
            </Col>
            <Col xs={5} className={"px-0"}>
              Value
            </Col>
          </Row>
        </Col>
        <Col sm={1} />
      </Row>
    );
  };

  const getHelp = () => {
    if (showHelp) {
     return (
       <div className={"mt-3"}>
         <PropertyInputContainer
           titleIcon={faQuestionCircle}
           titleText={"File Selection Rule Filter Help Documentation"}
         >
           <div className={"p-3"}>
             <PipelineWizardRuleInputHelpDocumentation />
           </div>
         </PropertyInputContainer>
       </div>
     );
    }
  };

  const getBody = () => {
    if (!filePullCompleted) {
      return (
        <div className="rules-input">
          <div className="text-center text-muted pt-3">Waiting on File Pull to Complete</div>
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
    <>
      <PropertyInputContainer
        titleIcon={faFilter}
        field={null}
        isLoading={!filePullCompleted || isLoading}
        titleText={"File Selection Rule Filter"}
        errorMessage={errorMessage}
        toggleButton={<ToggleHelpIcon toggleHelp={() => setShowHelp(!showHelp)} className={"my-auto"} />}
      >
        {getBody()}
      </PropertyInputContainer>
      {getHelp()}
    </>
  );
}

SfdcPipelineWizardRulesInputContainerBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  postBody: PropTypes.object,
  modifiedFiles: PropTypes.array,
  isGitTab: PropTypes.bool,
  isLoading: PropTypes.bool,
  filePullCompleted: PropTypes.bool
};

export default SfdcPipelineWizardRulesInputContainerBase;