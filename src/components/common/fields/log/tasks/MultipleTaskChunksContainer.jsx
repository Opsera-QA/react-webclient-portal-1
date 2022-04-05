import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faLaptopCode} from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import TaskLogChunkDisplayer from "components/common/fields/log/tasks/TaskLogChunkDisplayer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";

function MultipleTaskChunksContainer(
  {
    chunkCount,
    logMetaRecordId,
    isLoading,
  }) {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setActiveTab(1);
  }, [chunkCount]);

  const handleTabClick = (newTab) => {
    const parsedInt = parseInt(newTab);
    if (parsedInt !== activeTab) {
      setActiveTab(parsedInt);
    }
  };

  const getVerticalTab = (id) => {
    return (
      <VanitySetVerticalTab
        key={id}
        tabText={`Part ${id}`}
        tabName={id}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
  };

  const getChunkTabs = () => {
    const tabs = [];

    for (let i = 1; i <= chunkCount; i++) {
      tabs.push(getVerticalTab(i));
    }

    return tabs;
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        {getChunkTabs()}
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    return (
      <div className={"console-text h-100"}>
        <TaskLogChunkDisplayer
          logMetaRecordId={logMetaRecordId}
          chunkNumber={activeTab}
        />
      </div>
    );
  };

  if (isMongoDbId(logMetaRecordId) !== true) {
    return null;
  }

  return (
    <VanitySetTabAndViewContainer
      isLoading={isLoading}
      icon={faLaptopCode}
      title={"Console Logs"}
      currentView={getCurrentView()}
      verticalTabContainer={getVerticalTabContainer()}
      minimumHeight={"calc(100vh - 300px)"}
      maximumHeight={"calc(100vh - 300px)"}
    />
  );
}

MultipleTaskChunksContainer.propTypes = {
  chunkCount: PropTypes.number,
  logMetaRecordId: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MultipleTaskChunksContainer;