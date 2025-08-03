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
      // Cambiar reglas estrictas a warnings
      "@typescript-eslint/no-explicit-any": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",
      
      // Deshabilitar reglas molestas
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "prefer-const": "warn",
      "no-console": "off",
    },
  },
];

export default eslintConfig;