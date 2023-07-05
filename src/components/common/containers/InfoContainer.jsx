import React, {useState} from "react";
import PropTypes from "prop-types";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import InfoMessageFieldBase from "components/common/fields/text/message/InfoMessageFieldBase";
import {faCaretDown} from "@fortawesome/pro-light-svg-icons";
import {IconBase} from "@opsera/react-vanity-set";

function InfoContainer(
  {
    children,
    isLoading,
    titleIcon,
    titleText,
    titleClassName,
    titleRightSideButton,
    helpComponent,
    className,
    minimumHeight,
    maximumHeight,
    minimumWidth,
    maximumWidth,
    loadDataFunction,
    backgroundColor,
    field,
    bodyClassName,
    overflowY,
    isCollapsable,
    collapsed,
  }) {
  const [isCollapsed, setIsCollapsed] = useState(DataParsingHelper.parseBooleanV2(collapsed, false));

  const getBodyStyling = () => {
    const styling = {};

    if (hasStringValue(backgroundColor) === true) {
      styling.backgroundColor = backgroundColor;
    }

    styling.minHeight = minimumHeight;
    styling.maxHeight = maximumHeight;
    styling.minWidth = minimumWidth;
    styling.maxWidth = maximumWidth;

    if (hasStringValue(minimumHeight) === true && hasStringValue(maximumHeight) === true) {
      styling.overflowY = overflowY;
    }

    return styling;
  };

  const getChildren = () => {
    if (isCollapsed !== true) {
      return children;
    }

    return (
      <CenteredContentWrapper className={"m-3"}>
        <InfoMessageFieldBase
          showInformationLabel={false}
          message={
            <>
              This field is collapsed. To view more information, please click the <IconBase icon={faCaretDown} /> icon
            </>
          }
        />
      </CenteredContentWrapper>
    );
  };

  return (
    <div className={className}>
      <InputTitleBar
        customTitle={titleText}
        icon={titleIcon}
        helpComponent={helpComponent}
        isLoading={isLoading}
        className={titleClassName}
        rightSideButton={titleRightSideButton}
        loadDataFunction={loadDataFunction}
        field={field}
        isCollapsable={isCollapsable}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={bodyClassName}
        style={getBodyStyling()}
      >
        {getChildren()}
      </div>
    </div>
  );
}

InfoContainer.propTypes = {
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  titleClassName: PropTypes.string,
  children: PropTypes.any,
  helpComponent: PropTypes.any,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  titleRightSideButton: PropTypes.object,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  minimumWidth: PropTypes.string,
  maximumWidth: PropTypes.string,
  loadDataFunction: PropTypes.func,
  backgroundColor: PropTypes.string,
  field: PropTypes.object,
  bodyClassName: PropTypes.string,
  overflowY: PropTypes.string,
  isCollapsable: PropTypes.bool,
  collapsed: PropTypes.bool,
};

InfoContainer.defaultProps = {
  bodyClassName: "content-container",
  overflowY: "auto",
  collapsed: false,
};

export default InfoContainer;