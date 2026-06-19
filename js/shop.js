// ===================== Mistwood Scents — Shop Filtering =====================

let activeCategory = 'all';
let activeNotes = []; // notes the user has clicked to filter by

const products = document.querySelectorAll('.product-item');
const searchInput = document.getElementById('scentSearch');
const categoryButtons = document.querySelectorAll('.filter-btn');
const activeTagsContainer = document.getElementById('activeTags');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');

// Build a unique list of all scent notes from the products on the page
function getAllNotes() {
  const notesSet = new Set();
  products.forEach(p => {
    p.dataset.notes.split(' ').forEach(note => notesSet.add(note));
  });
  return Array.from(notesSet).sort();
}

// Render the clickable note "chips" below the search bar
function renderNoteChips() {
  const allNotes = getAllNotes();
  activeTagsContainer.innerHTML = '';

  allNotes.forEach(note => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'note-chip' + (activeNotes.includes(note) ? ' active' : '');
    chip.innerHTML = capitalize(note) + (activeNotes.includes(note) ? ' <span class="chip-x">&times;</span>' : '');
    chip.addEventListener('click', () => toggleNote(note));
    activeTagsContainer.appendChild(chip);
  });
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function toggleNote(note) {
  if (activeNotes.includes(note)) {
    activeNotes = activeNotes.filter(n => n !== note);
  } else {
    activeNotes.push(note);
  }
  renderNoteChips();
  filterProducts();
}

// Main filter function — combines search text, category, and active note tags
function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  products.forEach(product => {
    const category = product.dataset.category;
    const notes = product.dataset.notes;

    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    const matchesSearch = searchTerm === '' || notes.includes(searchTerm);
    const matchesActiveNotes = activeNotes.every(note => notes.includes(note));

    if (matchesCategory && matchesSearch && matchesActiveNotes) {
      product.style.display = '';
      visibleCount++;
    } else {
      product.style.display = 'none';
    }
  });

  resultsCount.textContent = `Showing ${visibleCount} of ${products.length} fragrances`;
  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// Category button clicks
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    filterProducts();
  });
});

// Live search as the user types
searchInput.addEventListener('input', filterProducts);

// Initial setup
renderNoteChips();
filterProducts();