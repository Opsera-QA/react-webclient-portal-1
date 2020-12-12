import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import pipelineActions from "../../../workflow/pipeline-actions";
import {AuthContext} from "../../../../contexts/AuthContext";

// TODO: Implement if needed
function PipelineDetailedSummaryField({ pipelineId }) {
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pipeline, setPipeline] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let response = await pipelineActions.getPipelineById(pipelineId, getAccessToken);
      setPipeline(response.data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  if (!isLoading && pipeline == null) {
    return <span>No Pipeline Found</span>;
  }

  return (
    <div>
    </div>
  );
}

PipelineDetailedSummaryField.propTypes = {
  pipelineId: PropTypes.string,
};

export default PipelineDetailedSummaryField;