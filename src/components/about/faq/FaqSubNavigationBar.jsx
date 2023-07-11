import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faQuestion
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function FaqSubNavigationBar({currentTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "faq":
        history.push(`/faq`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (currentTab) {
      case "faqViewer":
        return (
          <NavigationTab
            icon={faQuestion}
            tabName={currentTab}
            handleTabClick={handleTabClick}
            activeTab={"faqViewer"}
            tabText={"FAQ Viewer"}
          />
        );
      default:
        return null;
    }
  };


  return (
    <NavigationTabContainer>
      <NavigationTab
        activeTab={currentTab}
        tabText={"FAQs"}
        handleTabClick={handleTabClick}
        tabName={"all"}
        icon={faQuestion}
        isBeta={true}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

FaqSubNavigationBar.propTypes = {
  currentTab: PropTypes.string,
};

export default FaqSubNavigationBar;