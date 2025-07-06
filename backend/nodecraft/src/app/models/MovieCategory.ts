import { Schema, model } from 'mongoose';

const movieCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-z0-9-]+$/, 
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  icon: {
    type: String,
    required: true,
    match: /^[\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF]+$/, // emoji match (rough)
    maxlength: 4
  },
  popularTags: {
    type: [String],
    validate: {
      validator: (tags: string | any[]) => tags.length <= 10,
      message: 'Maximum 10 tags allowed.'
    },
    default: []
  },
  targetAudience: {
    type: String,
    enum: ['Kids', 'Teens', 'Adults', 'All Ages', 'Teens, Adults'],
    required: true
  },
  tone: {
    type: [String],
    validate: {
      validator: (arr: string | any[]) => arr.length > 0,
      message: 'At least one tone is required.'
    },
    enum: ['Intense', 'High-Energy', 'Suspenseful', 'Dark', 'Lighthearted', 'Epic']
  }
}, { timestamps: true });

export const MovieCategory = model('MovieCategory', movieCategorySchema);
