import React, { Component } from 'react';
import ReviewItemComponent from './review-item';
import { connect } from 'react-redux';

class ReviewList extends Component {

  render () {
    console.log("PROPS IN REVIEW LIST", this.props)
    const { reviews } = this.props

    return (
      <div>
      <h3>Reviews</h3>
        <div className="list-group">
          {
            reviews && reviews.map(review => (
              <div key={ review.id } className="list-group-item">
                <ReviewItemComponent review= { review }/>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}

export default ReviewList;
