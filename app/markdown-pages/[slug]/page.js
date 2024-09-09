import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx/mdx";

import { getMDXPages } from "@/lib/utils/mdx/getMDXData";
import { formatDate } from "@/lib/utils/dateTime";

export async function generateStaticParams() {
  let pages = await getMDXPages("app/markdown-pages/content");
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }) {
  let pages = await getMDXPages("app/markdown-pages/content");
  let page = pages.find((page) => page.slug === params.slug);

  if (!page) {
    return {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
    };
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = page.metadata;

  let ogImage = image
    ? image
    : `${process.env.NEXT_PUBLIC_BASE_URL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/${page.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function MDXPage({ params }) {
  let pages = await getMDXPages("app/markdown-pages/content");
  let page = pages.find((page) => page.slug === params.slug);

  if (!page) {
    notFound();
  }

  return (
    <section>
      <h1 className="title text-2xl font-semibold tracking-tighter">
        {page.metadata.title}
      </h1>
      <div className="mb-8 mt-2 flex items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(page.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={page.content} />
      </article>
    </section>
  );
}
