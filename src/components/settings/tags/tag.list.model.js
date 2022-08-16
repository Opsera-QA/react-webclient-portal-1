import {LIVE_MESSAGE_TOPICS, LIVE_MESSAGE_TYPES} from "core/websocket/constants/liveMessage.constants";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ListModelBase from "core/data_model/list.model.base";

// TODO: Should we handle RBAC for adding in here?
export class TagListModel extends ListModelBase{
  constructor(authContext, setStateFunction) {
    super(authContext, setStateFunction);
    this.topicName = LIVE_MESSAGE_TOPICS.TAGS;
  }
}