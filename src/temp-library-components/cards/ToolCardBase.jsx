import PropTypes from "prop-types";
import React from "react";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import DescriptionField from "components/common/fields/text/DescriptionField";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import { faTools } from "@fortawesome/pro-thin-svg-icons";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function ToolCardBase(
  {
    toolModel,
    onClickFunction,
    tooltip,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    const icon = getLargeVendorIconFromToolIdentifier(toolModel?.getData("tool_identifier"));

    if (hasStringValue(icon) === true) {
      return (
        <IconTitleBar
          iconString={icon}
          title={`${toolModel.getData("name")}`}
        />
      );
    }

    return (
      <IconTitleBar
        formattedIcon={icon}
        title={`${toolModel.getData("name")}`}
      />
    );
  };


  const getDescription = () => {
    return (
      <Row className={"small"}>
        <Col xs={12}>
          <DescriptionField dataObject={toolModel} className={"description-height"} />
        </Col>
      </Row>
    );
  };

  const getTypeHeader = () => {
    return (
      <CardFooterBase
        backgroundColor={themeConstants.COLOR_PALETTE.GREEN}
        color={themeConstants.COLOR_PALETTE.WHITE}
        icon={faTools}
        text={"Tool"}
      />
    );
  };

  if (toolModel == null) {
    return undefined;
  }

  return (
    <IconCardContainerBase
      cardFooter={getTypeHeader()}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
      style={{
        // boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        cursor: mouseHelper.getMouseCursor(onClickFunction),
      }}
    />
  );
}

ToolCardBase.propTypes = {
  toolModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};