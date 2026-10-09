// Genera los PDF tamaño carta: node generar.js
const { chromium } = require('playwright');
const path = require('path');

const html = 'file://' + path.join(__dirname, 'certificado.html');
const archivos = [
  { nombre: null, salida: 'Reconocimientos_Ponentes_Desayuno40.pdf' },
  { nombre: 'Sandy Landazuri', salida: 'Reconocimiento_Sandy_Landazuri.pdf' },
  { nombre: 'Anahí Campos', salida: 'Reconocimiento_Anahi_Campos.pdf' },
  { nombre: 'Martha Albarrán', salida: 'Reconocimiento_Martha_Albarran.pdf' },
  { nombre: '', salida: 'Reconocimiento_EN_BLANCO.pdf' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const a of archivos) {
    const url = a.nombre === null ? html : html + '?nombre=' + encodeURIComponent(a.nombre);
    await page.goto(url);
    await page.waitForSelector('body[data-ready="1"]');
    await page.pdf({ path: path.join(__dirname, a.salida), width: '11in', height: '8.5in', printBackground: true, preferCSSPageSize: true });
    console.log('OK', a.salida);
  }
  await browser.close();
})();
