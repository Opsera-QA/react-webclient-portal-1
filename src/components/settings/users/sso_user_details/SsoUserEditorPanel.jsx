import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";

// TODO: Implement if necessary
function SsoUserEditorPanel({ ssoUserData, handleClose }) {
  const [userModel, setUserModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
    setIsLoading(true);
    setUserModel(ssoUserData);
    setIsLoading(false);
  };

  const createSsoUser = async () => {
    throw "Not supported yet!";
  };

  const updateLdapUser = async () => {
    throw "Not supported yet!";
  };

  if (isLoading || userModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading User Creation Form"} />);
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      createRecord={createSsoUser}
      updateRecord={updateLdapUser}
      setRecordDto={setUserModel}
      recordDto={userModel}
      showBooleanToggle={true}
      booleanToggleDisabled={true}
      enabledText={"Active"}
      disabledText={"Inactive"}
      disable={isSaving === true}
    >
      <Row>
      </Row>
    </EditorPanelContainer>
  );
}

SsoUserEditorPanel.propTypes = {
  ssoUserData: PropTypes.object,
  handleClose: PropTypes.func,
};

export default SsoUserEditorPanel;


