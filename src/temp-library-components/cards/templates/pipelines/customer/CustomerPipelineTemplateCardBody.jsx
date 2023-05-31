import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {Col} from "react-bootstrap";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import SelectButtonBase from "components/common/buttons/select/base/SelectButtonBase";
import modelHelpers from "components/common/model/modelHelpers";
import {createPipelineFromTemplateMetadata} from "components/workflow/catalog/createPipelineFromTemplate.metadata";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import CreateCustomerPipelineButton from "temp-library-components/cards/templates/pipelines/customer/deploy/CreateCustomerPipelineButton";
import ViewCustomerPipelineTemplateDetailsButton
  from "components/workflow/catalog/private/ViewCustomerPipelineTemplateDetailsButton";
import {truncateString} from "components/common/helpers/string-helpers";

export default function CustomerPipelineTemplateCardBody(
  {
    template,
  }) {
  if (template == null) {
    return undefined;
  }

  return (
    <div className={"mb-1"}>
      <Row className={"small"}>
        <Col xs={12}>
          <div
            className={"w-100 d-flex mt-2"}
            style={{
              minHeight: "50px",
              maxHeight: "50px",
            }}
          >
            {truncateString(template?.description, 150)}
          </div>
        </Col>
      </Row>
    </div>
  );
}

CustomerPipelineTemplateCardBody.propTypes = {
  template: PropTypes.object,
};
