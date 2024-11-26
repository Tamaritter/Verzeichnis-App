import * as fs from 'node:fs';
import path from 'path';

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.md');
}

function readMDXFile(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8');
}

export function getTutorials() {
  const dir = path.join(process.cwd(), 'src', 'content', 'tutorials');
  const tutorialFiles = getMDXFiles(dir);

  return tutorialFiles.map(file => {
    const content = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      slug,
      content,
    };
  });
}
