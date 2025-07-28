// projects.js
const projects = [
  // Data proyek Anda di sini
  {
    id: 1,
    title: "Sales Forecasting Model",
    period: "Januari 2024 - Maret 2024",
    description: "Model prediksi penjualan menggunakan machine learning untuk membantu perencanaan inventory dan strategi bisnis.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    icon: "📈"
  },
  // Tambahkan proyek lainnya
];

// Variabel untuk pagination
const itemsPerPage = 6;
let currentPage = 1;

// Fungsi untuk render grid view
function renderGridView() {
  const container = document.getElementById('gridContainer');
  container.innerHTML = projects.map(project => `
    <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <div class="bg-gradient-to-r from-primary to-secondary p-6">
        <div class="text-white text-3xl mb-4">${project.icon}</div>
        <h3 class="text-xl font-bold text-white">${project.title}</h3>
        <div class="text-white/80 text-sm mt-2">${project.period}</div>
      </div>
      <div class="p-6">
        <p class="text-gray-600 mb-4">${project.description}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.tags.map(tag => `
            <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">${tag}</span>
          `).join('')}
        </div>
        <div class="flex justify-between items-center">
          <a href="#" class="text-primary hover:text-primary/80 font-semibold">
            Lihat Detail →
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// Fungsi untuk render list view
function renderListView(page = 1) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProjects = projects.slice(start, end);
  
  const container = document.getElementById('listContainer');
  container.innerHTML = paginatedProjects.map(project => `
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-4">
          <div class="text-4xl">${project.icon}</div>
          <div class="flex-1">
            <h3 class="text-xl font-bold">${project.title}</h3>
            <p class="text-gray-600 my-3">${project.description}</p>
            <div class="flex flex-wrap gap-2">
              ${project.tags.map(tag => `
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">${tag}</span>
              `).join('')}
            </div>
          </div>
        </div>
        <a href="#" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Detail
        </a>
      </div>
    </div>
  `).join('');
  
  renderPagination();
}

// Fungsi untuk render pagination
function renderPagination() {
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const pagination = document.getElementById('pagination');
  
  pagination.innerHTML = `
    <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} 
      class="px-3 py-2 text-gray-500 hover:text-primary disabled:opacity-50">
      ← Previous
    </button>
    
    ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
      <button onclick="changePage(${page})" 
        class="px-3 py-2 ${currentPage === page ? 'bg-primary text-white rounded' : 'text-gray-600 hover:text-primary'}">
        ${page}
      </button>
    `).join('')}
    
    <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} 
      class="px-3 py-2 text-gray-600 hover:text-primary">
      Next →
    </button>
  `;
}

// Fungsi untuk ganti halaman
function changePage(page) {
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  
  currentPage = page;
  renderListView(currentPage);
}

// Fungsi untuk switch view
function switchView(view) {
  const gridView = document.getElementById('gridView');
  const listView = document.getElementById('listView');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');

  if (view === 'grid') {
    gridView.classList.remove('hidden');
    listView.classList.add('hidden');
    gridBtn.classList.add('bg-primary', 'text-white');
    gridBtn.classList.remove('text-gray-600');
    listBtn.classList.remove('bg-primary', 'text-white');
    listBtn.classList.add('text-gray-600');
    renderGridView();
  } else {
    gridView.classList.add('hidden');
    listView.classList.remove('hidden');
    listBtn.classList.add('bg-primary', 'text-white');
    listBtn.classList.remove('text-gray-600');
    gridBtn.classList.remove('bg-primary', 'text-white');
    gridBtn.classList.add('text-gray-600');
    renderListView();
  }
}

// Inisialisasi pertama kali
document.addEventListener('DOMContentLoaded', () => {
  renderGridView();
});