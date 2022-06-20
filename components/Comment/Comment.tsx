import React from "react";

interface Props {
  author: string;
  datetime: string;
  comment: string;
}
const Comment: React.FC<Props> = ({ author, datetime, comment }) => {
  return (
    <div className="border p-2 border-round mb-2">
      <div className="d-flex flex-row align-items-center justify-content-between text-muted">
        <div>{author}</div>
        <div>{datetime}</div>
      </div>
      <div className="mt-2">{comment}</div>
    </div>
  );
};

export default Comment;
