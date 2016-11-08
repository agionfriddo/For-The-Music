import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class ReviewItem extends Component {
  constructor() {
    super()
  }

	buildStarsBoolean(rating){
			let booleanStars = [];
			for(let i = 0; i < 5; i++){
				booleanStars.push(rating > i);
			}
			return booleanStars;
	}
				
  render() {
    const reviewObj = this.props.reviewObj
		console.log(buildStarsBoolean(reviewObj.rating));
    return (
      <div className="row">
        <div className="col-md-6">
          <h4>{ reviewObj.title } -- { reviewObj.rating } Stars</h4>
          <p>By {reviewObj.user.name }</p>
          <p>{ reviewObj.content }</p>
        </div>
      </div>
    )
  }
}
