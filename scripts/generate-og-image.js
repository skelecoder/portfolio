import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const width = 1200;
const height = 630;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient
const bgGradient = ctx.createLinearGradient(0, 0, width, height);
bgGradient.addColorStop(0, '#0a0a0f');
bgGradient.addColorStop(1, '#1a1a2e');
ctx.fillStyle = bgGradient;
ctx.fillRect(0, 0, width, height);

// Grid pattern
ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
ctx.lineWidth = 1;
for (let x = 0; x <= width; x += 60) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.stroke();
}
for (let y = 0; y <= height; y += 60) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();
}

// Accent line with gradient
const accentGradient = ctx.createLinearGradient(80, 0, 200, 0);
accentGradient.addColorStop(0, '#00d9ff');
accentGradient.addColorStop(1, '#7b2dff');
ctx.fillStyle = accentGradient;
ctx.beginPath();
ctx.roundRect(80, 200, 120, 4, 2);
ctx.fill();

// Name
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 72px sans-serif';
ctx.fillText('Amine Bouhlal', 80, 280);

// Subtitle
ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
ctx.font = '32px sans-serif';
ctx.fillText('Tech Entrepreneur · AI Engineer · Founder of X3', 80, 350);

// Domain
ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
ctx.font = '24px monospace';
ctx.fillText('aminebouhlal.com', 80, 550);

// Decorative circles
ctx.strokeStyle = 'rgba(0, 217, 255, 0.2)';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(1050, 150, 80, 0, Math.PI * 2);
ctx.stroke();

ctx.strokeStyle = 'rgba(123, 45, 255, 0.15)';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.arc(1080, 180, 120, 0, Math.PI * 2);
ctx.stroke();

// Save
const buffer = canvas.toBuffer('image/png');
const outputPath = join(__dirname, '../public/og-image.png');
writeFileSync(outputPath, buffer);
console.log('OG image generated:', outputPath);
