document.addEventListener("DOMContentLoaded", () => {
  const lang = document.documentElement.lang || "en";
  const rootPrefix = lang === "en" ? "" : "../";
  const labels = {
    en:{read:"Read more →",view:"View publication →",latest:"Latest news"},
    de:{read:"Mehr lesen →",view:"Publikation öffnen →",latest:"Aktuelle Nachrichten"},
    ar:{read:"اقرأ المزيد ←",view:"فتح المنشور ←",latest:"آخر الأخبار"},
    sy:{read:"ܩܪܘ ܝܬܝܪ ←",view:"ܦܬܚ ܟܬܒܐ ←",latest:"ܚܕܬ̈ܐ"}
  };
  const L=labels[lang]||labels.en;
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function load(name){const r=await fetch(`${rootPrefix}content/${lang}/${name}.json`);if(!r.ok)throw new Error('content');return r.json();}
  const newsBox=document.getElementById('news-list');
  if(newsBox){load('news').then(items=>{newsBox.innerHTML=items.map((x,i)=>`<article class="news-card">${x.image?`<img src="${rootPrefix}${esc(x.image)}" alt="">`:''}<div class="news-card-body"><div class="news-meta"><span>${esc(x.date)}</span><span>${esc(x.category)}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.excerpt)}</p><a href="news.html?id=${encodeURIComponent(x.id)}">${L.read}</a></div></article>`).join('')||'<p>No news available yet.</p>';}).catch(()=>newsBox.innerHTML='<p>');}
  const pubBox=document.getElementById('publications-list');
  if(pubBox){load('publications').then(items=>{pubBox.innerHTML=items.map(x=>`<article class="resource"><div class="resource-title"><div class="resource-icon">PDF</div><div><strong>${esc(x.title)}</strong><small>${esc(x.author||x.category)} · ${esc(x.date)}</small></div></div><a class="btn primary" href="publications.html?id=${encodeURIComponent(x.id)}">${L.view}</a></article>`).join('')||'<p>No publications available yet.</p>';}).catch(()=>pubBox.innerHTML='<p>');}
  const article=document.getElementById('news-article');
  if(article){load('news').then(items=>{const x=items.find(i=>i.id===new URLSearchParams(location.search).get('id'))||items[0];article.innerHTML=x?`${x.image?`<img class="article-image" src="${rootPrefix}${esc(x.image)}" alt="">`:''}<div class="news-meta"><span>${esc(x.date)}</span><span>${esc(x.category)}</span></div><h1>${esc(x.title)}</h1><p class="lead">${esc(x.excerpt)}</p>${x.url?`<a class="btn primary" href="${esc(x.url)}" target="_blank" rel="noopener">${L.read}</a>`:''}`:'<p>Article not found.</p>';});}
  const pub=document.getElementById('publication-detail');
  if(pub){load('publications').then(items=>{const x=items.find(i=>i.id===new URLSearchParams(location.search).get('id'))||items[0];pub.innerHTML=x?`<div class="resource-icon">PDF</div><div class="news-meta"><span>${esc(x.date)}</span><span>${esc(x.category)}</span></div><h1>${esc(x.title)}</h1>${x.author?`<p><strong>${esc(x.author)}</strong></p>`:''}<p class="lead">${esc(x.excerpt)}</p><a class="btn primary" href="${esc(x.pdf)}" target="_blank" rel="noopener">${L.view}</a>`:'<p>Publication not found.</p>';});}
});