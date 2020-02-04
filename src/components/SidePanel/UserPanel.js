import React from "react";
import firebase from "../../firebase.utils";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";

class UserPanel extends React.Component {
  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed In as <strong>User</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed Out!"));
  };

  render() {
    return (
      <Grid style={{ background: "#071a52" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2rem", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="lab" />
              <Header.Content>Geek Chat</Header.Content>
            </Header>
          </Grid.Row>
          {/* user Dropdown */}
          <Header style={{ padding: "0.23rem" }} as="h3" inverted>
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
