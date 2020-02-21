import React from "react";
import firebase from "../../firebase.utils";
import AvatarEditor from "react-avatar-editor";
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  Button
} from "semantic-ui-react";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    previewImage: "",
    croppedImage: "",
    blob: "",
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    usersRef: firebase.storage().ref("users"),
    metadata: {
      contentType: "image/jpeg"
    },
    uploadedCroppedImage: ""
  };
  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleCroppedImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob
        });
      });
    }
  };

  uploadCroppedImage = () => {
    const { storageRef, userRef, metadata, blob } = this.state;
    storageRef
      .child(`avatars/users/${userRef.uid}`)
      .put(blob, metadata)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadUrl => {
          this.setState({ uploadedCroppedImage: downloadUrl }, () =>
            this.changeAvatar()
          );
        });
      });
  };

  changeAvatar = () => {
    this.state.userRef
      .updateProfile({
        photoURL: this.state.uploadedCroppedImage
      })
      .then(() => {
        console.log("PhotoURL updated..");
        this.closeModal();
      })
      .catch(err => {
        console.error(err);
      });

    this.state.usersRef
      .child(this.state.user.uid)
      .updateMetadata({ avatar: this.state.uploadedCroppedImage })
      .then(() => {
        console.log("User avatar changed successfully");
      })
      .catch(err => {
        console.error(err);
      });
  };

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed In as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span onClick={this.openModal}>Change Avatar</span>
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
    const { user, modal, previewImage, croppedImage } = this.state;
    const { primaryColor } = this.state;
    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2rem", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="lab" />
              <Header.Content>Geek Chat</Header.Content>
            </Header>
            <Header style={{ padding: "0.3rem" }} as="h3" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Row>
          {/* Change user avatar modal */}
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input
                onChange={this.handleChange}
                fluid
                type="file"
                label="New Avatar"
                name="previewImage"
              />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui center aligned grid">
                    {previewImage && (
                      <AvatarEditor
                        ref={node => (this.avatarEditor = node)}
                        image={previewImage}
                        width={220}
                        height={220}
                        border={40}
                        scale={1.2}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column>
                    {croppedImage && (
                      <Image
                        style={{ margin: "3.5rem auto" }}
                        height={100}
                        width={100}
                        src={croppedImage}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {croppedImage && (
                <Button
                  color="green"
                  inverted
                  onClick={this.uploadCroppedImage}
                >
                  <Icon name="save" />
                  Change Avatar
                </Button>
              )}
              <Button color="green" inverted onClick={this.handleCroppedImage}>
                <Icon name="image" />
                Preview
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" />
                Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
