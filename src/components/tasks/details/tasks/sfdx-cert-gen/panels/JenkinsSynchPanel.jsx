import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import taskActions from "components/tasks/task.actions";
import RoleRestrictedJenkinsToolMultiSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool/RoleRestrictedJenkinsToolMultiSelectInput";

function JenkinsSynchPanel({gitTasksData, setGitTasksData}) {
    const [isSynching, setIsSynching] = useState(false);
    const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
    let toastContext = useContext(DialogToastContext);

    const handleSynch = async() => {
        console.log("Trigger kafka call here"); 
        try{
            setIsSynching(true);
            const response = await taskActions.syncCertToJenkins(getAccessToken, gitTasksData);
            console.log(response);
      
          } catch (e) {
            console.log("error occured while fetching cert!");
            toastContext.showErrorDialog("error occured while Sycnh!");
          } finally {
            setIsSynching(false);
        }
    };

  return (
    <div>
      <RoleRestrictedJenkinsToolMultiSelectInput
        dataObject={gitTasksData}
        setDataObject={setGitTasksData}
        busy={isSynching}
        fieldName={"jenkinsIds"}
      />
      <Button className="mt-2" onClick={handleSynch}
              disabled={!(gitTasksData.getData("jenkinsIds") && gitTasksData.getData("jenkinsIds").length > 0) || isSynching}>Synch
        Jenkins</Button>
    </div>
  );
}

JenkinsSynchPanel.propTypes = {
    gitTasksData: PropTypes.object,
    setGitTasksData: PropTypes.func,
};

export default JenkinsSynchPanel;

