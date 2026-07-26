import { IPost } from "@/lib/type";
import Image from "next/image";

export function NewsDetails({ post }: { post: IPost }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      
      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="relative h-64 w-full overflow-hidden rounded-xl sm:h-80">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {post.isPremium && (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
            Premium
          </span>
        )}
        {post.isFeatured && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            Featured
          </span>
        )}
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {/* Author */}
        {post.author && (
          <>
            <span>✍️ {post.author.name}</span>
            <span>•</span>
          </>
        )}
        <span>👁 {post.views} views</span>
        <span>•</span>
        {post._count && (
          <>
            <span>💬 {post._count.comments} comments</span>
            <span>•</span>
          </>
        )}
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Status */}
      <div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          {post.status}
        </span>
      </div>

      <hr className="border-muted" />

      {/* Content */}
      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <p>{post.content}</p>
      </div>

      {/* Comments */}
      {post.comments && post.comments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Comments</h2>
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-muted p-4 text-sm text-muted-foreground"
            >
              <p className="font-medium text-foreground">{comment.authorId}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}