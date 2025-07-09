import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true},
    synopsis: { type: String },
    releaseDate: { type: Date },
    durationMinutes: { type: Number },
    director: String,
    cast: [String],
    category: {
      type: Schema.Types.ObjectId,
      ref: "MovieCategory",
      required: true,
    }, // relation here
    tags: [String],
  },
  { timestamps: true }
);

movieSchema.index({ title: 1 }, { unique: true });


export const Movie = model("Movie", movieSchema);
