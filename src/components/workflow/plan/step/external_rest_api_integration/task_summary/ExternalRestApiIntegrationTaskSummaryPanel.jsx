import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import Row from "react-bootstrap/Row";
import ExternalRestApiIntegrationEndpointResponseField
  from "components/workflow/plan/step/external_rest_api_integration/ExternalRestApiIntegrationEndpointResponseField";
import ExternalRestApiIntegrationEndpointRequestField
  from "components/workflow/plan/step/external_rest_api_integration/ExternalRestApiIntegrationEndpointRequestField";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

// TODO: Make fully fleshed out report.
function ExternalRestApiIntegrationTaskSummaryPanel({ externalRestApiIntegrationStepTaskModel, endpoint, endpoints }) {
  const getEndpointFields = () => {
    const parsedEndpoints = dataParsingHelper.parseObject(endpoints, false);

    if (parsedEndpoints) {
      return JSON.stringify(parsedEndpoints);
      // return (
      //   <>
      //     <Row>
      //       <Col xs={6}>
      //         <ExternalRestApiIntegrationEndpointRequestField
      //           endpointObject={endpoints}
      //         />
      //       </Col>
      //       <Col xs={6}>
      //         <ExternalRestApiIntegrationEndpointResponseField
      //           responseObject={endpoint?.response}
      //         />
      //       </Col>
      //     </Row>
      //     <Row>
      //       <Col xs={6}>
      //         <ExternalRestApiIntegrationEndpointRequestField
      //           endpointObject={endpoint}
      //         />
      //       </Col>
      //       <Col xs={6}>
      //         <ExternalRestApiIntegrationEndpointResponseField
      //           responseObject={endpoint?.response}
      //         />
      //       </Col>
      //     </Row>
      //     <Row>
      //       <Col xs={6}>
      //         <ExternalRestApiIntegrationEndpointRequestField
      //           endpointObject={endpoint}
      //         />
      //       </Col>
      //       <Col xs={6}>
      //         <ExternalRestApiIntegrationEndpointResponseField
      //           responseObject={endpoint?.response}
      //         />
      //       </Col>
      //     </Row>
      //   </>
      // );
    }


    if (endpoint) {
      return (
        <Row>
          <Col xs={6}>
            <ExternalRestApiIntegrationEndpointRequestField
              endpointObject={endpoint}
            />
          </Col>
          <Col xs={6}>
            <ExternalRestApiIntegrationEndpointResponseField
              responseObject={endpoint?.response}
            />
          </Col>
        </Row>
      );
    }
  };

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase pipelineTaskData={externalRestApiIntegrationStepTaskModel}>
      <Col xs={12}>
        {getEndpointFields()}
      </Col>
    </PipelineTaskSummaryPanelBase>
  );
}

ExternalRestApiIntegrationTaskSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  endpoint: PropTypes.object,
  endpoints: PropTypes.object,
};


export default ExternalRestApiIntegrationTaskSummaryPanel;
