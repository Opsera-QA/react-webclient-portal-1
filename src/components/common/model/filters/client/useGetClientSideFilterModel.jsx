import ClientSideFilterModel from "components/common/model/filters/client/clientSide.filter.model";

export default function useGetClientSideFilterModel() {
  const getClientSideFilterModel = () => {
    return new ClientSideFilterModel();
  };

  return ({
    getClientSideFilterModel: getClientSideFilterModel,
  });
}
