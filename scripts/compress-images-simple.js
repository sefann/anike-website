import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GALLERY_DIR = join(__dirname, '../public/galley');

async function compressImage(inputPath) {
  try {
    const ext = extname(inputPath).toLowerCase();
    const isJpeg = ext === '.jpg' || ext === '.jpeg';
    
    // Get original file size
    const originalStats = await stat(inputPath);
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
    
    // Compress
    if (isJpeg) {
      await sharpInstance
        .jpeg({ 
          quality: 85,
          mozjpeg: true,
          progressive: true
        })
        .toFile(tempPath);
    } else {
      await sharpInstance
        .png({ 
          quality: 85,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(tempPath);
    }
    
    const compressedStats = await stat(tempPath);
    const compressedSize = compressedStats.size;
    
    if (compressedSize < originalSize) {
      await rename(tempPath, inputPath);
      return {
        success: true,
        originalSize,
        compressedSize,
        savings: ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
      };
    } else {
      await unlink(tempPath);
      return { success: false, reason: 'No improvement' };
    }
  } catch (error) {
    try {
      await unlink(inputPath + '.tmp');
    } catch {}
    return { success: false, error: error.message };
  }
}

async function main() {
  const { writeFile } = await import('fs/promises');
  const logFile = join(__dirname, '../compression-log.txt');
  const logs = [];
  
  const log = (...args) => {
    const msg = args.join(' ');
    console.log(...args);
    logs.push(msg);
  };
  
  log('Starting image compression...\n');
  
  try {
    const files = await readdir(GALLERY_DIR);
    const imageFiles = files
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .map(f => join(GALLERY_DIR, f));
    
    if (imageFiles.length === 0) {
      console.log('No images found.');
      return;
    }
    
    log(`Found ${imageFiles.length} images\n`);
    
    let totalOriginal = 0;
    let totalCompressed = 0;
    let successCount = 0;
    
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const fileName = basename(file);
      const msg = `[${i + 1}/${imageFiles.length}] ${fileName}... `;
      process.stdout.write(msg);
      logs.push(msg);
      
      const result = await compressImage(file);
      
      if (result.success) {
        totalOriginal += result.originalSize;
        totalCompressed += result.compressedSize;
        successCount++;
        const sizeMB = (result.compressedSize / 1024 / 1024).toFixed(2);
        const successMsg = `OK - Saved ${result.savings}% (${sizeMB} MB)`;
        console.log(successMsg);
        logs.push(successMsg);
      } else {
        const skipMsg = `SKIP - ${result.reason || result.error}`;
        console.log(skipMsg);
        logs.push(skipMsg);
      }
    }
    
    const summary = [
      '',
      '='.repeat(50),
      `Compressed: ${successCount}/${imageFiles.length} images`,
      `Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`,
      `Compressed: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`,
      `Saved: ${((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2)} MB (${(((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1)}%)`,
      '='.repeat(50)
    ];
    
    summary.forEach(line => {
      console.log(line);
      logs.push(line);
    });
    
    // Write log to file
    await writeFile(logFile, logs.join('\n'));
    console.log(`\nLog saved to: ${logFile}`);
    
  } catch (error) {
    const errorMsg = `Error: ${error.message}`;
    console.error(errorMsg);
    logs.push(errorMsg);
    await writeFile(logFile, logs.join('\n'));
    process.exit(1);
  }
}

main();
