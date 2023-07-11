import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faPlus, faTimes } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RuleTypeSelectInput from "components/common/list_of_values_input/rules/type/RuleTypeSelectInput";
import MergeSyncSfdcRuleFieldSelectInput from "./MergeSyncSfdcRuleFieldSelectInput";
import Model from "core/data_model/model";
import sfdcRuleMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/rules/sfdc-rule-metadata";
import MergeSyncGitRuleFieldSelectInput from "./MergeSyncGitRuleFieldSelectInput";
import SfdcPipelineWizardRuleFieldFilterSelectInput from "components/workflow/wizards/sfdc_pipeline_wizard/rules/SfdcPipelineWizardRuleFieldFilterSelectInput";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import IconBase from "components/common/icons/IconBase";
import MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput";

function MergeSyncTaskRuleInput({ wizardModel, ruleData, index, addRule, deleteRule, updateRule, fetchAttribute }) {
  const [ruleModel, setRuleModel] = useState(undefined);
  const isMounted = useRef(false);
  const [isSalesforce] = useState(wizardModel.getData("taskType") === "SFDC_GIT_COMPARE_SYNC" || (wizardModel.getData("taskType") === "GIT_VS_GIT_SYNC" && wizardModel.getData("configuration.git.isSalesforce")));

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [index, ruleData]);

  const loadData = () => {
    let newModel = new Model({ ...ruleData }, sfdcRuleMetadata, false);
    setRuleModel({ ...newModel });
  };

  const updateData = (newModel) => {
    setRuleModel(newModel);
    updateRule(index, newModel?.getPersistData());
  };

  // TODO: When finalizing this design everywhere make own component
  const getDeleteRuleButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteRule(index)}>
        <span><IconBase className={"danger-red"} icon={faTimes} /></span>
      </Button>
    );
  };

  // TODO: When finalizing this design everywhere make own component
  const getAddRuleButton = (index) => {
    return (
      <Button variant="link" onClick={() => addRule(index)}>
        <span><IconBase className={"opsera-primary"} icon={faPlus} /></span>
      </Button>
    );
  };

  const getRulesFieldComponent = () => {
    if (wizardModel.getData("taskType") === "GIT_VS_GIT_SYNC") {
      return (<MergeSyncGitRuleFieldSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} isSalesforce={wizardModel.getData("configuration.git.isSalesforce")} />);
    }

    return (<MergeSyncSfdcRuleFieldSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />);
  };

  const getRuleValueInput = () => {
    switch (ruleModel.getData("fieldFilter")) {
      case "startsWith":
      case "endsWith":
      case "contains":
        return (
          <MultiTextInputBase
            dataObject={ruleModel}
            setDataObject={updateData}
            fieldName={"values"}
            showLabel={false}
          />
        );
      case "equals":
      default:
        return (
          <MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput
            ruleFieldName={ruleModel?.getData("field")}
            fieldName="values"
            ruleModel={ruleModel}
            showLabel={false}
            setRuleModel={updateData}
            fetchAttribute={fetchAttribute}
            componentTypes={ruleModel?.getData("componentTypes")}
            pipelineStorageRecordId={wizardModel?.getData("recordId")}
          />
        );
    }
  };

  if (ruleModel == null) {
    return null;
  }

  return (
    <Row className="d-flex mx-2 justify-content-between" key={index}>
      <Col sm={12} className={"px-0"}>
        <Row className={"mx-0"}>
          <Col xs={isSalesforce ? 1 : 2} className={"pr-1 pl-0"}>
            <RuleTypeSelectInput
              model={ruleModel}
              setModel={updateData}
              showLabel={false}
            />
          </Col>
          {isSalesforce ?
            <Col xs={3} className={"px-0"}>
              <MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput
                ruleFieldName="componentType"
                fieldName="componentTypes"
                ruleModel={ruleModel}
                showLabel={false}
                setRuleModel={updateData}
                pipelineStorageRecordId={wizardModel?.getData("recordId")}
              />
            </Col>
            : null
          }
          <Col xs={isSalesforce ? 2 : 3} className={"px-1"}>
            {getRulesFieldComponent()}
          </Col>
          <Col xs={isSalesforce ? 2 : 3} className={"pl-0 pr-1"}>
            <SfdcPipelineWizardRuleFieldFilterSelectInput
              setModel={updateData}
              model={ruleModel}
              showLabel={false}
            />
          </Col>
          <Col xs={3} className={"px-0"}>
            {getRuleValueInput()}
          </Col>
          <Col xs={1} className={"my-auto d-flex"}>
            {getAddRuleButton(index)}
            {getDeleteRuleButton(index)}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

MergeSyncTaskRuleInput.propTypes = {
  ruleData: PropTypes.object,
  index: PropTypes.number,
  addRule: PropTypes.func,
  deleteRule: PropTypes.func,
  updateRule: PropTypes.func,
  fetchAttribute: PropTypes.string,
  isGitTab: PropTypes.bool,
  wizardModel: PropTypes.object
};

export default MergeSyncTaskRuleInput;
