import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from "../../firebase.utils";
class MessagesForm extends React.Component {
  state = {
    message: "",
    loading: false,
    user: this.props.currentUser,
    channel: this.props.currentChannel,
    errors: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      },
      content: this.state.message
    };
    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  };
  render() {
    const { errors, message, loading } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.9rem" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your Message..."
          onChange={this.handleChange}
          value={message}
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            disabled={loading}
            style={{ fontFamily: "Pacifico" }}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            className={
              errors.some(error => error.message.includes("message"))
                ? "error"
                : ""
            }
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
