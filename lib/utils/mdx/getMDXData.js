import path from "path";
import {
  getFilesByExtension,
  readFileContent,
  getSlugFromFile,
} from "@/lib/utils/files";
import { mdxParser } from "@/lib/utils/mdx/mdxParser";

export function parseMDXFrontmatter(fileContent) {
  return mdxParser(fileContent);
}

export function getMDXData(filePath, readFileContentFn = readFileContent) {
  const fileContent = readFileContentFn(filePath);
  const { metadata, content } = parseMDXFrontmatter(fileContent);
  const slug = getSlugFromFile(filePath);

  return {
    slug,
    metadata,
    content,
  };
}

export function getMDXPages(directory) {
  const pages = getFilesByExtension(directory, ".mdx");
  return pages.map((fileName) => {
    const filePath = path.join(directory, fileName);
    return getMDXData(filePath);
  });
}

export function getMDXPage(slug, directory = "markdown-pages") {
  const pages = getMDXPages(directory);
  return pages.find((page) => page.slug === slug);
}

export function getMDXPagePaths(directory = "markdown-pages") {
  return getMDXPages(directory).map((page) => ({
    params: {
      slug: page.slug,
    },
  }));
}
