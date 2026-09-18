import { PostContentProps } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import DeleteButton from "./delete-post-button";

export default function PostContent({post, isAuthor}: PostContentProps){
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">
                    {post?.title}
                </CardTitle>
                <CardDescription>
                    By {post.author?.name} - {formDate(post.createdAt)}
                </CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground text-lg mb-6">{post.description}</p>
            </CardContent>
            {
                isAuthor && (
                    <CardFooter>
                        <div className="flex gap-2">
                            <Button variant="default" asChild size="sm">
                                <Link href={`/post/edit/${post.slug}`}>
                                <PencilIcon className="h-4 wo-4 mr-2" />
                                Edit
                                </Link>
                            </Button>
                            <DeleteButton postId={post.id} />
                        </div>
                    </CardFooter>
                )
            }
        </Card>
    )
}