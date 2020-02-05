import React from "react";
import firebase from "../../firebase.utils";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false
  };

  componentDidMount() {
    this.addListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels });
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("Channel added ✔");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };
  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  closeModal = () => {
    this.setState({ modal: false });
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.name}
        style={{ opacity: "0.8" }}
      >
        # {channel.name}
      </Menu.Item>
    ));

  render() {
    const { modal, channels } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2rem", color: "yellow" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" color="yellow" />
              <span style={{ color: "lightgreen" }}>CHANNELS</span>{" "}
            </span>
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* Channels */}
          {this.displayChannels(channels)}
        </Menu.Menu>
        {/* // Add channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleSubmit}>
              <Icon name="checkmark" />
              Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;