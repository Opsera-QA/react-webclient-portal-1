import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { faFilter } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import InfoContainer from "components/common/containers/InfoContainer";
import MergeSyncTaskFileSelectionRuleInputPanel
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/MergeSyncTaskFileSelectionRuleInputPanel";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import {
  mergeSyncTaskFileSelectionRuleMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/mergeSyncTaskFileSelectionRule.metadata";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {
  MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/mergeSyncTaskWizardFileSelectorContainer.heights";

function MergeSyncTaskFileSelectionRulesInputContainer(
  {
    wizardModel,
    setWizardModel,
    fieldName,
    fileList,
    isLoading,
    filePullCompleted,
  }) {
  const [rules, setRules] = useState([]);
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState(`0`);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [filePullCompleted]);

  const loadData = () => {
    const unpackedRules = wizardModel?.getArrayData(fieldName);
    setRules([...unpackedRules]);
  };

  const validateAndSetData = (newPropertyList) => {
    const newRules = Array.isArray(newPropertyList) ? newPropertyList : [];
    setRules([...newRules]);
    wizardModel.setData(fieldName, [...newRules]);
    setWizardModel({...wizardModel});
  };

  const updateRuleFunction = (index, rule) => {
    const newRules = [...rules];
    newRules[index] = rule;
    validateAndSetData(newRules);
  };

  const addRuleFunction = () => {
    const newRules = rules;
    newRules.push({...mergeSyncTaskFileSelectionRuleMetadata.newObjectFields});
    validateAndSetData(newRules);
  };

  const deleteRuleFunction = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    validateAndSetData(newRules);
  };

  const getAddFieldButton = () => {
    return (
      <ButtonContainerBase>
        <NewRecordButton
          variant={"success"}
          addRecordFunction={addRuleFunction}
          type={"Rule"}
          customButtonText={"Add Rule"}
          size={"sm"}
          disabled={isAddAllowed() !== true}
        />
      </ButtonContainerBase>
    );
  };

  const isAddAllowed = () => {
    const incompleteFieldIndex = getFirstIncompleteFieldIndex();

    return isLoading === false && filePullCompleted === true && typeof incompleteFieldIndex !== "number";
  };

  const getFirstIncompleteFieldIndex = () => {
    if (rules.length === 0) {
      return null;
    }

    let incompleteIndex;

    rules.forEach((field, index) => {
      if (incompleteIndex !== undefined) {
        return;
      }

      const fieldComplete = isRuleComplete(field);

      if (fieldComplete !== true) {
        incompleteIndex = index;
      }
    });

    return incompleteIndex;
  };

  const getErrorText = () => {
    const incompleteFieldIndex = getFirstIncompleteFieldIndex();

    if (typeof incompleteFieldIndex === "number") {
      return (`Rule ${incompleteFieldIndex + 1} is incomplete. Incomplete rules will be ignored. All existing rules must be complete before you can add another.`);
    }
  };

  const isRuleComplete = (rule) => {
    return (
      hasStringValue(rule?.type) === true
      && hasStringValue(rule?.field) === true
      && hasStringValue(rule?.fieldFilter) === true
      && (Array.isArray(rule?.values) && rule?.values.length > 0)
    );
  };

  const getBody = () => {
    if (!filePullCompleted) {
      return (
        <div className="rules-input">
          <div className="text-center text-muted my-3">
            <IconBase className={"mr-2"} isLoading={!filePullCompleted} />
            Waiting on File Pull to Complete
          </div>
        </div>
      );
    }

    if (!rules || rules.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted my-3">No rules have been added</div>
        </div>
      );
    }
  };

  const getFieldTab = (rule, index) => {
    const ruleIsComplete = isRuleComplete(rule);
    const tabText = ruleIsComplete === true ? `Rule ${index + 1}` : `Rule ${index + 1} [Incomplete]`;
    
    return (
      <VanitySetVerticalTab
        key={index}
        tabText={tabText}
        tabName={`${index}`}
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer
      >
        {rules?.map((rule, index) => {
          return getFieldTab(rule, index);
        })}
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    if (hasStringValue(activeTab) !== true) {
      return null;
    }

    const index =  parseInt(activeTab);

    if (typeof index !== "number" || !Array.isArray(rules) || rules.length <= index) {
      return null;
    }

    const ruleData = rules[index];

    if (ruleData) {
      return (
        <MergeSyncTaskFileSelectionRuleInputPanel
          index={index}
          deleteRuleFunction={() => deleteRuleFunction(index)}
          ruleData={ruleData}
          wizardModel={wizardModel}
          updateRuleFunction={(newRule) => updateRuleFunction(index, newRule)}
          fileList={fileList}
          errorMessage={getErrorText()}
        />
      );
    }
  };

    if (!Array.isArray(rules) || rules.length === 0) {
      return (
        <InfoContainer
          isLoading={isLoading}
          titleText={"File Selection Rule Filter"}
          titleIcon={faFilter}
          titleRightSideButton={getAddFieldButton()}
        >
          <CenteredContentWrapper>
            {getBody()}
          </CenteredContentWrapper>
        </InfoContainer>
      );
    }

    return (
      <div>
        <VanitySetTabAndViewContainer
          isLoading={isLoading}
          title={"File Selection Rule Filter"}
          icon={faFilter}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getCurrentView()}
          minimumHeight={MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS.RULE_FILTER_CONTAINER_HEIGHT}
          maximumHeight={MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS.RULE_FILTER_CONTAINER_HEIGHT}
          tabColumnSize={3}
          titleRightSideButton={getAddFieldButton()}
        />
      </div>
    );
}

MergeSyncTaskFileSelectionRulesInputContainer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  fieldName: PropTypes.string,
  fileList: PropTypes.array,
  isLoading: PropTypes.bool,
  filePullCompleted: PropTypes.bool,
};

export default MergeSyncTaskFileSelectionRulesInputContainer;