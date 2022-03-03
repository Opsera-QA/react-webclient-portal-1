import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import Model from "core/data_model/model";
import RegistryToolSummaryCard from "components/common/fields/inventory/RegistryToolSummaryCard";
import toolMetadata from "components/inventory/tools/tool-metadata";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import IconBase from "components/common/icons/IconBase";

function SingleTagUsedInToolsField({ tag, closePanel, className }) {
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
  }, [tag]);

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
    if (tag != null) {
      const response = await adminTagsActions.getRelevantToolsV2(getAccessToken, cancelSource, [tag]);

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
                closePanel={closePanel}
              />
            </Col>
          );
        })}
      </Row>
    );
  };


  if (isLoading) {
    return <div className={"my-2"}><LoadingDialog size={"md"} message={"Loading Tool Usage"} isLoading={isLoading} /></div>;
  }

  if (!isLoading && tag == null) {
    return null;
  }

  if (!isLoading && (tools == null || tools.length === 0)) {
    return (
      <div className="text-muted m-2">
        <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          This tag is not currently applied on any tool</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-muted mb-2">
        <span>This tag is applied on {tools.length} tool{tools?.length !== 1 ? 's' : ''}</span>
      </div>
      {getToolCards()}
    </div>
  );
}

SingleTagUsedInToolsField.propTypes = {
  tag: PropTypes.object,
  closePanel: PropTypes.func,
  className: PropTypes.string
};

export default SingleTagUsedInToolsField;