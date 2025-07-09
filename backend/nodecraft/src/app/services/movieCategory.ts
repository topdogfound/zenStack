import { MovieCategory } from "../models/MovieCategory";

export async function createMovieCategory(data: {
  name: string;
  slug: string;
  description: string;
  icon: string;
  popularTags: string[];
  targetAudience: string;
  tone: string[];
}) {
  const exists = await MovieCategory.findOne({ slug: data.slug });
  if (exists) throw new Error("Category with this slug already exists");

  const category = new MovieCategory(data);
  return category.save();
}
export async function getMovieCategories() {
  return MovieCategory.find().sort({ createdAt: -1 });
}

export async function getMovieCategory(id : string) {
  return MovieCategory.findById(id)
}


export async function doesCategoryExist(categoryId: string): Promise<boolean> {
  const category = await MovieCategory.findById(categoryId);
  return !!category;
}