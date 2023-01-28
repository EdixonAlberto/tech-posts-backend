import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { PostModel } from '@MODULES/posts/entities/post.entity'
import { CreatePostDto, UpdatePostDto } from '@MODULES/posts/dto'

@Injectable()
export class PostsService {
  constructor(@InjectModel(PostModel) private readonly postModel: ReturnModelType<typeof PostModel>) {}

  public async create(post: CreatePostDto) {
    const createPost = await this.postModel.create(post)
    await createPost.save()
    return createPost
  }

  public async findAll() {
    const posts = await this.postModel.find()
    return posts
  }

  public async findOne(id: string) {
    const post = await this.postModel.findById(id)
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
