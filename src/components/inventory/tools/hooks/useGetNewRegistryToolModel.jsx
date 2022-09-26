import { useState } from "react";
import useGetRegistryToolModel from "components/inventory/tools/hooks/useGetRegistryToolModel";

export default function useGetNewRegistryToolModel() {
  const { getRegistryToolModel } = useGetRegistryToolModel();
  const [toolModel, setToolModel] = useState(getRegistryToolModel(undefined, true));

  return ({
    toolModel: toolModel,
    setToolModel: setToolModel,
  });
}
