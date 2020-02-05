import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";

class MessagesForm extends React.Component {
  render() {
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.9rem" }}
          label={<Button icon={"add"} />}
        />
        <Button.Group icon widths="2">
          <Button
            style={{ fontFamily: "Pacifico" }}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            style={{ fontFamily: "Pacifico" }}
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessagesForm;
