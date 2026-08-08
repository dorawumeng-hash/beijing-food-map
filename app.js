// 北京美食地图 - 主逻辑
let map;
let markers = {};

// 初始化地图
function initMap() {
  map = L.map('map', {
    center: [39.9042, 116.4074],  // 北京中心
    zoom: 11,
    scrollWheelZoom: true
  });

  // 多源底图：优先 CartoDB（快速稳定），OSM 兜底
  const baseLayers = [
    {
      name: 'CartoDB（快）',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: { maxZoom: 20, subdomains: 'abcd' }
    },
    {
      name: 'OSM（备用）',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: { maxZoom: 19 }
    },
    {
      name: 'OpenTopoMap（备用2）',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      options: { maxZoom: 17 }
    }
  ];

  // 逐个尝试加载，失败则回退到下一个源
  let currentTile = null;
  function tryBaseLayer(idx) {
    if (idx >= baseLayers.length) return;
    const layer = baseLayers[idx];
    if (currentTile) map.removeLayer(currentTile);
    currentTile = L.tileLayer(layer.url, Object.assign({
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }, layer.options)).addTo(map);

    // 检测瓦片是否加载成功
    let failed = false;
    currentTile.on('tileerror', () => {
      if (!failed) {
        failed = true;
        console.warn(`地图源 ${layer.name} 加载失败，切换备用源...`);
        setTimeout(() => tryBaseLayer(idx + 1), 500);
      }
    });
    // 给一个超时保护：3秒后如果没有瓦片成功，也切换
    setTimeout(() => {
      if (!failed) {
        const tiles = document.querySelectorAll('.leaflet-tile');
        const loaded = Array.from(tiles).some(t => t.complete && t.naturalWidth > 0);
        if (!loaded) {
          failed = true;
          console.warn(`地图源 ${layer.name} 超时，切换备用源...`);
          tryBaseLayer(idx + 1);
        }
      }
    }, 3000);
  }
  tryBaseLayer(0);

  // 添加标记
  restaurants.forEach((r, idx) => addMarker(r, idx));
}

// 添加餐厅标记
function addMarker(restaurant, idx) {
  // 自定义水滴标记
  const icon = L.divIcon({
    className: '',
    html: `<div class="custom-marker"><span>${idx + 1}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const marker = L.marker([restaurant.lat, restaurant.lng], { icon }).addTo(map);
  markers[idx] = marker;

  // 点击标记 → 打开详情
  marker.on('click', () => {
    openDetail(restaurant);
    highlightCard(idx);
  });

  // 在列表点击时聚焦
  map.panTo([restaurant.lat, restaurant.lng], { animate: true });
}

// 分类筛选状态
let activeCategory = null;

// 渲染分类栏
function renderCategories() {
  const bar = document.getElementById('categoryBar');
  if (!restaurantCategories || restaurantCategories.length === 0) {
    bar.innerHTML = '';
    return;
  }
  bar.innerHTML = restaurantCategories.map(c =>
    `<span class="category-chip${activeCategory === c.id ? ' active' : ''}"
      onclick="filterCategory('${c.id}')">${c.icon} ${c.name}</span>`
  ).join('');
}

// 分类筛选
function filterCategory(catId) {
  activeCategory = activeCategory === catId ? null : catId;
  renderCategories();
  renderList();
}

// 渲染左侧列表
function renderList() {
  const scroll = document.getElementById('listScroll');
  const filtered = activeCategory
    ? restaurants.filter(r => r.category === activeCategory)
    : restaurants;
  document.getElementById('countBadge').textContent = `${filtered.length} 家`;

  if (filtered.length === 0) {
    scroll.innerHTML = `<div class="empty-state">
      <div class="big-icon">🍽️</div>
      <p>还没有收录餐厅</p>
    </div>`;
    return;
  }

  scroll.innerHTML = filtered.map((r, idx) => {
    // 找到在 restaurants 数组中的真实索引
    const realIdx = restaurants.indexOf(r);
    return `
    <div class="restaurant-card" id="card-${realIdx}" onclick="focusRestaurant(${realIdx})">
      <img class="card-thumb" src="${r.images[0] || ''}" alt="${r.name}" loading="lazy" onerror="this.style.display='none'">
      <div class="card-info">
        <div class="card-name">${idx + 1}. ${r.name}</div>
        <div class="card-desc">${r.desc.split('\n')[0]}</div>
        <div class="card-tags">${(r.tags || []).slice(0, 3).map(t => `<span class="tag-chip">${t}</span>`).join('')}</div>
      </div>
    </div>`;
  }).join('');
}

// 从列表点击 → 聚焦地图并打开详情
function focusRestaurant(idx) {
  const r = restaurants[idx];
  map.flyTo([r.lat, r.lng], 15, { duration: 0.8 });
  setTimeout(() => openDetail(r), 400);
  highlightCard(idx);
}

// 高亮列表项
function highlightCard(idx) {
  document.querySelectorAll('.restaurant-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById(`card-${idx}`);
  if (card) card.classList.add('active');
}

// 打开详情弹窗
function openDetail(r) {
  const modal = document.getElementById('detailModal');
  document.getElementById('modalName').textContent = r.name;

  // 分类标签
  const cat = restaurantCategories.find(c => c.id === r.category);
  if (cat) {
    document.getElementById('modalTags').innerHTML =
      `<span class="tag-chip" style="background:var(--primary);color:white">${cat.icon} ${cat.name}</span>`;
  } else {
    document.getElementById('modalTags').innerHTML = '';
  }

  document.getElementById('modalDesc').textContent = r.desc;

  // 多图平铺网格（同时陈列菜品和环境）
  const imgs = document.getElementById('modalImages');
  const imgList = r.images && r.images.length > 0 ? r.images : [];
  imgs.className = 'modal-images-grid';
  imgs.innerHTML = imgList
    .map(img => `<img src="${img}" alt="${r.name}" loading="lazy"
      onclick="openLightbox('${img}')"
      onerror="this.style.display='none'">`)
    .join('');

  // 标签（在分类标签后追加餐厅标签）
  document.getElementById('modalTags').innerHTML += (r.tags || [])
    .map(t => `<span class="tag-chip">${t}</span>`).join('');

  // 元信息（含迷你地图定位）
  document.getElementById('modalMeta').innerHTML = `
    ${r.price ? `<div class="meta-item">💰 ${r.price}</div>` : ''}
    ${r.address ? `<div class="meta-item">📍 ${r.address}</div>` : ''}
  `;

  // 迷你地图定位（在图片区底部显示大致位置）
  const miniMapBox = document.getElementById('miniMap');
  if (miniMapBox) {
    // 重建容器避免 Leaflet 实例冲突
    const wrap = miniMapBox.parentElement;
    miniMapBox.remove();
    const fresh = document.createElement('div');
    fresh.id = 'miniMap';
    fresh.className = 'mini-map';
    wrap.insertBefore(fresh, document.getElementById('miniMapLabel'));
    const mini = L.map('miniMap', {
      center: [r.lat, r.lng],
      zoom: 14,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      attributionControl: false
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd'
    }).addTo(mini);
    L.marker([r.lat, r.lng]).addTo(mini).bindPopup(r.name).openPopup();
    const label = document.getElementById('miniMapLabel');
    if (label) label.textContent = `📍 ${r.address || r.name}`;
  }

  // 原文链接
  const link = document.getElementById('modalLink');
  if (r.link) { link.href = r.link; link.style.display = 'inline-block'; }
  else { link.style.display = 'none'; }

  modal.classList.remove('hidden');
}

// 关闭详情
function closeDetail() {
  document.getElementById('detailModal').classList.add('hidden');
}

// 图片放大预览
function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.remove('hidden');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  renderCategories();
  renderList();
});
