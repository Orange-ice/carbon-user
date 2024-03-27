interface EnvConfig {
  // 接口前缀
  VITE_APP_BASE_API: string;
}


export const getEnvConfig = () => {
  const env = import.meta.env as unknown as EnvConfig;
  const {
    VITE_APP_BASE_API
  } = env;
  return {
    VITE_APP_BASE_API
  }
}
