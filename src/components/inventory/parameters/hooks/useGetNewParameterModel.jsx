import { useState } from "react";
import useGetParameterModel from "components/inventory/parameters/hooks/useGetParameterModel";

export default function useGetNewParameterModel() {
  const { getNewParameterModel } = useGetParameterModel();
  const [parameterModel, setParameterModel] = useState(getNewParameterModel(undefined, true));

  return ({
    parameterModel: parameterModel,
    setParameterModel: setParameterModel,
  });
}
