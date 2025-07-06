import { Schema, model, Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  authorId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    content: { type: String, required: true, minlength: 10 },
    authorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
