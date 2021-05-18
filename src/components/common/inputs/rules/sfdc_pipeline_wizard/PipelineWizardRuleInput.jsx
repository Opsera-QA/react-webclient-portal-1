import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RuleTypeSelectInput from "components/common/list_of_values_input/workflow/wizard/rules/RuleTypeSelectInput";
import RuleValueMultiSelectInput
  from "components/common/list_of_values_input/workflow/wizard/rules/SfdcRuleValueMulitSelectInput";
import SfdcRuleFieldSelectInput from "components/common/list_of_values_input/workflow/wizard/rules/SfdcRuleFieldSelectInput";
import SfdcRuleComponentTypeMultiSelectInput
  from "components/common/list_of_values_input/workflow/wizard/rules/SfdcRuleComponentTypeMultiSelectInput";
import Model from "core/data_model/model";
import sfdcRuleMetadata from "components/common/inputs/rules/sfdc_pipeline_wizard/sfdc-rule-metadata";
import GitRuleFieldSelectInput
  from "components/common/list_of_values_input/workflow/wizard/rules/GitRuleFieldSelectInput";

function PipelineWizardRuleInput({ruleData, index, addRule, deleteRule, updateRule, postBody, modifiedFiles, isGitTab}) {
  const [ruleModel, setRuleModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [index, ruleData]);

  const loadData = () => {
    let newModel = new Model({...ruleData}, sfdcRuleMetadata, false);
    setRuleModel({...newModel});
  };

  const updateData = (newModel) => {
    setRuleModel(newModel);
    updateRule(index, newModel.getPersistData());
  };

  // TODO: When finalizing this design everywhere make own component
  const getDeleteRuleButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteRule(index)}>
        <span><FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/></span>
      </Button>
    );
  };

  // TODO: When finalizing this design everywhere make own component
  const getAddRuleButton = (index) => {
    return (
      <Button variant="link" onClick={() => addRule(index)}>
        <span><FontAwesomeIcon className="opsera-primary" icon={faPlus} fixedWidth/></span>
      </Button>
    );
  };

  const getRulesFieldComponent = () => {
    if (isGitTab === true) {
      return (<GitRuleFieldSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />);
    }

    return (<SfdcRuleFieldSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />);
  };

  if (ruleModel == null) {
    return null;
  }

  return (
    <Row className="d-flex mx-2 justify-content-between" key={index}>
      <Col sm={11} className={"px-0"}>
        <Row className={"mx-0"}>
          <Col xs={1}>
            <RuleTypeSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />
          </Col>
          <Col xs={4}>
            <SfdcRuleComponentTypeMultiSelectInput
              dataObject={ruleModel}
              setDataObject={updateData}
              showLabel={false}
              postBody={postBody}
              sfdcModified={modifiedFiles}
            />
          </Col>
          <Col xs={2}>
            {getRulesFieldComponent()}
          </Col>
          <Col xs={4}>
            <RuleValueMultiSelectInput
              ruleField={ruleModel?.getData("field")}
              dataObject={ruleModel}
              setDataObject={updateData}
              showLabel={false}
              sfdcModified={modifiedFiles}
              postBody={postBody}
              componentTypes={ruleModel?.getData("componentTypes")}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={1} className={"my-auto d-flex"}>
        {getAddRuleButton(index)}
        {getDeleteRuleButton(index)}
      </Col>
    </Row>
  );
}

PipelineWizardRuleInput.propTypes = {
  ruleData: PropTypes.object,
  index: PropTypes.number,
  addRule: PropTypes.func,
  deleteRule: PropTypes.func,
  updateRule: PropTypes.func,
  postBody: PropTypes.object,
  modifiedFiles: PropTypes.array,
  isGitTab: PropTypes.bool
};

export default PipelineWizardRuleInput;