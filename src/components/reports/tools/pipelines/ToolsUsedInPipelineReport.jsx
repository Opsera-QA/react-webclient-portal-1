import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faAnalytics, faDraftingCompass, faTags, faTools} from "@fortawesome/pro-light-svg-icons";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import {useHistory} from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import toolUsedInPipelineMetadata from "components/reports/tools/pipelines/tool-used-in-pipeline-metadata";
import ToolSelectInput from "components/common/list_of_values_input/inventory/ToolSelectInput";
import ToolUsedInPipelinesField from "components/common/fields/inventory/ToolUsedInPipelinesField";

function ToolsUsedInPipelineReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [toolUsedInPipelineDto, setToolUsedInPipelineDto] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      setToolUsedInPipelineDto(new Model(toolUsedInPipelineMetadata.newObjectFields, toolUsedInPipelineMetadata, true));
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    history.push(`/reports/${tabSelection}`);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={"tools"} tabText={"All Reports"} handleTabClick={handleTabClick} tabName={"all"} icon={faAnalytics} />
        <NavigationTab activeTab={"tools"} tabText={"Tool Reports"} handleTabClick={handleTabClick} tabName={"tools"} icon={faTools} />
        <NavigationTab activeTab={"tools"} tabText={"Tag Reports"} handleTabClick={handleTabClick} tabName={"tags"} icon={faTags} />
        {/* <NavigationTab activeTab={"tools"} tabText={"Pipeline Reports"} handleTabClick={handleTabClick} tabName={"pipelines"} icon={faDraftingCompass} /> */}
      </NavigationTabContainer>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"toolsUsedInPipelineReport"}
      isLoading={isLoading}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
      navigationTabContainer={getNavigationTabContainer()}
    >
      <div className={"ml-3 mt-3 mb-2"}> View pipelines by tool</div>
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <ToolSelectInput fieldName={"_id"} dataObject={toolUsedInPipelineDto} setDataObject={setToolUsedInPipelineDto}/>
        </Col>
      </Row>
      <Row className={"px-2"}>
        <Col>
          <ToolUsedInPipelinesField dataObject={toolUsedInPipelineDto} showTable={true}/>
        </Col>
      </Row>
    </ScreenContainer>
  );
}

export default ToolsUsedInPipelineReport;

