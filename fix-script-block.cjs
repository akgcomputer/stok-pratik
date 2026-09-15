const fs = require('fs');
let text = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');

const scriptStart = text.indexOf('<script client:load>');
const scriptEnd = text.indexOf('</script>', scriptStart) + '</script>'.length;

const newScript = `<script client:load>
      // Mobile menu functionality
      function initMobileMenu() {
        const btn = document.getElementById('mobileMenuBtn');
        const menu = document.getElementById('mobileMenu');
        const closeBtn = document.getElementById('mobileMenuClose');

        if (!btn || !menu) return;

        function openMenu() {
          menu.classList.add('active');
          document.body.style.overflow = 'hidden';
          btn.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
          menu.classList.remove('active');
          document.body.style.overflow = '';
          btn.setAttribute('aria-expanded', 'false');
        }

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = menu.classList.contains('active');
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        });

        if (closeBtn) {
          closeBtn.addEventListener('click', closeMenu);
        }

        // Close on Escape
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
          }
        });

        // Close menu when clicking on a link
        const mobileLinks = menu.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
          link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (menu.classList.contains('active') && 
              !menu.contains(e.target) && 
              e.target !== btn && 
              !btn.contains(e.target)) {
            closeMenu();
          }
        });
      }

      // Smooth scrolling for anchor links
      function initSmoothScroll() {
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

      // Lightbox functionality
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
      }

      // Initialize all scripts when DOM is loaded
      document.addEventListener('DOMContentLoaded', () => {
        initMobileMenu();
        initSmoothScroll();
        initLightbox();
      });
    </script>`;

text = text.substring(0, scriptStart) + newScript + text.substring(scriptEnd);
fs.writeFileSync('src/layouts/BaseLayout.astro', text, 'utf8');
