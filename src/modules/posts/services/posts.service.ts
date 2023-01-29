import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { Types, PipelineStage } from 'mongoose'

import { PostModel, Status } from '@MODULES/posts/entities/post.entity'
import { Role } from '@MODULES/users/entities/user.entity'
import { CreatePostDto, UpdatePostDto } from '@MODULES/posts/dto'

@Injectable()
export class PostsService {
  constructor(@InjectModel(PostModel) private readonly postModel: ReturnModelType<typeof PostModel>) {}

  public async create(post: CreatePostDto, { id }: IUserData) {
    const createPost = await this.postModel.create({
      ...post,
      author: id,
      status: Status.Drafted
    })
    await createPost.save()
    return createPost
  }

  public async findAll({ id, role }: IUserData) {
    const filters = role === Role.User ? [{ $match: { 'author._id': new Types.ObjectId(id) } }] : []

    const posts = await this.postModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'likes',
          foreignField: '_id',
          as: 'likes'
        }
      },
      ...filters
    ])

    return posts
  }

  public async findOne(inputId: string, { id, role }: IUserData) {
    const filters: PipelineStage[] = role === Role.User ? [{ $match: { 'author._id': new Types.ObjectId(id) } }] : []

    const [post] = await this.postModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(inputId)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'likes',
          foreignField: '_id',
          as: 'likes'
        }
      },
      ...filters
    ])

    if (!post) throw new NotFoundException('Post not found')
    return post
  }

  public async update(id: string, postData: UpdatePostDto) {
    const updatePost = await this.postModel.findByIdAndUpdate(id, postData, { new: true })
    if (!updatePost) throw new NotFoundException('Post not found')
    return updatePost
  }

  public async remove(id: string) {
    const deletePost = await this.postModel.findByIdAndDelete(id)
    if (!deletePost) throw new NotFoundException('Post not found')
    return deletePost
  }
}
