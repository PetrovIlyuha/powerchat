import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    channels: [],
    channelName: "",
    channelDetails: "",
    modal: false
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { modal } = this.state;
    const { channels } = this.state;
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
        </Menu.Menu>
        {/* // Add channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form>
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
            <Button color="#17b978" style={{ color: "#17b978" }}>
              <Icon name="checkmark" />
              Add
            </Button>
            <Button color="#fc5185" inverted onClick={this.closeModal}>
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
