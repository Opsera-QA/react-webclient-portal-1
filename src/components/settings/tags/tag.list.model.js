import ListModelBase from "core/data_model/list.model.base";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";

// TODO: Should we handle RBAC for adding in here?
export class TagListModel extends ListModelBase{
  constructor(authContext, setStateFunction) {
    super(authContext, setStateFunction);
    this.topicName = liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.TAGS;
  }
}