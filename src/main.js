import $ from 'jquery';

$(document).ready(function() {
  const furnitureList = $('#furniture-list');
  
  // Menggunakan API terbuka JSONPlaceholder untuk dummy data
  // Kita limit hanya 8 data untuk mockup awal
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/photos?_limit=8',
    method: 'GET',
    success: function(data) {
      furnitureList.empty(); // Hapus teks loading
      
      data.forEach((item, index) => {
        // Delay animasi per item
        const delay = index * 0.1;
        
        // Buat elemen card untuk tiap furniture
        const card = $(`
          <article class="furniture-item" style="animation-delay: ${delay}s">
            <img src="${item.url}" alt="${item.title}" loading="lazy" />
            <div class="content">
              <h3>Furniture ${item.id}</h3>
              <p>Description: ${item.title.substring(0, 30)}...</p>
            </div>
          </article>
        `);
        
        furnitureList.append(card);
      });
    },
    error: function(err) {
      furnitureList.html('<p class="loading" style="color: red;">Gagal memuat data. Silakan coba lagi nanti.</p>');
      console.error('Error fetching data:', err);
    }
  });
});
