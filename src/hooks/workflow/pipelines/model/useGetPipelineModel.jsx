import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineModel from "components/workflow/pipeline.model";

export default function useGetPipelineModel() {
  const {
    userData,
  } = useComponentStateReference();

  const getPipelineModel = (pipeline, isNew) => {
    const newModel = new PipelineModel(
      pipeline,
      isNew,
    );

    return newModel;
  };

  return ({
    getPipelineModel: getPipelineModel,
  });
}
