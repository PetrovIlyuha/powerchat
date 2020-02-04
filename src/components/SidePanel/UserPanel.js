import React from "react";
import { Grid, Header, Icon } from "semantic-ui-react";

class UserPanel extends React.Component {
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
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
