import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    const { channelName, numUniqueUsers, handleSearchChange } = this.props;
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
            {channelName} <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
          {/* channel search input  */}
        </Header>
        <Header floated="right">
          <Input
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
