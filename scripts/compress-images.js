import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '../public/galley');

async function compressImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const isJpeg = ext === '.jpg' || ext === '.jpeg';
    
    // Get original file size
    const originalStats = await fs.stat(inputPath);
    const originalSize = originalStats.size;
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    const maxWidth = 1200;
    const maxHeight = 1200;
    
    let sharpInstance = sharp(inputPath);
    
    // Resize if needed
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    const tempPath = inputPath + '.tmp';
    
    // Compress - convert PNGs to JPG for better compression
    await sharpInstance
      .jpeg({ 
        quality: 85,
        mozjpeg: true,
        progressive: true
      })
      .toFile(tempPath);
    
    const compressedStats = await fs.stat(tempPath);
    const compressedSize = compressedStats.size;
    
    // Replace original if compressed version is smaller
    if (compressedSize < originalSize) {
      await fs.rename(tempPath, inputPath.replace(/\.png$/i, '.jpg'));
      // Remove original PNG if converted to JPG
      if (!isJpeg && inputPath.toLowerCase().endsWith('.png')) {
        await fs.unlink(inputPath).catch(() => {});
      }
      return {
        success: true,
        originalSize,
        compressedSize,
        savings: ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
      };
    } else {
      await fs.unlink(tempPath);
      return { success: false, reason: 'No improvement' };
    }
  } catch (error) {
    try {
      await fs.unlink(inputPath + '.tmp');
    } catch {}
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🖼️  Starting image compression...\n');
  
  try {
    const files = await fs.readdir(GALLERY_DIR);
    const imageFiles = files
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .map(f => path.join(GALLERY_DIR, f));
    
    if (imageFiles.length === 0) {
      console.log('No images found.');
      return;
    }
    
    console.log(`Found ${imageFiles.length} images\n`);
    
    let totalOriginal = 0;
    let totalCompressed = 0;
    let successCount = 0;
    
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const fileName = path.basename(file);
      process.stdout.write(`[${i + 1}/${imageFiles.length}] ${fileName}... `);
      
      const result = await compressImage(file);
      
      if (result.success) {
        totalOriginal += result.originalSize;
        totalCompressed += result.compressedSize;
        successCount++;
        const sizeMB = (result.compressedSize / 1024 / 1024).toFixed(2);
        console.log(`✅ Saved ${result.savings}% (${sizeMB} MB)`);
      } else {
        console.log(`⏭️  ${result.reason || result.error || 'Skipped'}`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Compression Summary');
    console.log('='.repeat(60));
    console.log(`Compressed: ${successCount}/${imageFiles.length} images`);
    console.log(`Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Compressed: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
    const totalSavings = totalOriginal > 0 ? ((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1) : 0;
    console.log(`Saved: ${((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2)} MB (${totalSavings}%)`);
    console.log('='.repeat(60));
    console.log('\n✅ Compression complete!');
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
