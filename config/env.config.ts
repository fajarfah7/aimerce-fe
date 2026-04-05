export type EnvConfig = {
  API_URL: string;
  BRIDGE_API_URL: string;
};

function requireEnv(value?: string): string {
  if (!value) throw new Error("missing env config");
  return value;
}

const env: EnvConfig = {
  API_URL: requireEnv(process.env.NEXT_PUBLIC_API_URL),
  BRIDGE_API_URL: requireEnv(process.env.NEXT_PUBLIC_BRIDGE_API_URL),
};

export default env;
