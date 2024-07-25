import vue3GoogleLogin from 'vue3-google-login';

export function useGoogleLogin(app) {
  app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  });
}
