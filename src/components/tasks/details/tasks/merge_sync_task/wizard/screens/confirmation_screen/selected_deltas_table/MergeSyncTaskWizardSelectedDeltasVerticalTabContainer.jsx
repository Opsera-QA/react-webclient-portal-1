import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import MergeSyncTaskWizardSelectedDeltasTable
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/selected_deltas_table/MergeSyncTaskWizardSelectedDeltasTable";

const MergeSyncTaskWizardSelectedDeltasVerticalTabContainer = (
  {
    updatedFileDeltas,
  }) => {
  const [activeTab, setActiveTab] = useState(undefined);

  useEffect(() => {
    setActiveTab(undefined);

    if (Array.isArray(updatedFileDeltas) && updatedFileDeltas?.length > 0) {
      setActiveTab('0');
    }
  }, [updatedFileDeltas]);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getCommitFileTab = (delta, index) => {
    return (
      <VanitySetVerticalTab
        key={index}
        tabText={delta?.fileName}
        tabName={`${index}`}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
  };

  const getVerticalTabContainer = () => {
    if (Array.isArray(updatedFileDeltas) && updatedFileDeltas.length > 0) {
      return (
        <VanitySetVerticalTabContainer>
          {updatedFileDeltas?.map((fieldData, index) => {
            return getCommitFileTab(fieldData, index);
          })}
        </VanitySetVerticalTabContainer>
      );
    }
  };

  const getCurrentView = () => {
    if (activeTab && Array.isArray(updatedFileDeltas) && updatedFileDeltas.length > 0) {
      return (
        <div className={"mx-2 mt-2"}>
          <MergeSyncTaskWizardSelectedDeltasTable
            delta={{...updatedFileDeltas[activeTab]}}
          />
        </div>
      );
    }
  };

  return (
    <VanitySetTabAndViewContainer
      icon={faBracketsCurly}
      title={`File Change Selections`}
      verticalTabContainer={getVerticalTabContainer()}
      bodyClassName={"mx-0"}
      tabColumnSize={3}
      currentView={getCurrentView()}
      minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.CONFIRMATION_SCREEN_CONTAINER}
      maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.CONFIRMATION_SCREEN_CONTAINER}
    />
  );
};

MergeSyncTaskWizardSelectedDeltasVerticalTabContainer.propTypes = {
  updatedFileDeltas: PropTypes.array,
};

export default MergeSyncTaskWizardSelectedDeltasVerticalTabContainer;