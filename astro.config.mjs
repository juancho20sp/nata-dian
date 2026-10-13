// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeTablaTarjetas from './plugins/rehype-tabla-tarjetas.mjs';

// En GitHub Actions, GITHUB_REPOSITORY vale "dueño/repositorio".
// En local se usa el repositorio de origen de este proyecto.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? 'juancho20sp/nata-dian').split('/');
const esSitioDeUsuario = repo === `${owner}.github.io`;

export default defineConfig({
  site: `https://${owner}.github.io`,
  base: esSitioDeUsuario ? '/' : `/${repo}`,
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeTablaTarjetas],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
