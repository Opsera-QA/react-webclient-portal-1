import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FieldTitleBar from "components/common/fields/FieldTitleBar";
import {faLaptopCode} from "@fortawesome/pro-light-svg-icons";
import InputContainer from "components/common/inputs/InputContainer";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function MultipleConsoleLogsField({consoleLogs}) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(consoleLogs[0]?.id);
  }, [consoleLogs]);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTab = (id) => {
    return (
      <VanitySetVerticalTab
        key={id}
        tabText={id}
        tabName={id}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer className={"console-log-container-tabs"}>
        {consoleLogs.map((consoleLog) => {
          return (
            getVerticalTab(consoleLog?.id)
          );
        })}
      </VanitySetVerticalTabContainer>
    );
  };

  const getTabView = () => {
    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0"}>
          {getVerticalTabContainer()}
        </Col>
        <Col sm={10} className={"px-0"}>
          <div className="console-text console-log-container-body">
            {getCurrentView()}
          </div>
        </Col>
      </Row>
    );
  };

  const getCurrentView = () => {
    if (activeTab !== "") {
      const consoleLog = consoleLogs.find((consoleLog) => consoleLog.id === activeTab);

      if (consoleLog) {
        return consoleLog?.log;
      }
    }
  };

  if (!Array.isArray(consoleLogs) || consoleLogs.length === 0) {
    return null;
  }

  return (
    <InputContainer>
      <div className="object-properties-input">
        <div className="content-container">
          <FieldTitleBar customTitle={"Console Logs"} icon={faLaptopCode}/>
          <div className={"console-log-container"}>
            {getTabView()}
          </div>
        </div>
      </div>
      <div className={"object-properties-footer"}/>
    </InputContainer>
  );
}

MultipleConsoleLogsField.propTypes = {
  consoleLogs: PropTypes.array,
};

export default MultipleConsoleLogsField;