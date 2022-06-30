import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import QuickDeployTotalComponentsActionableTable from "./QuickDeployTotalComponentsActionableTable";
import QuickDeployVerticalTabContainer from "../QuickDeployVerticalTabContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";

function QuickDeployTotalComponentsTab({ data, components, dashboardData, kpiConfiguration, icon }) {
  const [activeTab, setActiveTab] = useState(undefined);

  useEffect(() => {
    if (Array.isArray(components) && components.length > 0) {
      setActiveTab(components[0]);
    }
  }, [components]);

  const getCurrentView = () => {
    if (hasStringValue(activeTab) === true) {
      const component = components[activeTab];

      if (component) {
        return (
          <QuickDeployTotalComponentsActionableTable
            data={data}
            component={component}
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            icon={icon}
          />
        );
      }
    }
  };

  return (
    <VanitySetTabAndViewContainer
      title={`Quick Deploy Total Components Report`}
      defaultActiveKey={Array.isArray(components) && components.length > 0 ? components[0] : undefined}
      verticalTabContainer={
        <QuickDeployVerticalTabContainer
          highestMergesMetrics={components}
          activeTab={activeTab}
          handleTabClick={setActiveTab}
        />
      }
      currentView={getCurrentView()}
    />
  );
}

QuickDeployTotalComponentsTab.propTypes = {
  data: PropTypes.array,
  components: PropTypes.array,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object,
};

export default QuickDeployTotalComponentsTab;