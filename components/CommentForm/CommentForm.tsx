import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { SingleCommentResponse } from "../../types";
import API from "../API";

interface Props {
  updateStateComments: (comment: SingleCommentResponse) => void;
  recipeId: string;
}
interface commentForm {
  comment: string;
}
const CommentForm: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm<commentForm>();
  const postComment = async (data: commentForm) => {
    const res = await API.postNewComment(props.recipeId, data.comment);
    props.updateStateComments(res);
    reset();
  };
  return session ? (
    <form
      className="d-flex flex-column align-items-end pt-2 border-top "
      onSubmit={handleSubmit(postComment)}
    >
      <div className="form-group w-100">
        <label htmlFor="exampleInputPassword1" className="mb-2">
          Post New Comment
        </label>
        <textarea
          className="form-control"
          id="exampleInputPassword1"
          placeholder="New Comment..."
          {...register("comment")}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Post Comment
      </button>
    </form>
  ) : null;
};

export default CommentForm;
