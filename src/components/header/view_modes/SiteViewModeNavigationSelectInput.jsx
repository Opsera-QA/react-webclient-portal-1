import React, { useContext } from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {
  getSiteViewModeLabel,
  SITE_VIEW_MODE_SELECT_OPTIONS,
} from "components/header/view_modes/siteViewMode.constants";
import {NavigationDropdownSelectInputBase} from "@opsera/makeup-and-vanity-set/dist/makeup-and-vanity-set.module";

function SiteViewModeNavigationSelectInput() {
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

SiteViewModeNavigationSelectInput.propTypes = {
  hideAuthComponents: PropTypes.bool,
  userData: PropTypes.object,
};

export default SiteViewModeNavigationSelectInput;
