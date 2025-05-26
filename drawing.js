document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const brushSizeSlider = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const colorOptions = document.querySelectorAll('.color-option');
    const clearBtn = document.getElementById('clearCanvas');
    const saveBtn = document.getElementById('saveDesign');
    const addStickersBtn = document.getElementById('addStickers');
    const stickerPanel = document.getElementById('stickerPanel');
    const stickers = document.querySelectorAll('.sticker');
    
    let isDrawing = false;
    let currentColor = '#ff6781';
    let currentBrushSize = 5;
    let stickerMode = false;
    
    // Set canvas size
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = 600;
        canvas.height = 400;
        
        // Set initial canvas background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    resizeCanvas();
    
    // Brush size control
    brushSizeSlider.addEventListener('input', function() {
        currentBrushSize = this.value;
        brushSizeValue.textContent = this.value;
    });
    
    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            currentColor = this.dataset.color;
            stickerMode = false;
        });
    });
    
    // Set initial active color
    colorOptions[0].classList.add('active');
    
    // Drawing functions
    function startDrawing(e) {
        if (stickerMode) return;
        
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    function draw(e) {
        if (!isDrawing || stickerMode) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = currentBrushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
    
    // Touch support for mobile
    function getTouchPos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Clear canvas
    clearBtn.addEventListener('click', function() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add a fun clear animation
        ctx.fillStyle = 'rgba(255, 103, 129, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        setTimeout(() => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }, 200);
    });
    
    // Save design
    saveBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'my-magic-cone-design.png';
        link.href = canvas.toDataURL();
        link.click();
        
        // Show success message
        alert('🎨 Your magical design has been saved!\n\n💾 Check your downloads folder.\n\n✨ Share your creativity with the world!');
    });
    
    // Sticker functionality
    addStickersBtn.addEventListener('click', function() {
        stickerMode = !stickerMode;
        stickerPanel.style.display = stickerMode ? 'block' : 'none';
        
        if (stickerMode) {
            canvas.style.cursor = 'pointer';
            this.textContent = '🎨 Back to Drawing';
            this.style.background = 'linear-gradient(135deg, #bae1ff, #e3baff)';
        } else {
            canvas.style.cursor = 'crosshair';
            this.textContent = '✨ Add Stickers';
            this.style.background = 'linear-gradient(135deg, #ff6781, #ff4561)';
        }
    });
    
    // Sticker placement
    let selectedSticker = null;
    
    stickers.forEach(sticker => {
        sticker.addEventListener('click', function() {
            selectedSticker = this.dataset.sticker;
            
            // Visual feedback
            stickers.forEach(s => s.style.background = '#fff0f5');
            this.style.background = '#ff6781';
        });
    });
    
    canvas.addEventListener('click', function(e) {
        if (stickerMode && selectedSticker) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Draw sticker
            ctx.font = '32px Arial';
            ctx.fillText(selectedSticker, x - 16, y + 16);
            
            // Add sparkle effect
            ctx.font = '16px Arial';
            ctx.fillText('✨', x + 20, y - 10);
            ctx.fillText('✨', x - 25, y + 25);
        }
    });
    
    // Pre-draw a cone outline to help users
    function drawConeOutline() {
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        // Draw cone shape
        ctx.beginPath();
        ctx.moveTo(250, 350);
        ctx.lineTo(300, 200);
        ctx.lineTo(350, 350);
        ctx.closePath();
        ctx.stroke();
        
        // Draw ice cream scoops
        ctx.beginPath();
        ctx.arc(300, 180, 30, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(300, 140, 25, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(300, 110, 20, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Reset line dash
        ctx.setLineDash([]);
        
        // Add helper text
        ctx.fillStyle = '#ccc';
        ctx.font = '14px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('Draw your magical design here! 🎨', 300, 50);
        ctx.fillText('Use the outline as a guide ✨', 300, 380);
        ctx.textAlign = 'left';
    }
    
    // Draw initial outline
    drawConeOutline();
    
    // Window resize handler
    window.addEventListener('resize', function() {
        // Save current drawing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        resizeCanvas();
        // Restore drawing
        ctx.putImageData(imageData, 0, 0);
    });
});