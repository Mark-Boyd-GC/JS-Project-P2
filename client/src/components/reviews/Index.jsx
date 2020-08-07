import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({ user }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      await getReviews();
    })();
  }, []);

  const getReviews = async () => {
    const reviewsResp = await Axios.get('/api/reviews');
    if (reviewsResp.status === 200) setReviews(reviewsResp.data);
  };

  const deleteReview = async (review) => {
    try {
      const resp = await Axios.post('/api/reviews/delete', {
        id: review._id,
      });

      if (resp.status === 200)
        toast('The review was deleted successfully', {
          type: toast.TYPE.SUCCESS,
        });

      await getReviews();
    } catch (error) {
      toast('There was an error deleting the review', {
        type: toast.TYPE.ERROR,
      });
    }
  };

  function thumbRating(recommendation) {
    if (recommendation === 'Recommended') {
      return <i className='fa fa-thumbs-up'></i>;
    } else {
      return <i className='fa fa-thumbs-down'></i>;
    }
  }

  return (
    <Container className='my-5'>
      <header>
        <h1>Reviews</h1>
      </header>

      <hr />

      <div className='content'>
        {reviews &&
          reviews.map((review, i) => (
            <div key={i} className='card my-3'>
              <div className='card-header'>
                <h5 className='card-title'>{review.title}</h5>
                <small>{review.user.fullname}</small>
              </div>

              <div className='card-body'>
                <p className='card-text'>{review.content}</p>
                <p className='card-text'>
                  Time Played: {review.timePlayed}
                  {review.timePlayed > 1 ? ' hours' : ' hour'}
                </p>

                <p className='card-text'>
                  {thumbRating(review.recommendation)}
                  {' ' + review.recommendation}
                </p>
              </div>

              {user._id === review.user._id ? (
                <div className='card-footer'>
                  <Link
                    to={{
                      pathname: '/reviews/edit',
                      state: {
                        id: review._id,
                      },
                    }}
                    className='btn-edit'
                  >
                    Edit
                  </Link>
                  <Link
                    to=''
                    className='btn-delete'
                    onClick={() => {
                      let result = window.confirm(
                        'Are you sure you want to delete this review?'
                      );
                      if (result) {
                        deleteReview(review);
                      } else return;
                    }}
                  >
                    Delete
                  </Link>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Index;
