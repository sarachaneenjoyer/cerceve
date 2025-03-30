document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageInput = document.getElementById('imageInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const frame = new Image();
    frame.src = 'cerceve.png';

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    // Canvas'ı temizle
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Fotoğrafı canvas'a yerleştir ve boyutlandır
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                    const x = (canvas.width - img.width * scale) / 2;
                    const y = (canvas.height - img.height * scale) / 2;
                    
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                    
                    // Çerçeveyi ekle
                    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
                    
                    // İndirme butonunu aktif et
                    downloadBtn.disabled = false;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'cerceveli-fotograf.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}); 