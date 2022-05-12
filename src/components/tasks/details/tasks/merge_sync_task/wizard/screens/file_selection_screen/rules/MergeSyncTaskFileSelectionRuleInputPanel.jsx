import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RuleTypeSelectInput from "components/common/list_of_values_input/rules/type/RuleTypeSelectInput";
import Model from "core/data_model/model";
import GitToGitMergeSyncTaskFileSelectionFieldSelectInput
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/file_selection/GitToGitMergeSyncTaskFileSelectionFieldSelectInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import RuleFilterTypeSelectInput
  from "components/common/list_of_values_input/rules/filter_type/RuleFilterTypeSelectInput";
import InfoText from "components/common/inputs/info_text/InfoText";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput";
import {
  mergeSyncTaskFileSelectionRuleMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/mergeSyncTaskFileSelectionRule.metadata";
import { TASK_TYPES } from "components/tasks/task.types";
import SalesforceToGitMergeSyncTaskFileSelectionFieldSelectInput
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/file_selection/SalesforceToGitMergeSyncTaskFileSelectionFieldSelectInput";
import MergeSyncTaskFileSelectionFieldSelectInput
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/file_selection/MergeSyncTaskFileSelectionFieldSelectInput";

function MergeSyncTaskFileSelectionRuleInputPanel(
  {
    wizardModel,
    ruleData,
    index,
    deleteRuleFunction,
    updateRuleFunction,
    errorMessage,
  }) {
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
    const newModel = new Model({...ruleData}, mergeSyncTaskFileSelectionRuleMetadata, false);
    setRuleModel({...newModel});
  };

  const updateData = (newModel) => {
    setRuleModel(newModel);
    updateRuleFunction({...newModel?.getPersistData()});
  };

  const getRuleValueInput = () => {
    switch (ruleModel.getData("fieldFilter")) {
      case "startsWith":
      case "endsWith":
      case "contains":
        return (
          <MultiTextListInputBase
            model={ruleModel}
            setModel={updateData}
            fieldName={"values"}
          />
        );
      case "equals":
      default:
        return (
          <MergeSyncTaskWizardFileSelectorRuleValueMultiSelectInput
            ruleFieldName={ruleModel?.getData("field")}
            ruleModel={ruleModel}
            setRuleModel={updateData}
            pipelineStorageRecordId={wizardModel?.getData("recordId")}
          />
        );
    }
  };

  if (ruleModel == null) {
    return null;
  }

  return (
    <div className={"mt-2 mx-3"}>
      <Row>
        <Col xs={4}>
          <RuleTypeSelectInput
            model={ruleModel}
            setModel={updateData}
          />
        </Col>
        <Col xs={4}>
          <MergeSyncTaskFileSelectionFieldSelectInput
            model={ruleModel}
            setModel={setRuleModel}
            taskType={wizardModel?.getData("taskType")}
          />
        </Col>
        <Col xs={4}>
          <RuleFilterTypeSelectInput
            setModel={updateData}
            model={ruleModel}
            fieldName={"fieldFilter"}
          />
        </Col>
        <Col xs={12}>
          {getRuleValueInput()}
        </Col>
      </Row>
      <ButtonContainerBase
        leftSideButtons={
          <div className={"mt-auto mr-2"}>
            <InfoText
              errorMessage={errorMessage}
            />
          </div>
        }
      >
        <DeleteButton
          dataObject={ruleModel}
          deleteRecord={deleteRuleFunction}
          buttonText={"Delete Rule"}
        />
      </ButtonContainerBase>
    </div>
  );
}

MergeSyncTaskFileSelectionRuleInputPanel.propTypes = {
  ruleData: PropTypes.object,
  index: PropTypes.number,
  deleteRuleFunction: PropTypes.func,
  updateRuleFunction: PropTypes.func,
  wizardModel: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default MergeSyncTaskFileSelectionRuleInputPanel;