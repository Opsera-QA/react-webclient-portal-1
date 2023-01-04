import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Popover} from "react-bootstrap";
import {faBracketsCurly, faInfoCircle, faSync} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import parametersActions from "components/inventory/parameters/parameters-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export default function PipelineStepParameterSelectInputBase(
  {
    model,
    setModel,
    fieldName,
    disabled,
    plan,
    tool_prop,
    pipelineStepId,
    setDataFunction,
  }) {
  const [error, setError] = useState(undefined);
  const [parameters, setParameters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    if (disabled !== true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, []);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await getParameters();
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getParameters = async () => {
    const response = await parametersActions.getParameters(getAccessToken, cancelTokenSource);
    const parsedParameters = DataParsingHelper.parseNestedArray(response, "data.data", []);

    if (isMounted?.current === true) {
      setParameters(parsedParameters);
    }
  };

  const refreshParameters = () => {
    const terraformStep = plan.find((step) => step._id === pipelineStepId);
    const tempCustomParamsObject = DataParsingHelper.parseNestedArray(terraformStep, "tool.configuration.customParameters", []);
    const currentParameters = model?.getArrayData(fieldName);
    const filtered = [];

    for (let index in currentParameters) {

      if (!currentParameters[index]?.outputKey) {
        filtered.push(currentParameters[index]);
      }
    }

    model.setData(fieldName, [...tempCustomParamsObject, ...filtered]);
    setModel({...model});
  };

  const getRefreshButton = () => {
    if (tool_prop && tool_prop.length > 0) {
      return (
        <OverlayTrigger
          trigger="hover"
          rootClose
          placement="top"
          overlay={
            <Popover id="popover-basic" style={{maxWidth: "500px"}}>
              <Popover.Content>
                <div className="text-muted mb-2">
                  Refresh Terraform Output Parameters
                </div>
              </Popover.Content>
            </Popover>
          }
        >
          <IconBase icon={faSync} className={"fa-pull-right pointer pr-2 mt-1 pl-0"}
                    onClickFunction={() => refreshParameters()}/>
        </OverlayTrigger>
      );
    }
  };

  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      selectOptions={parameters}
      error={error}
      fieldName={fieldName}
      valueField={"_id"}
      textField={"name"}
      setDataFunction={setDataFunction}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

PipelineStepParameterSelectInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
  tool_prop: PropTypes.string,
  pipelineStepId: PropTypes.string,
  setDataFunction: PropTypes.func,
};