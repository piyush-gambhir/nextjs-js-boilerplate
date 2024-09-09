import Link from "next/link";
import { formatDate } from "@/lib/utils/dateTime";
import { getMDXPages } from "@/lib/utils/mdx/getMDXData";

export default function MDXPages() {
  let allPages = getMDXPages("app/markdown-pages/content");
  return (
    <>
      {allPages
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((page) => (
          <Link
            key={page.slug}
            className="mb-4 flex flex-col space-y-1"
            href={`/markdown-pages/${page.slug}`}
          >
            <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
              <p className="w-[100px] tabular-nums">
                {formatDate(page.metadata.publishedAt, {
                  includeRelative: false,
                })}
              </p>
              <div>
                <p className="tracking-tight">{page.metadata.title}</p>
                <p className="text-sm">{page.metadata.summary}</p>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
}
