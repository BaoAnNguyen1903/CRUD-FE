
import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from './axios';

const ModalUpsert = (props) => {
  const { show, setShowModal, action, dataModal, getListTutorials } = props;
  const [tutorial, setTutorial] = useState({
    id: "",
    title: "",
    description: "",
    published: ""
  });

  useEffect(() => {
    if (dataModal && dataModal.id) {
      setTutorial(dataModal);
    }
  }, [dataModal]);

  const handleInputChange = (event) => {
    setTutorial({
      ...tutorial,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {
    if (action === 'C') {
      await axios.post('/', { ...tutorial });
    } else {
      await axios.put(`/${tutorial.id}`, { ...tutorial });
    }

    setTutorial({
      id: "",
      title: "",
      description: "",
      published: ""
    })

    await getListTutorials();
    setShowModal(false);
  }
  return (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          {action === 'C' ? 'Create a new user' : 'Update the user'}

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className='form-group'>
            <label>Title</label>
            <input type={"text"}
              className="form-control"
              value={tutorial?.title}
              name="title"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label>Description</label>
            <input
              type={"text"}
              className="form-control"
              value={tutorial?.description}
              name="description"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label>Publish: </label>
            <select
              className='form-control'
              value={tutorial?.published}
              name={'published'}
              onChange={(event) => handleInputChange(event)}
            >
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalUpsert;