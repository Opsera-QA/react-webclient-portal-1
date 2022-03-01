import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import RegistryToolSummaryCard from "components/common/fields/inventory/RegistryToolSummaryCard";
import toolMetadata from "components/inventory/tools/tool-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import TagsUsedInToolsTable from "components/reports/tags/tools/TagsUsedInToolsTable";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";

function TagArrayUsedInToolsField({ tags, showTable }) {
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  }, [tags]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTools(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    if (Array.isArray(tags) && tags.length > 0) {
      const response = await adminTagsActions.getRelevantToolsV2(getAccessToken, cancelSource, tags);

      if (isMounted?.current === true && response?.data != null) {
        setTools(response?.data?.data);
      }
    }
  };

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

  const getDisplay = () => {
    if (showTable) {
      return (
        <TagsUsedInToolsTable data={tools} loadData={loadData} isLoading={isLoading} isMounted={isMounted}/>
        );
    }

    return (getToolCards());
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Tools"} size={"sm"} />;
  }

  if (!isLoading && tags == null || tags.length === 0) {
    return null;
  }

  if (!isLoading && (tools == null || tools.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"}/>
          This tag combination is not currently used in any tool</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="form-text text-muted mb-2  ml-2">
        <span>This tag combination is used in {tools.length} tools</span>
      </div>
      {getDisplay()}
    </div>
  );
}

TagArrayUsedInToolsField.propTypes = {
  tags: PropTypes.array,
  showTable: PropTypes.bool
};

export default TagArrayUsedInToolsField;