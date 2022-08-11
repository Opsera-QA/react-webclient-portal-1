import React from "react";
import PropTypes from "prop-types";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";

// TODO: Standardize
export default function AccountStatusWidget({ className }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const getTitleText = () => {
    return (
      <div
        style={{
          fontWeight: 700,
          fontSize: "22px",
        }}
      >
        Account Status
      </div>
    );
  };

  const getAccountStats = () => {
    return (
      <div
        style={{
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        <div>X Pipelines</div>
        <div>Pipeline Status</div>
        <div>X Days left in Free Trial</div>
        <div>Other Account Level Stats</div>
      </div>
    );
  };

  return (
    <div className={className}>
      <WidgetDataBlockBaseContainer
        borderColor={themeConstants.BORDER_COLORS.GRAY}
        fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
        fontFamily={fontThemeConstants.FONT_FAMILIES.INTER}
        heightSize={5}
      >
        <div className={"p-3"}>
          <div>
            {getTitleText()}
            {getAccountStats()}
          </div>
        </div>
      </WidgetDataBlockBaseContainer>
    </div>
  );
}

AccountStatusWidget.propTypes = {
  className: PropTypes.string,
};