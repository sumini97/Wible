import * as React from "react";
import { connect } from "react-redux";
import { Box, Typography, Rating } from "@mui/material/";

function ReviewList(props) {
  const comments = props.comments;

  return (
    <>
      {/* 리뷰 */}
      <Box sx={{ ml: 3, my: 1 }}>
        {comments &&
          comments.map((comment, index) => {
            return (
              <Box sx={{ mb: 0.5, display: "flex" }} key={index}>
                <Rating name="size-medium" value={comment.reviewScore / 2} precision={0.5} sx={{ mx: 2 }} readOnly />
                <Typography>{comment.reviewText}</Typography>
              </Box>
            );
          })}
      </Box>
    </>
  );
}

function mapStateToProps(state) {
  return { userSlice: state.user };
}

export default connect(mapStateToProps)(ReviewList);
