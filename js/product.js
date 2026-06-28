// ===================== Mistwood Scents — Product Detail =====================

function selectSize(size, price) {
  document.getElementById('selectedSize').textContent =
    'Selected: ' + size + ' — KES ' + price.toLocaleString();

  if (size === '100ml') {
    document.getElementById('size100').className = 'btn btn-mistwood btn-sm px-4';
    document.getElementById('size50').className = 'btn btn-outline-mistwood btn-sm px-4';
  } else {
    document.getElementById('size50').className = 'btn btn-mistwood btn-sm px-4';
    document.getElementById('size100').className = 'btn btn-outline-mistwood btn-sm px-4';
  }
}