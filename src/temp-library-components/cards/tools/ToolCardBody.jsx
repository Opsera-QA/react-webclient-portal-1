import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import GitlabToolCardBody from "temp-library-components/cards/tools/identifier/GitlabToolCardBody";
import GithubToolCardBody from "temp-library-components/cards/tools/identifier/GithubToolCardBody";

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
    }
  };

  if (toolModel == null) {
    return undefined;
  }

  return (
    <Row className={"small"}>
      {getCardBodyByIdentifier()}
      {/*<Col xs={12}>*/}
        {/*<DescriptionField dataObject={toolModel} className={"description-height"} />*/}
      {/*</Col>*/}
    </Row>
  );
}

ToolCardBody.propTypes = {
  toolModel: PropTypes.object,
};