import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import Model from "core/data_model/model";
import RegistryToolSummaryCard from "components/common/fields/inventory/RegistryToolSummaryCard";
import toolMetadata from "components/inventory/tools/tool-metadata";

function TagArrayUsedInToolsField({ dataObject }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [dataObject]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadPipelines();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadPipelines = async () => {
    if (Array.isArray(dataObject.getData("tags")) && dataObject.getData("tags").length > 0) {
      const response = await adminTagsActions.getRelevantTools(dataObject, getAccessToken);

      if (response?.data != null) {
        setTools(response?.data?.data);
      }
    }
  };

  // TODO: Create tool summary card
  const getToolCards = () => {
    return (
      <Row>
        {tools.map((tool) => {
          return (
            <Col md={6} key={tool._id}>
              <RegistryToolSummaryCard
                toolData={new Model(tool, toolMetadata, false)}
                loadToolInNewWindow={false}
              />
            </Col>
          );
        })}
      </Row>
    );
  };


  if (isLoading) {
    return <LoadingDialog message={"Loading Tools"} size={"sm"} />;
  }

  if (!isLoading && dataObject == null || dataObject.getData("tags").length === 0) {
    return <></>;
  }

  if (!isLoading && (tools == null || tools.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          This tag combination is not currently used in any tool</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="form-text text-muted mb-2">
        <span>This tag combination is used in {tools.length} tools</span>
      </div>
      {getToolCards()}
    </div>
  );
}

TagArrayUsedInToolsField.propTypes = {
  dataObject: PropTypes.object,
};

export default TagArrayUsedInToolsField;