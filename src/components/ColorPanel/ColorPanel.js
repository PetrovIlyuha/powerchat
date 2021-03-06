import React from "react";
import firebase from "../../firebase.utils";
import { setColors } from "../../actions";
import { connect } from "react-redux";
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment
} from "semantic-ui-react";
import { SketchPicker } from "react-color";
class ColorPanel extends React.Component {
  state = {
    modal: false,
    primary: "",
    secondary: "",
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
    userColors: []
  };
  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }
  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = () => {
    this.state.usersRef.child(`${this.state.user.uid}/colors`).off();
  };

  addListener = userUid => {
    let userColors = [];
    this.state.usersRef.child(`${userUid}/colors`).on("child_added", snap => {
      userColors.unshift(snap.val());
      this.setState({ userColors });
    });
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  handleChangePrimary = color => this.setState({ primary: color.hex });
  handleChangeSecondary = color => this.setState({ secondary: color.hex });

  handleSaveColors = () => {
    const { primary, secondary } = this.state;
    if (primary && secondary) {
      this.saveColors(primary, secondary);
    }
  };

  saveColors = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.state.user.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(() => {
        console.log("Colors added");
        this.closeModal();
      })
      .catch(err => console.error(err));
  };

  displayUserColors = colors => {
    return (
      colors.length > 0 &&
      colors.map((color, i) => {
        return (
          <React.Fragment key={i}>
            <Divider />
            <div
              className="color__container"
              onClick={() =>
                this.props.setColors(color.primary, color.secondary)
              }
            >
              <div
                className="color__square"
                style={{ background: color.primary }}
              >
                <div
                  className="color__overlay"
                  style={{ background: color.secondary }}
                ></div>
              </div>
            </div>
          </React.Fragment>
        );
      })
    );
  };

  render() {
    const { modal, primary, secondary, userColors } = this.state;
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="red" onClick={this.openModal} />
        {this.displayUserColors(userColors)}
        {/* Color Picker Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App Colors</Modal.Header>
          <Modal.Content>
            <Segment className="color-picker" inverted>
              <Label content="Primary color" />
              <SketchPicker
                onChange={this.handleChangePrimary}
                color={primary}
              />
            </Segment>
            <Segment className="color-picker" inverted>
              <Label content="Secondary color" />
              <SketchPicker
                onChange={this.handleChangeSecondary}
                color={secondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSaveColors}>
              <Icon name="checkmark" />
              Save Colors
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default connect(null, { setColors })(ColorPanel);
