import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import SpaceNameSelectInput from "../input/SpaceNameSelectInput";
import NexusRepoSelectInput from "../input/NexusRepoSelectInput";
import FeedTypeSelectInput from "../input/FeedTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import FeedToolTypeSelectInput from "../input/FeedToolTypeSelectInput";
import OctopusFeedJfrogToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/OctopusFeedJfrogToolSelectInput";
import JfrogRepoSelectInput from "../input/JfrogRepoSelectInput";
import RoleRestrictedNexusToolSelectInput
  from "components/common/list_of_values_input/tools/nexus/RoleRestrictedNexusToolSelectInput";

const OctopusFeedEditorForm = ({ dataObject, setDataObject, appID }) => {
  return (
    <Row>
      <Col lg={12}>
        <TextInputBase
          setDataObject={setDataObject}
          dataObject={dataObject}
          fieldName={"name"}
          disabled={appID && !dataObject.getData("id")}
        />
      </Col>
      <Col lg={12}>
        <SpaceNameSelectInput
          fieldName={"spaceName"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          disabled={appID ? true : false}
          tool_prop={dataObject ? dataObject.getData("spaceId") : ""}
        />
      </Col>
      <Col lg={12}>
        <FeedTypeSelectInput
          fieldName={"feedType"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          disabled={
            (dataObject && dataObject.getData("spaceId").length === 0) ||
              (appID && !dataObject.getData("id"))
              ? true
              : false
          }
          tool_prop={dataObject ? dataObject.getData("spaceId") : ""}
        />
      </Col>
      <Col lg={12}>
        <FeedToolTypeSelectInput 
          fieldName={"toolType"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          disabled={
            (dataObject && dataObject.getData("feedType").length === 0) ||
              (appID && !dataObject.getData("id"))              
          }
        />
      </Col>
      {dataObject && dataObject.getData("toolType") && dataObject.getData("toolType").toLowerCase() === "nexus" && (
        <>
          <Col lg={12}>
            <RoleRestrictedNexusToolSelectInput
              fieldName={"nexusToolId"}
              model={dataObject}
              setModel={setDataObject}
              disabled={
                (dataObject &&              
                  dataObject.getData("toolType").length === 0) ||
                  (appID && !dataObject.getData("id"))              
              }
            />
          </Col>
          <Col lg={12}>
            <NexusRepoSelectInput
              fieldName={"nexusRepository"}
              dataObject={dataObject}
              setDataObject={setDataObject}
              disabled={
                (dataObject &&
                  dataObject.getData("nexusToolId") &&
                  dataObject.getData("nexusToolId").length === 0) ||
                  (appID && !dataObject.getData("id"))              
              }
              tool_prop={dataObject ? dataObject.getData("nexusToolId") : ""}
            />
          </Col>
        </>  
      )}
      {dataObject && dataObject.getData("toolType") && dataObject.getData("toolType").toLowerCase() === "jfrog" && (
        <>
          <Col lg={12}>
            <OctopusFeedJfrogToolSelectInput
              fieldName={"nexusToolId"}
              model={dataObject}
              setModel={setDataObject}
              disabled={
                (dataObject &&              
                  dataObject.getData("toolType").length === 0) ||
                  (appID && !dataObject.getData("id"))              
              }          
            />
          </Col>
          <Col lg={12}>
            <JfrogRepoSelectInput
              fieldName={"nexusRepository"}
              dataObject={dataObject}
              setDataObject={setDataObject}
              disabled={
                (dataObject &&
                  dataObject.getData("nexusToolId") &&
                  dataObject.getData("nexusToolId").length === 0) ||
                  (appID && !dataObject.getData("id"))              
              }
              tool_prop={dataObject ? dataObject.getData("nexusToolId") : ""}
            />
          </Col>
        </>
      )}            
    </Row>
  );
};

OctopusFeedEditorForm.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  appID: PropTypes.string,
};

export default OctopusFeedEditorForm;
