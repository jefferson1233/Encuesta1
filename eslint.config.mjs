import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Permitir el uso de `any`
      "@typescript-eslint/no-explicit-any": "off",

      // Permitir comentarios @ts-ignore y similares
      "@typescript-eslint/ban-ts-comment": "off",

      // No obligar a declarar todas las dependencias en useEffect
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
