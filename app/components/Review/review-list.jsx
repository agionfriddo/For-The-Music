import React, { Component } from 'react';
import ReviewItemComponent from './review-item';
import { connect } from 'react-redux';

class ReviewList extends Component {

  render () {
   
    const { reviews } = this.props
    console.log("REVIEW LIST COMPONENT", reviews)
    return (
      <div>
      <h3>Reviews</h3>
        <div className="list-group">
          {
            reviews && reviews.map(review => (
              <div key={ review.id } className="list-group-item">
                <ReviewItemComponent review={ review }/>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}

export default ReviewList;
