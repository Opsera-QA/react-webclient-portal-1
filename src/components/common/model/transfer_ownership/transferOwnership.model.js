import ModelBase from "core/data_model/model.base";
import { transferOwnershipMetadata } from "components/common/model/transfer_ownership/transferOwnership.metadata";

export default class TransferOwnershipModel extends ModelBase {
  constructor(
    data,
  ) {
    super(
      data,
      transferOwnershipMetadata,
    );
  }

}


