import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faLaptopCode} from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import InfoContainer from "components/common/containers/InfoContainer";
import TaskLogChunkDisplayer from "components/common/fields/log/tasks/TaskLogChunkDisplayer";

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
      <VanitySetVerticalTabContainer className={"console-log-container-tabs"}>
        {getChunkTabs()}
      </VanitySetVerticalTabContainer>
    );
  };

  if (isMongoDbId(logMetaRecordId) !== true) {
    return null;
  }

  return (
    <InfoContainer
      isLoading={isLoading}
      titleIcon={faLaptopCode}
      titleText={"Console Logs"}
    >
      <div className={"console-log-container"}>
        <Row className={"mx-0"}>
          <Col sm={2} className={"px-0"}>
            {getVerticalTabContainer()}
          </Col>
          <Col sm={10} className={"px-0"}>
            <div className="console-text console-log-container-body">
              <TaskLogChunkDisplayer
                logMetaRecordId={logMetaRecordId}
                chunkNumber={activeTab}
              />
            </div>
          </Col>
        </Row>
      </div>
    </InfoContainer>
  );
}

MultipleTaskChunksContainer.propTypes = {
  chunkCount: PropTypes.number,
  logMetaRecordId: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MultipleTaskChunksContainer;