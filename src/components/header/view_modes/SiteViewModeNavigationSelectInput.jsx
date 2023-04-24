import React, { useContext } from "react";
import {AuthContext} from "contexts/AuthContext";
import {
  getSiteViewModeLabel,
  SITE_VIEW_MODE_SELECT_OPTIONS,
} from "components/header/view_modes/siteViewMode.constants";
import {NavigationDropdownSelectInputBase} from "@opsera/react-vanity-set";

export default function SiteViewModeNavigationSelectInput() {
  const {
    viewMode,
    setViewMode,
  } = useContext(AuthContext);

  return (
    <NavigationDropdownSelectInputBase
      selectedOption={viewMode}
      selectOptions={SITE_VIEW_MODE_SELECT_OPTIONS}
      setDataFunction={setViewMode}
      title={getSiteViewModeLabel(viewMode)}
    />
  );
}

SiteViewModeNavigationSelectInput.propTypes = {};
