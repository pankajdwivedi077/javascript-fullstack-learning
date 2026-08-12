import { Injectable } from '@nestjs/common';

export interface Blog {
  id: number;
  blogTitle: string;
  blogUniqueKey: string;
}

@Injectable()
export class BlogService {
  private readonly blogs = [
    {
      id: 1,
      blogTitle: 'Blog1',
      blogUniqueKey: 'blogUniqueKey1',
    },
    {
      id: 2,
      blogTitle: 'Blog2',
      blogUniqueKey: 'blogUniqueKey2',
    },
  ];

  findAll(): Blog[]  {
    return this.blogs;
  }

  findById(id: number) : Blog | undefined {
     return this.blogs.find(blog => blog.id === id);
  }

  findByUniqueKey(key: string) : Blog | undefined {
    return this.blogs.find(blog => blog.blogUniqueKey === key);
  }

}
