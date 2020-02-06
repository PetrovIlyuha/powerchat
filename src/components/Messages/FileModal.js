import React, { useState } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

export default function FileModal({ modal, closeModal }) {
  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input fluid label="File types: jpg, png" name="file" type="file" />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted>
          <Icon name="checkmark" />
          Upload
        </Button>
        <Button color="red" onClick={closeModal} inverted>
          <Icon name="remove" />
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
