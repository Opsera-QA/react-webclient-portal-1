import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";

function DeployElkButton({ userId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [deployingElk, setDeployingElk] = useState(false);

  const deployElkStack = async () => {
    try {
      setDeployingElk(true);
      const response = await RegisteredUserActions.deployElkStack(userId, getAccessToken);
      let statusCode = response.status;
      if (statusCode === 200) {
        toastContext.showSuccessDialog("Successfully Deployed ELK Stack");
      }
      else {
        toastContext.showErrorDialog("Something went wrong deploying ELK stack. View browser logs for more details");
        console.error(response);
        setDeployingElk(false);
      }
    } catch (error) {
      console.error(error);
      toastContext.showErrorDialog(error.message);
      setDeployingElk(false);
    }
  }

  return (
    <div>
      <Button className="w-100" variant="secondary" disabled={deployingElk} size="sm" onClick={() => { deployElkStack(); }} >Deploy ELK Stack Now</Button>
    </div>
  );
}

DeployElkButton.propTypes = {
  userId: PropTypes.string,
};

export default DeployElkButton;