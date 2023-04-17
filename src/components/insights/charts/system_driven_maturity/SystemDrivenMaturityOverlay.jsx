import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import SystemDrivenMaturityOrgTagsTab from './SystemDrivenMaturityOrgTagsTab';
import SystemDrivenMaturityProjectsTab from './SystemDrivenMaturityProjectsTab';
import { MaturityScoreItemType } from './maturityScoreItemType';
import NavigationTabContainer from 'components/common/tabs/navigation/NavigationTabContainer';
import NavigationTab from 'components/common/tabs/navigation/NavigationTab';

const OVERLAY_TABS = {
  ORG_TAGS: 'orgTags',
  PROJECTS: 'projects'
};

function SystemDrivenMaturityOverlay ({ kpiConfiguration, dashboardData, group }) {
  const toastContext = useContext(DialogToastContext);
  const [activeTab, setActiveTab] = useState(OVERLAY_TABS.ORG_TAGS);
  const [selectedOrgTag, setDelectedOrgTag] = useState(null);

  const onSelectOrgTag = (group) => {
    setActiveTab(OVERLAY_TABS.PROJECTS);
    setDelectedOrgTag(group);
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case OVERLAY_TABS.ORG_TAGS:
        setActiveTab(OVERLAY_TABS.ORG_TAGS);
        setDelectedOrgTag(null);
        return;
    }
  };

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (!group) {
      return 'No organization tag';
    }

    if (activeTab === OVERLAY_TABS.ORG_TAGS) {
      return (
        <SystemDrivenMaturityOrgTagsTab
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
          group={group}
          onSelectGroup={onSelectOrgTag}
        />
      );
    }

    if (activeTab === OVERLAY_TABS.PROJECTS) {
      return (
        <SystemDrivenMaturityProjectsTab
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
          orgTag={selectedOrgTag}
        />
      );
    }
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"System Driven Maturity Insights"}
      showToasts={true}
    >
      <NavigationTabContainer>
        <NavigationTab
          tabName={OVERLAY_TABS.ORG_TAGS}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={group.name}
        />
        <NavigationTab
          tabName={OVERLAY_TABS.PROJECTS}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={selectedOrgTag?.name ?? ''}
          visible={Boolean(selectedOrgTag)}
        />
      </NavigationTabContainer>
      <div className={"p-3"}>
        <TabPanelContainer currentView={getBody()} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SystemDrivenMaturityOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  group: MaturityScoreItemType
};

export default SystemDrivenMaturityOverlay;