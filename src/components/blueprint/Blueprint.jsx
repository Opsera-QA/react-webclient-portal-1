import React, {useState} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import BlueprintSearch from "components/blueprint/BlueprintSearch";
import {useParams} from "react-router-dom";
import BlueprintsHelpDocumentation from "../common/help/documentation/blueprints/BlueprintsHelpDocumentation";

function Blueprint() {
  const {id, run} = useParams();
  const [activeTab, setActiveTab] = useState("tabbed");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"Tabbed View"} handleTabClick={handleTabClick} tabName={"tabbed"} />
        <CustomTab activeTab={activeTab} tabText={"Side By Side"} handleTabClick={handleTabClick} tabName={"comparison"} />
      </CustomTabContainer>
    );
  };

  const getBody = () => {
    if (activeTab === "comparison") {
      return (
        <div className={"d-flex"}>
          <div className={"w-50 pr-1"}><BlueprintSearch sideBySide={true} id={id} run={run} /></div>
          <div className={"w-50 pl-1"}><BlueprintSearch sideBySide={true} /></div>
        </div>
      );
    }

    return (<BlueprintSearch sideBySide={activeTab === "comparison"} id={id} run={run} />);
  };

  const getHelpComponent = () => {
    return (<BlueprintsHelpDocumentation/>);
  };

  // TODO: Cleanup further
  return (
    <ScreenContainer
      breadcrumbDestination={"blueprint"}
      helpComponent={getHelpComponent()}
      pageDescription={`
          The Pipeline Blueprint offers an end to end picture of the pipeline run combining logs from all stages under a single pane of glass for clear visibility and effortless debugging.
      `}
    >
      <div className="px-3"><TabPanelContainer currentView={getBody()} tabContainer={getTabContainer()} /></div>
    </ScreenContainer>
  );
}

export default Blueprint;
