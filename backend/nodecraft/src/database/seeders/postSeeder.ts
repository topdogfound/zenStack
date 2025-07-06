import { Post } from '../../app/models/Post';

export async function seedPosts() {
  const count = await Post.countDocuments();
  if (count === 0) {
    await Post.create([
      {
        title: 'Welcome to Nexar',
        content: 'This is the first post.',
        authorId: '64c33a0a1f1c2d3e4f567890', // Example userId
      },
    ]);
  }
}
