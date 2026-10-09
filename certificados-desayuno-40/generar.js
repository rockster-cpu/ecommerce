// Genera los PDF tamaño carta:  node generar.js [certificado.html] [prefijo]
const { chromium } = require('playwright');
const path = require('path');

const archivo = process.argv[2] || 'certificado.html';
const prefijo = process.argv[3] || 'Reconocimiento';
const html = 'file://' + path.join(__dirname, archivo);
const sinAcentos = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '_');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const abrir = async url => { await page.goto(url); await page.waitForSelector('body[data-ready="1"]'); };
  const pdf = async salida => {
    await page.pdf({ path: path.join(__dirname, salida), width: '11in', height: '8.5in', printBackground: true, preferCSSPageSize: true });
    console.log('OK', salida);
  };

  await abrir(html);
  const nombres = await page.evaluate(() => NOMBRES);
  await pdf(`${prefijo}_TODAS.pdf`);
  for (const n of [...nombres, '']) {
    await abrir(html + '?nombre=' + encodeURIComponent(n));
    await pdf(`${prefijo}_${n ? sinAcentos(n) : 'EN_BLANCO'}.pdf`);
  }
  await browser.close();
})();
