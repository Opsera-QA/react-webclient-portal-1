import useComponentStateReference from "hooks/useComponentStateReference";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import PipelineInstructionsModel from "components/workflow/instructions/pipelineInstructions.model";

export default function useGetPipelineInstructionsModel() {
  const {
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  const getPipelineInstructionsModel = (
    pipelineInstructionsData,
    isNew,
    setStateFunction,
    loadDataFunction,
  ) => {
    const newPipelineInstructionModel = new PipelineInstructionsModel(
      pipelineInstructionsData,
      isNew,
      setStateFunction,
      loadDataFunction,
    );
    newPipelineInstructionModel.getAccessToken = getAccessToken;
    newPipelineInstructionModel.cancelTokenSource = cancelTokenSource;
    newPipelineInstructionModel.userData = userData;

    if (isNew === true) {
      newPipelineInstructionModel.setData("roles", RoleHelper.getInitialRolesArray(userData));
    }

    return newPipelineInstructionModel;
  };

  return ({
    getPipelineInstructionsModel: getPipelineInstructionsModel,
  });
}
