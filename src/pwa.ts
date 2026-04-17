import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onRegisteredSW(swUrl) {
    if (import.meta.env.DEV) {
      console.log('[PWA] SW registered:', swUrl);
    }
  },
});
