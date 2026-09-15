"use client";
import { useState, useEffect } from "react"; 
import { useRouter, usePathname } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAuthAction = async () => {
    if (user) {
      await supabase.auth.signOut();
      router.refresh();
    } else {
      window.open("https://daruttaqwabanyumas.com/studio", "_blank");
    }
  };

  const categoryMenus = [
    { name: "Berita", slug: "berita" },
    { name: "Artikel", slug: "artikel" },
    { name: "program", slug: "program" },
    { name: "Unit KMI", slug: "unit-kmi" },
    { name: "Unit SMP", slug: "unit-smp" },
	{ name: "Pendaftaran Online", slug: "pendaftaran" },
    { name: "Video", slug: "video" },
    { name: "Tokoh & Inspirasi", slug: "tokoh-inspirasi" },
    { name: "Download", slug: "download" },
  ];

  const subMenus = [
    { name: "Profile", slug: "profile" },
    { name: "Struktur Pimpinan", slug: "pimpinan" },
    { name: "Download", slug: "download" },
    { name: "Gallery", slug: "galeri" },
    { name: "Kontak", slug: "kontak" },
    { name: "Kajian Hari Ini", slug: "kajian-hari-ini" },
  ];

  return (
    <header className="header-master" style={{ width: '100%', position: 'relative', zIndex: 1000 }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --dt-blue: #1e2f65;
          --dt-green: #1a9c69;
          --dt-gold: #f9c80e;
        }
        .nav-link-item { color: #ffffff !important; text-decoration: none; transition: all 0.3s ease; }
        .nav-link-item:hover { background-color: var(--dt-gold) !important; color: #1e2f65 !important; }
        
        /* Hilangkan Scrollbar tapi tetap bisa scroll */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .sub-nav-link { color: #444 !important; text-decoration: none; font-weight: 700; font-size: 11px; padding: 10px 15px; display: flex; align-items: center; white-space: nowrap; transition: 0.2s; }
        .sub-nav-link:hover { color: var(--dt-blue) !important; }
        
        @keyframes pulse-red {
          0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .signal-indicator {
          width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%;
          margin-right: 8px; display: inline-block; animation: pulse-red 2s infinite;
        }

        @keyframes blink-text { 50% { opacity: 0.3; } }
        .btn-banyumas {
          background-color: #ef4444; color: #ffffff !important;
          font-size: 11px; font-weight: 900; padding: 2px 10px;
          border-radius: 4px; margin-left: 10px; text-transform: uppercase;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.2); animation: blink-text 1s step-start infinite;
          border: none; cursor: pointer;
        }

        @media (max-width: 992px) { 
          .top-center-search { display: none !important; } 
          .logo-text-box h1 { fontSize: 24px !important; }
        }
      `}} />

      {/* =========================================================
    LAPIS 1: TOPBAR
========================================================= */}
<div
  className="top-bar"
  style={{
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #eee',
    padding: '6px 0',
  }}
>
  <div
    className="container"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px',
    }}
  >
    {/* =====================================================
        MENU HAMBURGER
    ===================================================== */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Buka menu"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '4px',
          cursor: 'pointer',
          width: '25px',
          padding: 0,
          margin: 0,
          border: 'none',
          background: 'transparent',
        }}
      >
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '3px',
            backgroundColor: 'var(--dt-blue)',
            borderRadius: '2px',
          }}
        />

        <span
          style={{
            display: 'block',
            width: '100%',
            height: '3px',
            backgroundColor: 'var(--dt-blue)',
            borderRadius: '2px',
          }}
        />

        <span
          style={{
            display: 'block',
            width: '100%',
            height: '3px',
            backgroundColor: 'var(--dt-blue)',
            borderRadius: '2px',
          }}
        />
      </button>
    </div>

    {/* =====================================================
        SEARCH
    ===================================================== */}
    <div
      className="top-center-search"
      style={{
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '30px',
          padding: '2px 2px 2px 15px',
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari berita atau program..."
          aria-label="Cari berita atau program"
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '13px',
            color: '#333',
            backgroundColor: 'transparent',
          }}
        />

        <button
          type="submit"
          aria-label="Cari"
          style={{
            flexShrink: 0,
            backgroundColor: 'var(--dt-blue)',
            border: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </div>

    {/* =====================================================
        DONASI + LOGIN / LOGOUT
    ===================================================== */}
    <div
      className="top-right-group"
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'flex-end',
      }}
    >
      {/* TOMBOL DONASI */}
      <a
        href="https://mukhlasin.or.id"
        style={{
          backgroundColor: 'var(--dt-blue)',
          color: '#fff',
          padding: '6px 15px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 800,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        DONASI
      </a>

      {/* TOMBOL LOGIN / LOGOUT */}
      {user ? (
        <button
          type="button"
          onClick={handleAuthAction}
          style={{
            backgroundColor: '#ef4444',
            color: '#fff',
            border: 'none',
            padding: '6px 15px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          LOGOUT
        </button>
      ) : (
        <a
          href="https://daruttaqwabanyumas.com/studio"
          style={{
            backgroundColor: 'var(--dt-gold)',
            color: '#1e2f65',
            padding: '6px 15px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          LOGIN
        </a>
      )}
    </div>
  </div>
</div>

      {/* LAPIS 2: LOGO SECTION (IDENTITAS) */}
      <div className="logo-section" style={{ backgroundColor: '#fff', padding: '15px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Cek Path Logo: Pastikan logo.png ada di folder /public */}
            <Image src="/logo.png" alt="Darut Taqwa Logo" width={70} height={70} priority style={{ objectFit: 'contain' }} />
            <div className="logo-text-box">
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <h1 style={{ color: '#1e2f65', margin: 0, fontSize: '32px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px', lineHeight: 1 }}>
                  DARUT <span style={{ color: '#1a9c69' }}>TAQWA</span>
                </h1>
                <button className="btn-banyumas">BANYUMAS</button>
              </div>
              <p style={{ fontSize: '13px', color: '#666', fontWeight: '700', textTransform: 'uppercase', margin: '5px 0 0 0' }}>
                Generasi Taqwa Yang Mendunia
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* LAPIS 3 & 4: STICKY NAVIGATION GROUP */}
      <div className="sticky-nav-wrapper" style={{ position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <nav className="main-nav" style={{ backgroundColor: 'var(--dt-blue)', borderBottom: '3px solid var(--dt-gold)' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <ul className="nav-menu-list no-scrollbar" style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, overflowX: 'auto' }}>
              <li style={{ backgroundColor: 'var(--dt-gold)' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 25px', color: '#1e2f65', fontWeight: '900', textDecoration: 'none' }}>HOME</Link>
              </li>
              {categoryMenus.map((m) => (
                <li key={m.slug}>
                  <Link href={`/${m.slug}`} className="nav-link-item" style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 20px', fontWeight: '700', fontSize: '12px', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{m.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <nav className="secondary-nav" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eee' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <ul className="sub-nav-list no-scrollbar" style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, overflowX: 'auto' }}>
              {subMenus.map((m, index) => (
                <li key={m.slug} style={{ display: 'flex', alignItems: 'center' }}>
                  <Link href={`/${m.slug}`} className="sub-nav-link">
                    {m.slug === "kajian-hari-ini" && <span className="signal-indicator"></span>}
                    {m.name.toUpperCase()}
                  </Link>
                  {index < subMenus.length - 1 && <span style={{ color: '#ddd', fontSize: '12px' }}>|</span>}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* DRAWER MENU (MOBILE/SIDEBAR) */}
      <div className="mobile-drawer" style={{ position: 'fixed', top: 0, left: isMenuOpen ? 0 : '-100%', width: '300px', height: '100vh', backgroundColor: '#fff', zIndex: 2000, transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '5px 0 15px rgba(0,0,0,0.2)', padding: '40px 25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h3 style={{ color: 'var(--dt-blue)', fontSize: '20px', fontWeight: '900', borderBottom: '3px solid var(--dt-gold)', margin: 0 }}>MENU UTAMA</h3>
          <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' }}>×</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {subMenus.map((m) => (
            <li key={m.slug} style={{ marginBottom: '18px' }}>
              <Link href={`/${m.slug}`} onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#333', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                {m.slug === "kajian-hari-ini" && <span className="signal-indicator"></span>}
                {m.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* OVERLAY */}
      {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1900, backdropFilter: 'blur(3px)' }}></div>}

    </header>
  );
}