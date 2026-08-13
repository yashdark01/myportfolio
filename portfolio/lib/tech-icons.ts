import type { SimpleIcon } from "simple-icons";
import {
  siAmazonwebservices,
  siAmazons3,
  siAnthropic,
  siApachekafka,
  siCanvas,
  siClerk,
  siCloudinary,
  siDocker,
  siExpress,
  siFastapi,
  siFramer,
  siGithubactions,
  siGooglegemini,
  siJest,
  siLangchain,
  siLanggraph,
  siMinio,
  siMongodb,
  siMongoose,
  siNatsdotio,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenai,
  siPostgresql,
  siReact,
  siRedis,
  siRedux,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  siUpstash,
  siVercel,
  siVite,
} from "simple-icons";

const ICON_BY_SLUG: Record<string, SimpleIcon> = {
  amazonwebservices: siAmazonwebservices,
  amazons3: siAmazons3,
  anthropic: siAnthropic,
  apachekafka: siApachekafka,
  canvas: siCanvas,
  clerk: siClerk,
  cloudinary: siCloudinary,
  docker: siDocker,
  express: siExpress,
  fastapi: siFastapi,
  framer: siFramer,
  githubactions: siGithubactions,
  googlegemini: siGooglegemini,
  jest: siJest,
  langchain: siLangchain,
  langgraph: siLanggraph,
  minio: siMinio,
  mongodb: siMongodb,
  mongoose: siMongoose,
  natsdotio: siNatsdotio,
  nextdotjs: siNextdotjs,
  nginx: siNginx,
  nodedotjs: siNodedotjs,
  openai: siOpenai,
  postgresql: siPostgresql,
  react: siReact,
  redis: siRedis,
  redux: siRedux,
  shadcnui: siShadcnui,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  upstash: siUpstash,
  vercel: siVercel,
  vite: siVite,
};

/** Normalized label → simple-icons slug. Concept-only tags are omitted. */
const LABEL_TO_SLUG: Record<string, string> = {
  ai: "",
  anthropic: "anthropic",
  auth: "",
  aws: "amazonwebservices",
  "aws ec2 / lambda": "amazonwebservices",
  b2b2c: "",
  "ci/cd": "githubactions",
  canvas: "canvas",
  clerk: "clerk",
  cloudinary: "cloudinary",
  "code splitting": "",
  docker: "docker",
  enterprise: "",
  "event-driven": "",
  express: "express",
  "express.js": "express",
  fastapi: "fastapi",
  framer: "framer",
  "framer motion": "framer",
  gemini: "googlegemini",
  github: "",
  googlegemini: "googlegemini",
  groq: "",
  "hitl workflows": "",
  jest: "jest",
  jwt: "",
  "jwt / rbac": "",
  kafka: "apachekafka",
  langchain: "langchain",
  langgraph: "langgraph",
  microservices: "",
  minio: "minio",
  mongodb: "mongodb",
  mongoose: "mongoose",
  nats: "natsdotio",
  nextjs: "nextdotjs",
  "next.js": "nextdotjs",
  "next.js 16": "nextdotjs",
  "next.js ssr/ssg": "nextdotjs",
  nginx: "nginx",
  nodejs: "nodedotjs",
  "node.js": "nodedotjs",
  openai: "openai",
  performance: "",
  postgresql: "postgresql",
  product: "",
  "prompt engineering": "",
  rag: "",
  "rag pipelines": "",
  react: "react",
  "react.js": "react",
  "redis caching": "redis",
  redux: "redux",
  "redux toolkit": "redux",
  "rest apis": "",
  s3: "amazons3",
  shadcn: "shadcnui",
  "shadcn ui": "shadcnui",
  "shadcn/ui": "shadcnui",
  "system design": "",
  sustainability: "",
  tailwind: "tailwindcss",
  "tailwind css": "tailwindcss",
  typescript: "typescript",
  upstash: "upstash",
  "upstash redis": "upstash",
  "vector search": "",
  vercel: "vercel",
  vite: "vite",
  "core web vitals": "",
};

const COMPOUND_LABELS: Record<string, string[]> = {
  "minio / s3": ["MinIO", "S3"],
  "postgresql / mongodb": ["PostgreSQL", "MongoDB"],
  "s3 / minio": ["S3", "MinIO"],
};

function normalizeLabel(label: string) {
  return label.trim().toLowerCase().replace(/\s+/g, " ");
}

export function resolveTechIcon(label: string): SimpleIcon | null {
  const slug = LABEL_TO_SLUG[normalizeLabel(label)];
  if (!slug) return null;
  return ICON_BY_SLUG[slug] ?? null;
}

/** Split combined tags when each part has an icon; otherwise return as-is. */
export function expandStackLabels(label: string): string[] {
  const normalized = normalizeLabel(label);
  if (COMPOUND_LABELS[normalized]) {
    return COMPOUND_LABELS[normalized];
  }
  if (label.includes(" / ")) {
    const parts = label.split(" / ").map((part) => part.trim());
    if (parts.length > 1 && parts.every((part) => resolveTechIcon(part))) {
      return parts;
    }
  }
  return [label];
}

export function expandStackItems(items: readonly string[]): string[] {
  return items.flatMap((item) => expandStackLabels(item));
}
