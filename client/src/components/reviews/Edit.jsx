import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {
  const id = props.location.state.id;

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    timePlayed: '',
    recommendation: '',
  });

  const recommendations = [`Recommended`, `Not Recommended`];

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const reviewResp = await Axios.get(`/api/reviews/${id}`);
      if (reviewResp.status === 200) setInputs(reviewResp.data);
    })();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/reviews/update', inputs);

      if (resp.status === 200) {
        toast('The review was updated successfully', {
          type: toast.TYPE.SUCCESS,
        });
        setRedirect(true);
      } else {
        toast('There was an issue updating the review', {
          type: toast.TYPE.ERROR,
        });
      }
    } catch (error) {
      toast('There was an issue updating the review', {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleInputChange = async (event) => {
    event.persist();

    const { name, value } = event.target;

    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  if (redirect) return <Redirect to='/reviews' />;

  return (
    <Container className='my-5'>
      <header>
        <h1>Edit Review</h1>
      </header>

      <hr />

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name='title'
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as='textarea'
              name='content'
              onChange={handleInputChange}
              value={inputs.date}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time Played (hours):</Form.Label>
            <Form.Control
              type='number'
              name='timePlayed'
              onChange={handleInputChange}
              value={inputs.timePlayed}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Recommended:</Form.Label>
            <Form.Control
              as='select'
              name='recommendation'
              onChange={handleInputChange}
              defaultValue={inputs.recommendation}
            >
              {recommendations.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <button type='submit' className='btn btn-primary'>
              Update
            </button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Edit;
