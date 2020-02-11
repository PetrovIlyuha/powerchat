import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    const {
      channelName,
      numUniqueUsers,
      handleSearchChange,
      searchLoading,
      isPrivateChannel,
      isChannelStarred,
      handleStar
    } = this.props;
    return (
      <Segment clearing>
        {/* Channel title */}
        <Header
          fluid="true"
          as="h2"
          floated="left"
          style={{ marginBottom: "0", fontFamily: "Pacifico" }}
        >
          <span>
            {channelName}{" "}
            {!isPrivateChannel && (
              <Icon
                onClick={handleStar}
                name={isChannelStarred ? "star" : "star outline"}
                color={isChannelStarred ? "yellow" : "black"}
              />
            )}
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
          {/* channel search input  */}
        </Header>
        <Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
