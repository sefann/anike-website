import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '../public/galley');

async function testCompress() {
  try {
    const files = await fs.readdir(GALLERY_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    
    if (imageFiles.length === 0) {
      console.log('No images found.');
      return;
    }
    
    // Test with first image
    const testFile = path.join(GALLERY_DIR, imageFiles[0]);
    const stats = await fs.stat(testFile);
    console.log(`Testing with: ${imageFiles[0]}`);
    console.log(`Original size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
    const metadata = await sharp(testFile).metadata();
    console.log(`Image dimensions: ${metadata.width}x${metadata.height}`);
    console.log(`Format: ${metadata.format}`);
    
    console.log('\n✅ Sharp is working! Ready to compress images.');
    console.log(`Found ${imageFiles.length} images in gallery folder.`);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  }
}

testCompress();






