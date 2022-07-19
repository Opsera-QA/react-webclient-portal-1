import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import BoomiMasterTab from "./BoomiMasterTab";

function BoomiActionableInsightDeployPackageTab({ dashboardData, kpiConfiguration,icon}) {

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer className={"mb-3"}>
          <BoomiMasterTab
            priority={2}
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            icon={icon}
          />
      </VanitySetTabViewContainer>
    );
  };


  return (
    <VanitySetTabContentContainer title={`Boomi Deploy Packages Report`}>
      {getTabContentContainer()}
    </VanitySetTabContentContainer>
  );

}
BoomiActionableInsightDeployPackageTab.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object
};
export default BoomiActionableInsightDeployPackageTab;

