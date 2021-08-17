import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {Col} from "react-bootstrap";
import DropdownList from "react-widgets/lib/DropdownList";
import pipelineActions from "components/workflow/pipeline-actions";

// TODO: Refactor into two separate SelectInputBase components
function PipelineFilterSelectInput({ pipelineFilter, opseraPipelineSelectChange, stepFilter, setStepFilter }) {
  const { getAccessToken } = useContext(AuthContext);
  const [pipelineFilters, setPipelineFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [disabledPipelines, setDisabledPipelines] = useState([]);

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
      setIsLoading(true);
      await getOpseraPipelineFilterData(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setErrorMessage("Could Not Load Tools");
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getOpseraPipelineFilterData = async (cancelSource = cancelTokenSource) => {
    setPipelineFilters([]);
    const response = await pipelineActions.getPipelinesV3(getAccessToken, cancelSource);
    let items = response?.data?.data;
    let disabledArray = [];

    if (Array.isArray(items) && items.length > 0) {
      let formattedItems = [];
      for (const item in items) {
        let array = [];
        const pipeline = items[item];
        const plan = pipeline?.workflow?.plan;

        if (plan) {
          plan.forEach((step) =>
            array.push({label: step.name, value: step._id})
          );

          formattedItems.push({value: pipeline._id, label: pipeline.name, steps: array});
        }

        if (pipeline?.workflow?.run_count === 0) {
          disabledArray.push({value: pipeline._id, label: pipeline.name});
        }
      }

      if (formattedItems.length > 0) {
        let filterDataApiResponse = [{label: "My Pipelines", options: formattedItems}];
        let formattedFilterData = [];

        // In the API response, since react-widget can't process nested dataset. We need to add a property to group the dataset
        // We are adding 'type': which is label here to achieve groupBy in react-widget
        filterDataApiResponse.forEach((filterGroup) => {
          filterGroup["options"].map((filters) => {
            filters["type"] = filterGroup["label"];
          });
          // console.log(filterDataApiResponse);

          //Since we add type to the dataset, we only need 'options' for the dropdown
          formattedFilterData.push(...filterGroup["options"]);
        });

        setDisabledPipelines(disabledArray);
        setPipelineFilters(formattedFilterData);
      }
    }
  };

  return (
    <>
    <Col className="custom-select-input my-2">
      <label><span>Pipeline</span></label>
      <DropdownList
          data={pipelineFilters}
          busy={isLoading}
          disabled={disabledPipelines}
          valueField="value"
          textField="label"
          filter="contains"
          value={pipelineFilter}
          placeholder={"Select Pipeline Name"}
          onChange={opseraPipelineSelectChange}
        />
      <small className="text-muted form-text">
        <div>Pipelines with no runs are visible in the dropdown but disabled.</div>
      </small>
      </Col>
      <Col className="custom-select-input my-2">
      <label><span>Step</span></label>
        <DropdownList
          data={pipelineFilter.steps}
          busy={Object.keys(pipelineFilters).length === 0}
          disabled={Object.keys(pipelineFilter).length === 0}
          // disabled={true}
          valueField="value"
          textField="label"
          filter="contains"
          value={stepFilter}
          placeholder={"Select Step"}
          onChange={setStepFilter}
        />
      </Col>
    </>
  );
}
PipelineFilterSelectInput.propTypes = {
  pipelineFilter: PropTypes.any,
  opseraPipelineSelectChange: PropTypes.func,
  stepFilter: PropTypes.any,
  setStepFilter: PropTypes.func,
};

export default PipelineFilterSelectInput;