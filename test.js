// Generate Receipt
document.getElementById('generateBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;

  if (name === '' || amount === '') {
    throw new Error('One or both inputs are EMPTY');
  } else {
  // Load template image
  const img = new Image();
  img.src = 'Chosen.jpg'; // Your image path
  await img.decode();

  // Set up canvas
  const canvas = document.getElementById('receiptCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // Center text horizontally
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center'; // Key for centering

  // Draw text (centered at x=50% of canvas width)
  ctx.fillText(`Heyy ${name} 😍😍`, canvas.width / 2, 150);
  ctx.fillText(`${amount}, 🚀😎 a fancy Nickame`, canvas.width / 2, 200);
  ctx.fillText(`You are CHOSEN for greatness`, canvas.width / 2, 250);

  canvas.style.width = '100%';
  canvas.style.height = 'auto';

  // Show preview + buttons
  document.getElementById('previewSection').style.display = 'block';

  // Download button
  document.getElementById('downloadBtn').onclick = () => {
    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  };

  // Share button (modern browsers only)
  document.getElementById('shareBtn').onclick = async () => {
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg')
    );
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    navigator
      .share({
        title: 'Your image',
        files: [file],
      })
      .catch(() => alert('Sharing failed (unsupported in this browser)'));
  };
}});
