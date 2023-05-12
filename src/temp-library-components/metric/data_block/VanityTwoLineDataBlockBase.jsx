import React from "react";
import PropTypes from "prop-types";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import {VanityFocusTextBase} from "temp-library-components/label/VanityFocusTextBase";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";

export default function VanityTwoLineDataBlockBase(
  {
    width,
    className,
    label,
    focusText,
  }) {
  return (
    <div
      style={{
        minWidth: width,
        maxWidth: width,
      }}
      className={className}
    >
      <WidgetDataBlockBase className={"mb-2"}>
        <div className={"p-2 w-100"}>
          <CenteredContentWrapper>
            <VanityFocusTextBase
              text={focusText}
            />
          </CenteredContentWrapper>
          <CenteredContentWrapper>
            <VanityLabelBase
              label={label}
            />
          </CenteredContentWrapper>
        </div>
      </WidgetDataBlockBase>
    </div>
  );
}

VanityTwoLineDataBlockBase.propTypes = {
  label: PropTypes.string,
  focusText: PropTypes.any,
  className: PropTypes.string,
  width: PropTypes.string,
};
