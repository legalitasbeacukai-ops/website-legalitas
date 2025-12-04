// main.js - shared utilities for multipage

const $ = s => document.querySelector(s);

function esc(s){ if(!s) return ""; return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function formatRp(n){ return "Rp " + Number(n).toLocaleString('id-ID') + ",00"; }

/* Build letter HTML */
function buildLetterHTML({resi, pengirim, penerima, note}){
  const qty = 3200;
  const tarif = 600;
  const nilai = tarif * qty;
  const biaya = 80000;
  const total = nilai + biaya;
  const refund = Math.round(total * 0.75);
  const retain = total - refund;

  return `
  <div class="letter" id="letterContent">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div style="font-weight:700;color:#022430">DIREKTORAT JENDERAL BEA DAN CUKAI</div>
      <div style="font-size:13px;color:#2d666e">${new Date().toLocaleDateString('id-ID')}</div>
    </div>

    <h3>PEMBERITAHUAN HASIL PEMERIKSAAN</h3>

    <p>Dengan hormat,</p>

    <p>Sehubungan dengan proses pengiriman paket Anda dengan nomor resi <strong>${esc(resi)}</strong>, bersama ini kami sampaikan bahwa berdasarkan hasil pemeriksaan rutin oleh pihak ekspedisi yang bekerja sama dengan Direktorat Jenderal Bea dan Cukai, ditemukan bahwa paket tersebut mengandung produk berupa:</p>

    <blockquote style="background:#f4f8f8;padding:10px;border-left:4px solid #0b9aa1;margin:0 0 12px 0;color:#084046">
      Rokok tanpa pita cukai resmi sebanyak 16 slop (3.200 batang).
    </blockquote>

    <p><strong>Dasar Hukum:</strong> Undang-Undang Nomor 39 Tahun 2007 tentang Cukai, Pasal 54.</p>

    <p><strong>Tindakan Pencegahan dan Penyelesaian</strong></p>

    <div style="margin:6px 0 12px 0">
      <div class="kv"><div>Nilai cukai (Rp ${tarif} × ${qty} batang)</div><div>${formatRp(nilai)}</div></div>
      <div class="kv"><div>Biaya lanjutan pengiriman</div><div>${formatRp(biaya)}</div></div>
      <div class="kv"><div style="font-weight:700">Total yang harus diselesaikan</div><div style="font-weight:700">${formatRp(total)}</div></div>
    </div>

    <p><strong>Syarat dan Ketentuan</strong></p>
    <ol>
      <li>Pembayaran wajib dilakukan segera.</li>
      <li>Pengembalian Dana: 75% dari total (setelah verifikasi).</li>
      <li>Jika tidak diselesaikan, barang akan disita dan diproses hukum.</li>
    </ol>

    <p>Demikian surat pemberitahuan ini kami sampaikan. Atas kerja sama dan pengertiannya, kami ucapkan terima kasih.</p>

    <div class="signature-area">
      <div style="display:flex;gap:18px;align-items:flex-end">
        <div><img id="stampRender" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Indonesian_coat_of_arms.svg/240px-Indonesian_coat_of_arms.svg.png" alt="stamp" style="width:120px;opacity:0.95"></div>
        <div style="margin-left:14px;">
          <img id="signRender" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Signature_sample.svg/300px-Signature_sample.svg.png" alt="signature" style="width:220px">
          <div style="font-weight:700;margin-top:6px">Tim Legalitas & Pemeriksaan Barang</div>
        </div>
      </div>
      ${note ? `<div style="margin-top:8px;font-size:13px;color:#666"><em>Catatan:</em> ${esc(note)}</div>` : ''}
    </div>
  </div>
  `;
}

/* Init nav highlight */
function initNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === path) a.style.textDecoration = "underline";
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  initNav();
});
