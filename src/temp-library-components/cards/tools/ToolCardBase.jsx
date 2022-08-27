import PropTypes from "prop-types";
import React from "react";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { hasStringValue } from "components/common/helpers/string-helpers";
import ToolCardFooter from "temp-library-components/cards/tools/ToolCardFooter";

export default function ToolCardBase(
  {
    toolModel,
    onClickFunction,
    tooltip,
  }) {
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

  if (toolModel == null) {
    return undefined;
  }

  return (
    <IconCardContainerBase
      cardFooter={<ToolCardFooter />}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      onClickFunction={onClickFunction}
      tooltip={tooltip}
    />
  );
}

ToolCardBase.propTypes = {
  toolModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
};