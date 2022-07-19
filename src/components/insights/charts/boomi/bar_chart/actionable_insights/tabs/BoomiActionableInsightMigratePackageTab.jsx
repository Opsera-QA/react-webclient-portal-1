import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import BoomiMasterTab from "./BoomiMasterTab";

function BoomiActionableInsightMigratePackageTab({ dashboardData, kpiConfiguration,icon}) {

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer className={"mb-3"}>
          <BoomiMasterTab
            priority={3}
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            icon={icon}
          />
      </VanitySetTabViewContainer>
    );
  };


  return (
    <VanitySetTabContentContainer title={`Boomi Migrate Packages Incidents Report`}>
      {getTabContentContainer()}
    </VanitySetTabContentContainer>
  );

}
BoomiActionableInsightMigratePackageTab.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object
};
export default BoomiActionableInsightMigratePackageTab;

