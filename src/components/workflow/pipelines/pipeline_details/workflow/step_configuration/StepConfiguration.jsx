import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner, faCog } from "@fortawesome/pro-light-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const INITIAL_DATA = {
  name: "",
  tool_type: "",
  type: "",
  tool_identifier: "",
  active: true,
};

function StepConfiguration({ data, stepId, parentCallback, handleCloseClick }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const { plan } = data.workflow;
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lockTool, setLockTool] = useState(false);
  const [toolList, setToolList] = useState([]);
  const [isToolListSearching, setIsToolListSearching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      if (plan && stepId) {
        try {
          setIsLoading(true);
          setLockTool(false);
          const stepIndex = getStepIndex(stepId);
          await loadFormData(plan[stepIndex]);
          await fetchToolDetails();
          setIsLoading(false);
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("Request was canceled via controller.abort");
            return;
          }
        }
      }
    };
    runEffect();
    return () => {
      setIsLoading(false);
      controller.abort();
    };
  }, [stepId, plan]);


  const fetchToolDetails = async () => {
    try {
      setIsToolListSearching(true);
      const params = { status: "active", usage: "pipeline" };
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get("/registry/tools", { params });
      setToolList(toolResponse.data);
      setIsToolListSearching(false);
    } catch (err) {
      toastContext.showLoadingErrorDialog(err);
    }
  };


  const loadFormData = async (step) => {
    setFormData(INITIAL_DATA);

    setFormData({
      name: step.name,
      type: step.type[0],
      tool_identifier: step.tool && step.tool.tool_identifier ? step.tool.tool_identifier : "",
      active: step.active ? true : false,
    });

    if (step.tool && step.tool.tool_identifier.length > 0) {
      setLockTool(true);
    }
  };

  const callbackFunction = async () => {
    setIsSaving(true);

    const stepArrayIndex = getStepIndex(stepId);

    if (validateRequiredFields() && plan[stepArrayIndex] !== undefined) {
      plan[stepArrayIndex].name = formData.name;
      plan[stepArrayIndex].type[0] = formData.type;
      plan[stepArrayIndex].tool_classification = formData.type;
      plan[stepArrayIndex].step_classification = "primary";
      plan[stepArrayIndex].tool = { ...plan[stepArrayIndex].tool, tool_identifier: formData.tool_identifier };
      plan[stepArrayIndex].active = formData.active;
      await parentCallback(plan);
    }
    setIsSaving(false);
  };

  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex((x) => x._id === step_id);
    return stepArrayIndex;
  };

  const validateRequiredFields = () => {
    if (formData.name.length === 0 || formData.tool_identifier.length === 0) {
      toastContext.showMissingRequiredFieldsErrorDialog();
      return false;
    }
    return true;
  };

  const handleToolIdentifierChange = (selectedOption) => {
    setFormData({ ...formData, tool_identifier: selectedOption.identifier, type: selectedOption.tool_type_identifier });
  };

  return (
    <Form>
      <div className="text-muted mt-1 mb-3">
        A pipeline step represents a tool and an operation. Each step requires a tool to be selected along with a
        display name. After the tool is selected, the step can be edited by clicking on the cog icon (
        <FontAwesomeIcon icon={faCog} fixedWidth className="text-muted" />) and then the individual operations for that
        step can be defined. If the tool requires configuration information, jobs or accounts, you must configure those
        in the Tool Registry before setting up the step.
      </div>
      <div className="mt-4 mb-4">
        <Form.Check
          type="switch"
          id="enabled-switch"
          label="Step Enabled"
          className="text-right text-muted"
          checked={formData.active ? true : false}
          onChange={() => setFormData({ ...formData, active: !formData.active })}
        />

        <Form.Group controlId="name" className="mt-2">
          <Form.Label>Step Name*</Form.Label>
          <Form.Control
            maxLength="50"
            type="text"
            disabled={!formData.active}
            placeholder=""
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="tool" className="mt-3">
          <Form.Label>
            Tool*{" "}
            {isToolListSearching && <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />}
          </Form.Label>
          {formData.tool_identifier && formData.tool_identifier.length > 0 && lockTool ? (
            <>
              <Form.Control
                maxLength="50"
                type="text"
                disabled={true}
                placeholder=""
                value={
                  (toolList[toolList.findIndex((x) => x.identifier === formData.tool_identifier)] &&
                    toolList[toolList.findIndex((x) => x.identifier === formData.tool_identifier)].name) ||
                  ""
                }
              />
            </>
          ) : (
            <>
              <DropdownList
                data={toolList}
                valueField="identifier"
                value={toolList[toolList.findIndex((x) => x.identifier === formData.tool_identifier)]}
                busy={!formData.active ? false : Object.keys(toolList).length === 0 ? true : false}
                disabled={!formData.active}
                textField="name"
                filter="contains"
                groupBy={(tool) => capitalizeFirstLetter(tool.tool_type_name, " ", "Undefined Type")}
                onChange={handleToolIdentifierChange}
              />
              <Form.Text className="text-muted">
                Tool cannot be changed after being set. The step would need to be deleted and recreated to change the
                tool.
              </Form.Text>
            </>
          )}
        </Form.Group>
      </div>

      <Button
        variant="primary"
        className="mt-2"
        disabled={isLoading || isSaving}
        onClick={() => callbackFunction()}>
        {isSaving ?
          <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> :
          <FontAwesomeIcon icon={faSave} fixedWidth className="mr-1"/>
        }
        Save
      </Button>

      <Button
        variant="secondary"
        type="button"
        className="mt-2 ml-2"
        disabled={isSaving}
        onClick={() => {
          handleCloseClick();
        }}
      >
        <FontAwesomeIcon icon={faTimes} className="mr-1" /> Close
      </Button>

      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

StepConfiguration.propTypes = {
  data: PropTypes.object,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  handleCloseClick: PropTypes.func,
};

export default StepConfiguration;
