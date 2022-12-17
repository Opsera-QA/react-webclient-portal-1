import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import sfdcActions from "../sfdc-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {Col, Button} from "react-bootstrap";
import { apiServerUrl } from "config";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingIcon from "components/common/icons/LoadingIcon";

function SfdcOAuthConnectButton({ model, authType, toolId, visible }) {

  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
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
      const user = await getUserRecord();
      setUserId(user._id);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showErrorDialog(error);
      }
    }
  };

  const connectToSfdcOauth = async () => {    
    const toolUrl = model.getData("toolURL");
    const userName = model.getData("accountUsername");
    const redirectUri = `${apiServerUrl}/auth/sfdc`;
    const windowFeatures = "menubar=yes,resizable=yes,scrollbars=yes,status=no,height=720,width=520";
    try {
      setIsLoading(true);
      const response = await sfdcActions.getOauthDetails(
        getAccessToken,
        cancelTokenSource
      );
  
      const url = `${toolUrl}/services/oauth2/authorize?client_id=${response?.data?.clientId}&redirect_uri=${redirectUri}&response_type=code&login_hint=${userName}&code_challenge=${response?.data?.challenge}&state=${userId}|${toolId}|${toolUrl}|${userName}|${redirectUri}|${response?.data?.token}&display=popup&prompt=login%20consent`;
      window.open(url, "_blank", windowFeatures);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }  
  };

  if (authType === "basic" || !visible) {
    return null;
  }

  if (model?.getData("sfdc_refresh_token")) {
    return (
      <>
        <Col lg={12} className="mt-2 p-0">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => connectToSfdcOauth()}
            disabled={model.getData("toolURL") === "" || model.getData("accountUsername") === "" || isLoading}
          >
            {isLoading ? <>Launching OAuth Screen <LoadingIcon className={"mr-2"} /></> : "Re-Connect OAuth"}
          </Button>
        </Col>
      </>
    );
  }
  return (
    <>
      <Col lg={12} className="mt-2 p-0">
        <Button
          size="sm"
          variant="success"
          onClick={() => connectToSfdcOauth()}
          disabled={model.getData("toolURL") === "" || model.getData("accountUsername") === "" || isLoading}
        >
          {isLoading ? <>Launching OAuth Screen <LoadingIcon className={"mr-2"} /></> : "Connect OAuth"}
        </Button>
      </Col>
    </>
  );

}

SfdcOAuthConnectButton.propTypes = {
  model: PropTypes.object,
  authType: PropTypes.string,
  toolId: PropTypes.string,
  visible: PropTypes.bool,
};

export default SfdcOAuthConnectButton;
