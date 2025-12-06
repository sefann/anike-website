import sharp from 'sharp';
import { stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testImage = join(__dirname, '../public/galley/ACCA-03.jpg');

async function test() {
  try {
    console.log('Testing compression on one image...');
    console.log('Image:', testImage);
    
    const originalStats = await stat(testImage);
    console.log('Original size:', (originalStats.size / 1024 / 1024).toFixed(2), 'MB');
    
    const metadata = await sharp(testImage).metadata();
    console.log('Dimensions:', metadata.width, 'x', metadata.height);
    
    const tempPath = testImage + '.test.tmp';
    await sharp(testImage)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true, progressive: true })
      .toFile(tempPath);
    
    const compressedStats = await stat(tempPath);
    console.log('Compressed size:', (compressedStats.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('Savings:', (((originalStats.size - compressedStats.size) / originalStats.size) * 100).toFixed(1), '%');
    
    // Clean up
    const { unlink } = await import('fs/promises');
    await unlink(tempPath);
    
    console.log('Test successful!');
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  }
}

test();
