import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { useStore } from "react-redux";

class DirectMessages extends React.Component {
  state = {
    users: []
  };
  render() {
    const { users } = this.state;
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" />
            Direct Messages
          </span>{" "}
          ({users.length})
        </Menu.Item>
        {/* Users to send direct messages */}
      </Menu.Menu>
    );
  }
}

export default DirectMessages;
