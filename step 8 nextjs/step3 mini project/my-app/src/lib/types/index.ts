export interface PostListProps{
    posts: Array<{
        id: number;
        title: string;
        description: string;
        slug: string;
        createdAt: Date;
        author: {
            name: string;
        } | null
    }>
}

export interface PostCardProps{
      post: {
        id: number;
        title: string;
        description: string;
        slug: string;
        createdAt: Date;
        author: {
            name: string;
        } | null
    }
}

export interface PostContentProps{
        post: {
        id: number;
        title: string;
        description: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date,
        author: {
            name: string;
        } | null
    }
        isAuthor: Boolean
}

export interface DeletePostButtonProps{
    postId: number;
}