import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Model from "../../../core/data_model/model";
import {deleteToolsMetadata} from "components/settings/delete_tools/deleteTools.metadata";
import DeleteToolsPlatformApplicationSelectInput from "components/settings/delete_tools/inputs/DeleteToolsPlatformApplicationSelectInput";
import DeleteToolsTable from "components/settings/delete_tools/DeleteToolsTable";
import platformActions from "components/inventory/platform/platform.actions";
import DeleteToolsSubNavigationBar from "components/settings/delete_tools/DeleteToolsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function DeleteTools() {
  const [deleteToolDto, setDeleteToolDto] = useState(new Model({ ...deleteToolsMetadata.newObjectFields }, deleteToolsMetadata, true));
  const {
    accessRoleData,
    isMounted,
    cancelTokenSource,
    isOpseraAdministrator,
    isSiteAdministrator,
    isSaasUser,
    isPowerUser,
    getAccessToken,
  } = useComponentStateReference();

  // TODO: I think this can be removed. We don't need to pull this data if it's set by the select input
 const loadApplicationTools = async () => {
  const response = await platformActions.getApplicationsV2(getAccessToken, cancelTokenSource);
  if (isMounted?.current === true && response?.data) {
    const application = response.data.find(ele => ele._id  === deleteToolDto.getData("applicationId"));
    // console.log(application);
    deleteToolDto.setData("toolsList", application?.tools);
  }
};

  const getToolsTable = () => {
    if (deleteToolDto.getData("applicationId") && deleteToolDto.getData("applicationId").length > 0 && deleteToolDto.getData("toolsList")) {
      return (
        <DeleteToolsTable
          data={deleteToolDto.getData("toolsList")}
          loadData={loadApplicationTools}
          className="p-2 ml-2"
        />
      );
    }
  };

  if (
    isSaasUser !== true
    && isPowerUser !== true
    && isSiteAdministrator !== true
    && isOpseraAdministrator !== true
  ) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"deleteTools"}
      isLoading={!accessRoleData}
      navigationTabContainer={<DeleteToolsSubNavigationBar activeTab={"deleteTools"} />}
      pageDescription={"This tool enables administrators to select a registered application, view the active tools and then delete them from the platform. This will perform a complete end to end removal of all instances related to an application."}
    >
      <div className="px-2 pb-2">
        <Row className="ml-auto mt-3">
          <Col lg={12}>
            <DeleteToolsPlatformApplicationSelectInput
              model={deleteToolDto}
              setModel={setDeleteToolDto}
            />
          </Col>
        </Row>
        {getToolsTable()}
      </div>
    </ScreenContainer>
  );
}

DeleteTools.propTypes = {};

export default DeleteTools;
