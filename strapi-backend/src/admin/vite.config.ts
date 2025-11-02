import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    server: {
      host: '0.0.0.0',
      port: 1337,
      allowedHosts: ['9e063748f0fa.ngrok-free.app'], // ✅ use an array
      hmr: {
        clientPort: 1337
      }
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
