const fs = require('fs');
let text = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');

const oldScript = /function initSmoothScroll\(\) \{[\s\S]*?\}/;
const newScript = `function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });
      }

      function initLightbox() {
        if (!document.getElementById('site-lightbox')) {
          const lb = document.createElement('div');
          lb.id = 'site-lightbox';
          lb.className = 'fixed inset-0 z-[10000] bg-slate-900/95 hidden items-center justify-center p-4 md:p-12 cursor-zoom-out opacity-0 transition-opacity duration-300';
          
          const img = document.createElement('img');
          img.className = 'max-w-full max-h-full object-contain rounded-xl shadow-2xl scale-95 transition-transform duration-300';
          lb.appendChild(img);
          
          document.body.appendChild(lb);
          
          lb.addEventListener('click', () => {
            lb.classList.remove('opacity-100');
            img.classList.remove('scale-100');
            setTimeout(() => {
              lb.classList.remove('flex');
              lb.classList.add('hidden');
              document.body.style.overflow = '';
            }, 300);
          });
        }

        const lightbox = document.getElementById('site-lightbox');
        const lbImg = lightbox.querySelector('img');

        document.querySelectorAll('.step-block img').forEach(img => {
          img.classList.add('cursor-zoom-in', 'transition-transform', 'hover:scale-[1.02]', 'shadow-sm');
          img.addEventListener('click', () => {
            lbImg.src = img.src;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden';
            
            requestAnimationFrame(() => {
              lightbox.classList.add('opacity-100');
              lbImg.classList.add('scale-100');
            });
          });
        });
      }`;

text = text.replace(oldScript, newScript);

text = text.replace(/initSmoothScroll\(\);/, 'initSmoothScroll();\n        initLightbox();');

fs.writeFileSync('src/layouts/BaseLayout.astro', text, 'utf8');
