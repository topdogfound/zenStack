import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Post } from '../models/Post';

const sendValidationErrors = (res: Response, errors: any) =>
  res.status(422).json({ errors: errors.array() });

export const createPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendValidationErrors(res, errors);

  try {
    const { title, content } = req.body;
    const authorId = req.user.id; // assuming auth middleware sets req.user
    const post = await Post.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendValidationErrors(res, errors);

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendValidationErrors(res, errors);

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    // Check ownership (assuming req.user.id)
    if (post.authorId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    res.json(post);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendValidationErrors(res, errors);

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.authorId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAllPosts = async (req: Request, res: Response) => {
  try {
    // Optionally restrict to admin or user posts only
    await Post.deleteMany({ authorId: req.user.id });
    res.json({ message: 'All your posts deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
