// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeTablaTarjetas from './plugins/rehype-tabla-tarjetas.mjs';

// En GitHub Actions, GITHUB_REPOSITORY vale "dueño/repositorio".
// En local se usa el repositorio de origen de este proyecto.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? 'juancho20sp/nata-dian').split('/');
const esSitioDeUsuario = repo === `${owner}.github.io`;
const base = esSitioDeUsuario ? '/' : `/${repo}`;
// Astro no antepone `base` al destino de las redirecciones: se agrega a mano.
const conBase = (/** @type {string} */ ruta) => `${base === '/' ? '' : base}${ruta}`;

export default defineConfig({
  site: `https://${owner}.github.io`,
  base,
  trailingSlash: 'ignore',
  // Rutas anteriores al rediseño (ver openspec/changes/rediseno-arquitectura-informacion).
  redirects: {
    '/hoy': conBase('/plan'),
    '/planes': conBase('/plan/elegir'),
    '/recursos': conBase('/prueba/practicar'),
  },
  markdown: {
    rehypePlugins: [rehypeTablaTarjetas],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
