import axios from './axios';
import { useEffect, useState } from 'react'
import './App.scss'
import ModalUpsert from './ModalUpsert';

const App = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('C'); //create
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    getListTutorials();
  }, []);
  const getListTutorials = async () => {
    const res = await axios.get("/");
    setListTutorials(res);
  }

  const handleDelete = async (id) => {
    if (confirm(`Are you sure to delete this tutorial, id = ${id}`)) {
      await axios.delete(`/${id}`);
      await getListTutorials();
    }
  }

  return (
    <div className="App">

      <div>List tutorial</div>
      <div className='my-3'>
        <button className="btn btn-primary" onClick={() => {
          setShowModal(true);
          setAction('C');
        }}>Add new</button>
      </div>
      <div>
        <table className='table-bordered table table-hover'>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Published</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listTutorials?.map((item, index) => {
              return (
                <tr key={`${index}-tutorials`}>
                  <td>
                    {item.id}
                  </td>
                  <td>
                    {item.title}
                  </td>
                  <td>
                    {item.description}
                  </td>
                  <td>
                    {"" + item.published}
                  </td>
                  <td>
                    <button
                      className='btn btn-warning mx-3 d-inline-block'
                      onClick={() => {
                        setShowModal(true);
                        setAction('U');
                        setDataModal(item)
                      }}
                    >Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <ModalUpsert
        show={showModal}
        action={action}
        setShowModal={setShowModal}
        dataModal={dataModal}
        getListTutorials={getListTutorials}
      />
    </div>
  )
}

export default App
