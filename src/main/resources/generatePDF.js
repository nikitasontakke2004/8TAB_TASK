const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let browser;
    try {
        // Windows par permissions issues se bachne ke liye args zaroori hain
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        const htmlFilePath = process.argv[2];
        const outputPath = process.argv[3];

        // Check if temp file exists
        if (!fs.existsSync(htmlFilePath)) {
            throw new Error(`Temp HTML file not found at: ${htmlFilePath}`);
        }

        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

        // Wait until network is idle to ensure all styles/data are rendered
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px' }
        });

        console.log('PDF_GENERATION_SUCCESS');
    } catch (error) {
        console.error("NODE_ERROR: " + error.message);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
    }
})();