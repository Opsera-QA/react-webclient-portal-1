import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";

export default function useGetPlatformTags(handleErrorFunction) {
  const tagActions = useTagActions();
  const [platformTags, setPlatformTags] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setPlatformTags([]);

    if (loadData) {
      loadData(getPlatformTags, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getPlatformTags = async () => {
    setPlatformTags([]);
    const response = await tagActions.getPlatformTags();
    setPlatformTags(DataParsingHelper.parseArray(response?.data?.data, []));
  };

  return ({
    platformTags: platformTags,
    setPlatformTags: setPlatformTags,
    loadData: () => loadData(getPlatformTags, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
