import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
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
            Channel <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>2 Users</Header.Subheader>
          {/* channel search input  */}
        </Header>
        <Header floated="right">
          <Input
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
