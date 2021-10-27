import React, {useEffect, useState, useContext, useRef} from "react";
import PropTypes from "prop-types";
import JenkinsSfdcInput from "components/common/list_of_values_input/tools/jenkins/JenkinsSfdcInput";
import pipelineActions from "components/workflow/pipeline-actions.js";
import { Form } from "react-bootstrap";
import JenkinsDestinationSalesForceCredentialsInput from "components/common/list_of_values_input/tools/jenkins/JenkinsDestinationSalesForceCredentialsInput";
import JenkinsSfdcUnitTestTypeSelectInput from "components/common/list_of_values_input/tools/jenkins/JenkinsSfdcUnitTestTypeSelectInput";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";

// TODO: Is this supposed to still be in here
const testArr = ["SFDC UNIT TESTING", "SFDC VALIDATE PACKAGE XML", "SFDC DEPLOY"];

// TODO: Rewrite
function JenkinsSfdcConfigurationPanel({ dataObject, setDataObject }) {
  const { getAccessToken } = useContext(AuthContext);
  const { toastContext } = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [sfdcList, setSfdcList] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setSfdcList([]);
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const response = await toolsActions.getRoleLimitedToolsByIdentifier(getAccessToken, cancelTokenSource,"sfdc-configurator");
      const toolsReponse = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(toolsReponse)) {
        let tools = [];
        toolsReponse.map((item) => {
          tools.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            accounts: item.accounts,
            jobs: item.jobs,
          });
        });

        if (Array.isArray(tools) && tools.length > 0) {
          const filteredList = tools.filter((el) => el.configuration !== undefined);
          if (Array.isArray(filteredList) && filteredList.length > 0) {
            setSfdcList(filteredList);
          }
        }
      }
    }
    catch (error) {
      toastContext.showErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleSFDCCreatePackageXMLChange = (checked) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("isOrgToOrg", checked);
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    setDataObject({ ...newDataObject });
  };

  const getJenkinsSfdcInput = () => {
    if (dataObject.getData("jobType") !== "SFDC PUSH ARTIFACTS") {
     return (
       <JenkinsSfdcInput
         dataObject={dataObject}
         setDataObject={setDataObject}
         sfdcList={sfdcList}
         busy={isLoading}
       />
     );
    }
  };

  //TODO: This should probably be its own component
  const getComparisonCheckbox = () => {
    if (dataObject?.getData("jobType") === "SFDC CREATE PACKAGE XML") {
      return (
        <Form.Check
          type="checkbox"
          label="Compare with destination SFDC Org"
          checked={dataObject.data.isOrgToOrg}
          onChange={(e) => handleSFDCCreatePackageXMLChange(e.target.checked)}
        />
      );
    }
  };

  const getSfdcCredentialsInput = () => {
    if (dataObject?.getData("isOrgToOrg")) {
      return (
        <JenkinsDestinationSalesForceCredentialsInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          sfdcList={sfdcList}
          busy={isLoading}
        />
      );
    }
  };

  const getUnitTestTypeInput = () => {
    if (dataObject?.getData("sfdcToolId")?.length > 0 && testArr.includes(dataObject?.getData("jobType"))) {
      return (
        <JenkinsSfdcUnitTestTypeSelectInput dataObject={dataObject} setDataObject={setDataObject} />
      );
    }
  };

  if (dataObject == null) {
    return null;
  }

  return (
    <>
      {getJenkinsSfdcInput()}
      {getComparisonCheckbox()}
      {getSfdcCredentialsInput()}
      {getUnitTestTypeInput()}
    </>
  );
}

JenkinsSfdcConfigurationPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsSfdcConfigurationPanel;
