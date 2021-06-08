import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import JenkinsSfdcInput from "components/common/list_of_values_input/tools/jenkins/JenkinsSfdcInput";
import pipelineActions from "components/workflow/pipeline-actions.js";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import { Form } from "react-bootstrap";
import JenkinsDestinationSalesForceCredentialsInput from "components/common/list_of_values_input/tools/jenkins/JenkinsDestinationSalesForceCredentialsInput";
import JenkinsSfdcUnitTestTypeSelectInput from "components/common/list_of_values_input/tools/jenkins/JenkinsSfdcUnitTestTypeSelectInput";
function JenkinsSfdcConfigurationPanel({ dataObject, setDataObject }) {
  const [isSFDCSearching, setisSFDCSearching] = useState(false);
  const [sfdcList, setSFDCList] = useState([]);
  const { getAccessToken } = useContext(AuthContext);
  // search sfdc
  useEffect(() => {
    async function fetchSFDCDetails(service) {
      setisSFDCSearching(true);
      let results = await pipelineActions.getToolsList(service, getAccessToken);

      if (results) {
        const filteredList = results.filter((el) => el.configuration !== undefined); //filter out items that do not have any configuration data!
        if (filteredList) {
          setSFDCList(filteredList);
          setisSFDCSearching(false);
        }
      }
    }
    // Fire off our API call
    fetchSFDCDetails("sfdc-configurator");
  }, []);

  const handleSFDCCreatePackageXMLChange = (checked) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("isOrgToOrg", checked);
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    setDataObject({ ...newDataObject });
  };
  const testArr = ["SFDC UNIT TESTING", "SFDC VALIDATE PACKAGE XML", "SFDC DEPLOY"];

  return (
    <>
      {dataObject.data.jobType != "SFDC PUSH ARTIFACTS" && (
        <JenkinsSfdcInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          sfdcList={sfdcList}
          busy={isSFDCSearching}
        />
      )}
      {dataObject.data.jobType === "SFDC CREATE PACKAGE XML" && (
        <Form.Check
          type="checkbox"
          label="Compare with destination SFDC Org"
          checked={dataObject.data.isOrgToOrg}
          onChange={(e) => handleSFDCCreatePackageXMLChange(e.target.checked)}
        />
      )}
      {dataObject.data.isOrgToOrg && (
        <JenkinsDestinationSalesForceCredentialsInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          sfdcList={sfdcList}
          busy={isSFDCSearching}
        />
      )}
      {dataObject.data.sfdcToolId.length > 0 && testArr.includes(dataObject.data.jobType) && (
        <JenkinsSfdcUnitTestTypeSelectInput dataObject={dataObject} setDataObject={setDataObject} />
      )}
    </>
  );
}

JenkinsSfdcConfigurationPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsSfdcConfigurationPanel;
