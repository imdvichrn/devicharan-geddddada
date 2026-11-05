/**
 * Firebase Client Configuration & App Check
 *
 * Configures the modular Firebase Web SDK and App Check if credentials are provided.
 * All Gemini AI logic is handled securely on the server via /api/chat and /api/live.
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider, CustomProvider } from 'firebase/app-check';

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export function getEnv(key: string): string {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) {
      return (import.meta as any).env[key];
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process?.env?.[key]) {
      return process.env[key] || '';
    }
  } catch {}
  return '';
}

/**
 * Reads Firebase configuration from environment variables.
 */
export function getFirebaseConfig(): FirebaseConfig {
  return {
    apiKey: getEnv('VITE_FIREBASE_API_KEY'),
    authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnv('VITE_FIREBASE_APP_ID'),
    measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID'),
  };
}

export function isFirebaseConfigured(): boolean {
  const config = getFirebaseConfig();
  return Boolean(
    config.apiKey &&
    config.apiKey.trim().length > 0 &&
    config.projectId &&
    config.projectId.trim().length > 0 &&
    config.appId &&
    config.appId.trim().length > 0
  );
}

let cachedApp: FirebaseApp | null = null;
let appCheckInitialized = false;

function setupAppCheckIfAvailable(app: FirebaseApp) {
  if (appCheckInitialized) return;
  if (typeof window === 'undefined') return;

  try {
    const debugToken = getEnv('VITE_FIREBASE_APPCHECK_DEBUG_TOKEN');
    if (debugToken) {
      (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken;
    } else {
      try {
        if ((import.meta as any).env?.DEV) {
          (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        }
      } catch {}
    }

    const recaptchaKey = getEnv('VITE_FIREBASE_RECAPTCHA_KEY');
    if (recaptchaKey) {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaKey),
        isTokenAutoRefreshEnabled: true,
      });
      appCheckInitialized = true;
    } else if (debugToken) {
      initializeAppCheck(app, {
        provider: new CustomProvider({
          getToken: async () => ({
            token: debugToken,
            expireTimeMillis: Date.now() + 3600000,
          }),
        }),
        isTokenAutoRefreshEnabled: true,
      });
      appCheckInitialized = true;
    }
  } catch (err) {
    console.warn('Firebase App Check initialization notice:', err);
  }
}

/**
 * Initializes or returns the singleton FirebaseApp instance.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (cachedApp) return cachedApp;
  if (!isFirebaseConfigured()) return null;

  try {
    const existing = getApps();
    if (existing.length > 0) {
      cachedApp = existing[0];
    } else {
      cachedApp = initializeApp(getFirebaseConfig());
    }
    setupAppCheckIfAvailable(cachedApp);
    return cachedApp;
  } catch (error) {
    console.warn('Firebase initialization notice:', error);
    return null;
  }
}
