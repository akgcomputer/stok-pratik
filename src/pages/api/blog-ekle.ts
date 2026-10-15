import type { APIRoute } from 'astro';

export const prerender = false;

// Varsayılan Güvenli Master API Anahtarı
const DEFAULT_BLOG_API_KEY = 'sp_blog_api_sec_89f3a21bc9e4726d102e';

// Türkçe karakterleri temizleyip SEO uyumlu slug üreten fonksiyon
function slugify(text: string): string {
  if (!text) return '';
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
  };

  return text
    .toString()
    .replace(/[çÇğĞıIİöÖşŞüÜ]/g, (match) => trMap[match] || match)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// UTF-8 dizesini base64'e çevirici (Cloudflare Worker & Edge uyumlu)
function toBase64Utf8(str: string): string {
  try {
    return Buffer.from(str, 'utf-8').toString('base64');
  } catch {
    return btoa(unescape(encodeURIComponent(str)));
  }
}

// GET: API Bilgilendirme ve Durum Kontrolü
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      status: 'active',
      endpoint: '/api/blog-ekle',
      method: 'POST',
      description: 'Stok Pratik Otomasyon ve Keystatic Blog Ekleme API Ucu',
      expectedFields: {
        apiKey: 'string (zorunlu)',
        title: 'string (zorunlu)',
        slug: 'string (isteğe bağlı, boşsa otomatik üretilir)',
        shortDescription: 'string (zorunlu)',
        content: 'string (markdown formatında, zorunlu)',
        author: 'string (isteğe bağlı, varsayılan: Stok Pratik Ekibi)',
        date: 'string (YYYY-MM-DD, varsayılan: bugünün tarihi)',
        enabled: 'boolean (isteğe bağlı, varsayılan: true)',
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    }
  );
};

// POST: Dışarıdan Blog Yazısı Ekleme
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. JSON Gövdesini Ayrıştır
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'INVALID_JSON',
          message: 'Geçersiz JSON gövdesi iletildi. Lütfen Content-Type: application/json olduğundan emin olun.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    // 2. Güvenlik ve API Key Kontrolü
    const env = (locals as any)?.runtime?.env || process.env || {};
    const validApiKey = env.BLOG_API_KEY || DEFAULT_BLOG_API_KEY;

    // Header veya Body'den API Key al
    const authHeader = request.headers.get('authorization') || '';
    let incomingKey = body.apiKey || body.token || '';
    if (authHeader.toLowerCase().startsWith('bearer ')) {
      incomingKey = authHeader.slice(7).trim();
    }

    if (!incomingKey || incomingKey !== validApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'UNAUTHORIZED',
          message: 'Geçersiz API Anahtarı! Erişim reddedildi.',
        }),
        { status: 401, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    // 3. Zorunlu Alan Kontrolleri
    const title = String(body.title || '').trim();
    const shortDesc = String(body.shortDescription || body.description || '').trim();
    const content = String(body.content || '').trim();

    if (!title || !shortDesc || !content) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'MISSING_FIELDS',
          message: 'Zorunlu alanlar eksik! "title", "shortDescription" ve "content" alanları boş olamaz.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    // 4. Slug ve Diğer Alanları Biçimlendir
    let slug = String(body.slug || '').trim();
    if (!slug) {
      slug = slugify(title);
    } else {
      slug = slugify(slug);
    }

    const author = String(body.author || 'Stok Pratik Ekibi').trim();
    const today = new Date().toISOString().split('T')[0];
    const date = String(body.date || today).trim();

    // 5. Keystatic & Astro Tam Uyumlu Markdown İçeriğini Hazırla
    const fileContent = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(shortDesc)}
author: ${JSON.stringify(author)}
date: ${JSON.stringify(date)}
---
${content}
`;

    // 6. Dosyayı Kaydet / Commit Et
    const fileName = `${slug}.md`;
    const repoOwner = 'akgcomputer';
    const repoName = 'stok-pratik';
    const filePath = `src/content/blog/${fileName}`;

    // Cloudflare / Serverless Ortamında GitHub API ile Depoya Commit
    const githubToken = env.GITHUB_TOKEN || env.GH_TOKEN || process.env.GITHUB_TOKEN;

    if (githubToken) {
      // Önce dosya zaten var mı diye kontrol et (varsa SHA alıp güncelleyebilmek için)
      let existingSha: string | undefined;
      try {
        const getRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'User-Agent': 'StokPratik-Blog-API',
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (getRes.ok) {
          const getJson: any = await getRes.json();
          existingSha = getJson.sha;
        }
      } catch (err) {
        console.error('GitHub SHA kontrol hatası:', err);
      }

      // GitHub'a PUT isteği ile dosyayı yaz/güncelle
      const putRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'StokPratik-Blog-API',
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `🤖 [Otomatik API] Yeni blog yazısı: ${title}`,
          content: toBase64Utf8(fileContent),
          branch: 'main',
          ...(existingSha ? { sha: existingSha } : {}),
        }),
      });

      if (!putRes.ok) {
        const errText = await putRes.text();
        console.error('GitHub API Commit Hatası:', errText);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'GITHUB_COMMIT_FAILED',
            message: `GitHub API dosyayı depoya kaydedemedi: ${putRes.statusText}`,
            details: errText,
          }),
          { status: 502, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );
      }
    } else {
      // Yerel / Node.js ortamı kontrolü
      try {
        const fs = await import('fs');
        const path = await import('path');
        const localPath = path.join(process.cwd(), 'src', 'content', 'blog', fileName);
        fs.writeFileSync(localPath, fileContent, 'utf-8');
      } catch (fsErr) {
        // Eğer Cloudflare üzerinde ve henüz GITHUB_TOKEN tanımlanmadıysa açık yönlendirme dön
        return new Response(
          JSON.stringify({
            success: false,
            error: 'GITHUB_TOKEN_NOT_CONFIGURED',
            message: 'Cloudflare sunucusuz ortamında dosya yazabilmek için GITHUB_TOKEN ortam değişkeni tanımlanmalıdır.',
          }),
          { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );
      }
    }

    // 7. Başarılı Yanıt (200 OK)
    const postUrl = `https://stokpratik.com.tr/blog/${slug}`;
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Blog başarıyla eklendi',
        url: postUrl,
        slug: slug,
        title: title,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: any) {
    console.error('Beklenmeyen API hatası:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Bilinmeyen bir sunucu hatası oluştu.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }
};
