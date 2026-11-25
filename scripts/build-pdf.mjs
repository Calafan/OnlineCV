import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const outputDir = resolve('assets/pdf');
const pages = [
    { html: 'index.html', pdf: 'Andrea_Calafiore_CV_IT.pdf' },
    { html: 'en.html', pdf: 'Andrea_Calafiore_CV_EN.pdf' },
];

mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });

for (const { html, pdf } of pages) {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(resolve(html)).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const path = resolve(outputDir, pdf);
    await page.pdf({ path, preferCSSPageSize: true, printBackground: true });
    console.log(path);

    await page.close();
}

await browser.close();
