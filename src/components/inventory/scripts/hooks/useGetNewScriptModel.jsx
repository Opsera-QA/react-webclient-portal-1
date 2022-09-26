import useGetScriptModel from "components/inventory/scripts/hooks/useGetScriptModel";
import { useState } from "react";

export default function useGetNewScriptModel() {
  const { getNewScriptModel } = useGetScriptModel();
  const [scriptModel, setScriptModel] = useState(getNewScriptModel(undefined, true));

  return ({
    scriptModel: scriptModel,
    setScriptModel: setScriptModel,
  });
}
