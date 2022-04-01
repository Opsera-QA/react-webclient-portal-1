import React, {useContext} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import HelpDocumentation from "components/common/help/overlay/HelpDocumentation";

const HelpDocumentationScreen = () => {
  const { featureFlagHideItemInProd, featureFlagHideItemInTest } = useContext(AuthContext);

  if (featureFlagHideItemInTest() !== false || featureFlagHideItemInProd() !== false) {
    return null;
  }

  return (
    <ScreenContainer
      // navigationTabContainer={<ReportsSubNavigationBar currentTab={"all"} />}
      breadcrumbDestination={"helpDocumentation"}
    >
      <div className={"m-3"}>
        <HelpDocumentation

        />
      </div>
    </ScreenContainer>
  );
};


export default HelpDocumentationScreen;