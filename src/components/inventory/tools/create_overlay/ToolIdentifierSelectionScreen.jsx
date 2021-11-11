import { AuthContext } from "contexts/AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import axios from "axios";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ToolIdentifierSelectionCardView from "components/admin/tools/tool_identifier/ToolIdentifierSelectionCardView";
import toolIdentifierMetadata from "components/admin/tools/tool_identifier/tool-identifier-metadata";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";

function ToolIdentifierSelectionScreen({toolModel, setToolModel, closePanel}) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      await getToolIdentifiers(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getToolIdentifiers = async (cancelSource) => {
    try {
      const toolIdentifierResponse = await toolManagementActions.getToolIdentifiersV2(getAccessToken, cancelSource, "active", true);

      if (isMounted?.current === true) {
        setToolIdentifiers(toolIdentifierResponse?.data);
      }
    } catch (error) {

      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const setDataFunction = (toolIdentifier) => {
    let newModel = {...toolModel};
    newModel.setData("tool_identifier", toolIdentifier?.identifier);
    newModel.setData("tool_type_identifier", toolIdentifier?.tool_type_identifier);
    newModel.setData("configuration", {});
    setToolModel({...newModel});
  };

  const getCardView = () => {
    return (
      <div className={"scroll-y full-screen-overlay-selection-container hide-x-overflow"}>
        <ToolIdentifierSelectionCardView
          toolIdentifiers={toolIdentifiers}
          setDataFunction={setDataFunction}
          toolIdentifierMetadata={toolIdentifierMetadata}
          isLoading={isLoading}
          loadData={loadData}
        />
      </div>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getCardView()}
      metadata={toolIdentifierMetadata}
      titleIcon={faTools}
      title={"Select Which Tool You Would Like to Create"}
      className={"mx-2 mt-2"}
    />
  );
}

ToolIdentifierSelectionScreen.propTypes = {
  toolModel: PropTypes.object,
  setToolModel: PropTypes.func,
  closePanel: PropTypes.func,
};

export default ToolIdentifierSelectionScreen;