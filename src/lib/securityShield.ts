// SAPTHA — Learn · Inspire · Together · Achieve
// Production Security Shield — Anti-Inspection & DevTools Lock

let protectionActive = false;
let lastWarningTime = 0;

function showShieldWarning(message = 'Developer tools and source inspection are restricted for security.') {
  const now = Date.now();
  if (now - lastWarningTime < 2500) return; // Debounce
  lastWarningTime = now;

  // Create subtle on-screen security notification pill
  const bannerId = 'saptha-security-shield-toast';
  let banner = document.getElementById(bannerId);
  if (!banner) {
    banner = document.createElement('div');
    banner.id = bannerId;
    banner.className =
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] px-4 py-2.5 rounded-xl bg-neutral-900/95 text-white border border-red-500/40 text-xs font-medium shadow-2xl backdrop-blur-md flex items-center gap-2 pointer-events-none transition-all duration-300 transform opacity-0 translate-y-2';
    banner.innerHTML = `
      <svg class="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
      <span id="saptha-security-msg">${message}</span>
    `;
    document.body.appendChild(banner);
  }

  const msgSpan = banner.querySelector('#saptha-security-msg');
  if (msgSpan) msgSpan.textContent = message;

  requestAnimationFrame(() => {
    banner?.classList.remove('opacity-0', 'translate-y-2');
    banner?.classList.add('opacity-100', 'translate-y-0');
  });

  setTimeout(() => {
    banner?.classList.remove('opacity-100', 'translate-y-0');
    banner?.classList.add('opacity-0', 'translate-y-2');
  }, 2200);
}

export function initSecurityShield() {
  if (protectionActive || typeof window === 'undefined') return;
  protectionActive = true;

  // 1. Disable Right Click Context Menu Across the Application
  window.addEventListener('contextmenu', (e: MouseEvent) => {
    // Check if the user is right-clicking an editable input/textarea where they might want to paste
    const target = e.target as HTMLElement | null;
    const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    
    if (!isInput) {
      e.preventDefault();
      showShieldWarning('Right-click context menu is disabled.');
      return false;
    }
  }, { capture: true });

  // 2. Block DevTools Keyboard Combinations
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    const isAlt = e.altKey;

    // F12 Key
    if (key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      showShieldWarning('Developer Tools (F12) access is restricted.');
      return false;
    }

    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    if ((isCtrlOrMeta && isShift && key === 'I') || (isCtrlOrMeta && isAlt && key === 'I')) {
      e.preventDefault();
      e.stopPropagation();
      showShieldWarning('Inspect Element is restricted.');
      return false;
    }

    // Ctrl+Shift+J / Cmd+Option+J (Console)
    if ((isCtrlOrMeta && isShift && key === 'J') || (isCtrlOrMeta && isAlt && key === 'J')) {
      e.preventDefault();
      e.stopPropagation();
      showShieldWarning('Developer Console is restricted.');
      return false;
    }

    // Ctrl+Shift+C / Cmd+Option+C (Inspect Element Picker)
    if ((isCtrlOrMeta && isShift && key === 'C') || (isCtrlOrMeta && isAlt && key === 'C')) {
      e.preventDefault();
      e.stopPropagation();
      showShieldWarning('Element Picker is restricted.');
      return false;
    }

    // Ctrl+Shift+K (Firefox Web Console)
    if (isCtrlOrMeta && isShift && key === 'K') {
      e.preventDefault();
      e.stopPropagation();
      showShieldWarning('Web Console is restricted.');
      return false;
    }

    // Ctrl+U / Cmd+Option+U (View Page Source)
    if ((isCtrlOrMeta && key === 'U') || (isCtrlOrMeta && isAlt && key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      showShieldWarning('Viewing page source is restricted.');
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if (isCtrlOrMeta && key === 'S') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. DevTools Open Detection Loop (Aggressive lock in production)
  const isProd = import.meta.env.PROD || !window.location.hostname.includes('ais-dev');
  
  if (isProd) {
    // Periodic debugger breakpoint trap when developer tools is active
    let devtoolsOpen = false;

    const threshold = 160;
    const checkDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      
      if (widthDiff || heightDiff) {
        devtoolsOpen = true;
      } else {
        devtoolsOpen = false;
      }
    };

    window.addEventListener('resize', checkDevTools);

    // Debugger trap: if someone manages to open DevTools, halt script execution
    setInterval(() => {
      const startTime = performance.now();
      // debugger call wrapped
      (function () {
        // eslint-disable-next-line no-debugger
        debugger;
      })();
      const elapsed = performance.now() - startTime;
      
      // If debugger halted execution for more than 100ms, DevTools is actively paused
      if (elapsed > 100 || devtoolsOpen) {
        showShieldWarning('Developer Tools detected. Inspection locked.');
        // Clear sensitive console outputs
        console.clear();
      }
    }, 1500);

    // Disable dragging images to prevent scraping
    window.addEventListener('dragstart', (e) => {
      if ((e.target as HTMLElement)?.tagName === 'IMG') {
        e.preventDefault();
      }
    });
  }
}
