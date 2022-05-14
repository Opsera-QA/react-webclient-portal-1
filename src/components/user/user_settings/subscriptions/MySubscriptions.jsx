import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faDraftingCompass, faTag} from "@fortawesome/pro-light-svg-icons";
import TagSubscriptionsPanel from "components/user/user_settings/subscriptions/TagSubscriptionsPanel";
import PipelineSubscriptionsPanel from "components/user/user_settings/subscriptions/PipelineSubscriptionsPanel";

function MySubscriptions() {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [activeTab, setActiveTab] = useState("tags");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"Tag Subscriptions"} handleTabClick={handleTabClick} tabName={"tags"} icon={faTag}/>
        <CustomTab activeTab={activeTab} tabText={"Pipeline Subscriptions"} handleTabClick={handleTabClick} tabName={"pipelines"} icon={faDraftingCompass} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "tags":
        return (<TagSubscriptionsPanel />);
      case "pipelines":
        return <PipelineSubscriptionsPanel className={"p-3"} />;
      default:
        return null;
    }
  };

  return (<div className="px-3"><TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} /></div>);
}

export default MySubscriptions;

