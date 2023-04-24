import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import GitlabToolCardBody from "temp-library-components/cards/tools/identifier/GitlabToolCardBody";
import GithubToolCardBody from "temp-library-components/cards/tools/identifier/GithubToolCardBody";
import SalesforceToolCardBody from "temp-library-components/cards/tools/identifier/SalesforceToolCardBody";
import DescriptionField from "components/common/fields/text/DescriptionField";

export default function ToolCardBody(
  {
    toolModel,
  }) {
  const getCardBodyByIdentifier = () => {
    switch (toolModel?.getData("tool_identifier")) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
        return (
          <GitlabToolCardBody
            toolModel={toolModel}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
        return (
          <GithubToolCardBody
            toolModel={toolModel}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR:
        return (
          <SalesforceToolCardBody
            toolModel={toolModel}
          />
        );
    }
  };

  if (toolModel == null) {
    return undefined;
  }

  return (
    <div
      style={{
        minHeight: "45px",
      }}
    >
      <Row className={"small"}>
        <Col xs={12}>
          <DescriptionField
            dataObject={toolModel}
            characterLimit={100}
            className={"dummy"}
          />
        </Col>
      </Row>
    </div>
  );
}

ToolCardBody.propTypes = {
  toolModel: PropTypes.object,
};