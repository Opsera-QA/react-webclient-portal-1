import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useKpiIdentifierActions from "hooks/insights/kpis/useKpiIdentifierActions";

export default function useGetKpiIdentifiers(
  fields,
  status,
  policySupport,
  manualDataEntry,
  handleErrorFunction,
) {
  const [kpiIdentifiers, setKpiIdentifiers] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const kpiIdentifierActions = useKpiIdentifierActions();

  useEffect(() => {
    setKpiIdentifiers([]);

    if (loadData) {
      loadData(getKpiIdentifiers, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getKpiIdentifiers = async () => {
    setKpiIdentifiers([]);

    const response = await kpiIdentifierActions.getKpis(
      status,
      policySupport,
      manualDataEntry,
    );
    const identifiers = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setKpiIdentifiers([...identifiers]);
  };

  return ({
    kpiIdentifiers: kpiIdentifiers,
    setKpiIdentifiers: setKpiIdentifiers,
    loadData: async () => loadData(async () => getKpiIdentifiers(), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
