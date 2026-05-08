import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownDocument {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
  content: string;
}

export function getMarkdownFiles(folder: string): MarkdownDocument[] {
  const directory = path.join(contentDirectory, folder);
  if (!fs.existsSync(directory)) return [];

  const filenames = fs.readdirSync(directory);
  
  return filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const fullPath = path.join(directory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: filename.replace(/\.md$/, ''),
        frontmatter: data,
        content,
      };
    });
}

export function getMarkdownFile(folder: string, slug: string): MarkdownDocument | null {
  try {
    const fullPath = path.join(contentDirectory, folder, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    return null;
  }
}
