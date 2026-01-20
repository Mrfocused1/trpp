const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Puppeteer test script for Chapter11Shop mobile horizontal scroll
 * Tests the mobile horizontal scroll functionality on localhost:3002
 */

async function testMobileScroll() {
  const results = {
    testName: 'Chapter11Shop Mobile Horizontal Scroll Test',
    timestamp: new Date().toISOString(),
    url: 'http://localhost:3002',
    viewport: { width: 375, height: 667 }, // iPhone SE dimensions
    tests: [],
    screenshots: [],
    success: true
  };

  let browser;

  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set mobile viewport (iPhone SE)
    await page.setViewport({
      width: 375,
      height: 667,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    });

    console.log('Navigating to localhost:3002...');
    await page.goto('http://localhost:3002', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for the page to fully load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 1: Check if Chapter11Shop section exists
    console.log('Test 1: Checking if Chapter11Shop section exists...');
    const sectionExists = await page.$('#ch11');
    results.tests.push({
      name: 'Chapter11Shop section exists',
      passed: !!sectionExists,
      details: sectionExists ? 'Section found with id="ch11"' : 'Section not found'
    });

    if (!sectionExists) {
      console.log('Section not found, scrolling down to find it...');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Scroll to Chapter11Shop section
    console.log('Scrolling to Chapter11Shop section...');
    await page.evaluate(() => {
      const section = document.querySelector('#ch11');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Take initial screenshot
    const screenshotPath1 = path.join(__dirname, 'screenshot-ch11-initial.png');
    await page.screenshot({ path: screenshotPath1, fullPage: false });
    results.screenshots.push({ name: 'Initial view', path: screenshotPath1 });
    console.log(`Screenshot saved: ${screenshotPath1}`);

    // Test 2: Check for horizontal scroll container
    console.log('Test 2: Checking horizontal scroll container...');
    const containerInfo = await page.evaluate(() => {
      const wrapper = document.querySelector('#ch11 .horiz-gallery-wrapper');
      if (!wrapper) return null;

      return {
        exists: true,
        overflowX: window.getComputedStyle(wrapper).overflowX,
        scrollWidth: wrapper.scrollWidth,
        clientWidth: wrapper.clientWidth,
        hasScroll: wrapper.scrollWidth > wrapper.clientWidth,
        dataLenisPreventTouch: wrapper.getAttribute('data-lenis-prevent-touch'),
        touchAction: window.getComputedStyle(wrapper).touchAction
      };
    });

    results.tests.push({
      name: 'Horizontal scroll container configured',
      passed: containerInfo && containerInfo.exists && containerInfo.hasScroll,
      details: containerInfo || 'Container not found'
    });

    // Test 3: Check product cards
    console.log('Test 3: Checking product cards...');
    const productCardsInfo = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#ch11 .product-card'));
      return {
        count: cards.length,
        widths: cards.map(card => ({
          offsetWidth: card.offsetWidth,
          clientWidth: card.clientWidth,
          scrollWidth: card.scrollWidth
        }))
      };
    });

    results.tests.push({
      name: 'Product cards present',
      passed: productCardsInfo.count === 4,
      details: `Found ${productCardsInfo.count} product cards (expected 4)`
    });

    // Test 4: Simulate horizontal scroll
    console.log('Test 4: Simulating horizontal scroll...');
    const scrollResult = await page.evaluate(() => {
      const wrapper = document.querySelector('#ch11 .horiz-gallery-wrapper');
      if (!wrapper) return { success: false, reason: 'Wrapper not found' };

      const initialScrollLeft = wrapper.scrollLeft;
      wrapper.scrollLeft = 375; // Scroll one viewport width

      return {
        success: true,
        initialScrollLeft,
        scrollLeftAfter: wrapper.scrollLeft,
        scrolled: wrapper.scrollLeft > initialScrollLeft
      };
    });

    results.tests.push({
      name: 'Horizontal scroll works',
      passed: scrollResult.scrolled,
      details: scrollResult
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Take screenshot after scroll
    const screenshotPath2 = path.join(__dirname, 'screenshot-ch11-scrolled.png');
    await page.screenshot({ path: screenshotPath2, fullPage: false });
    results.screenshots.push({ name: 'After scroll', path: screenshotPath2 });
    console.log(`Screenshot saved: ${screenshotPath2}`);

    // Test 5: Check data-lenis-prevent attributes
    console.log('Test 5: Checking Lenis prevention attributes...');
    const lenisAttributes = await page.evaluate(() => {
      const section = document.querySelector('#ch11');
      const wrapper = document.querySelector('#ch11 .horiz-gallery-wrapper');

      return {
        sectionHasDataLenisPrevent: section?.hasAttribute('data-lenis-prevent'),
        wrapperHasDataLenisPreventTouch: wrapper?.hasAttribute('data-lenis-prevent-touch')
      };
    });

    results.tests.push({
      name: 'Lenis prevention attributes present',
      passed: lenisAttributes.sectionHasDataLenisPrevent && lenisAttributes.wrapperHasDataLenisPreventTouch,
      details: lenisAttributes
    });

    // Test 6: Check touch action styles
    console.log('Test 6: Checking touch action styles...');
    const touchStyles = await page.evaluate(() => {
      const wrapper = document.querySelector('#ch11 .horiz-gallery-wrapper');
      if (!wrapper) return null;

      const styles = window.getComputedStyle(wrapper);
      return {
        touchAction: styles.touchAction,
        overscrollBehaviorX: styles.overscrollBehaviorX,
        WebkitOverflowScrolling: styles.WebkitOverflowScrolling
      };
    });

    results.tests.push({
      name: 'Touch action styles configured',
      passed: touchStyles && (touchStyles.touchAction === 'pan-x pan-y' || touchStyles.touchAction === 'pan-x'),
      details: touchStyles
    });

    // Scroll to second product
    console.log('Scrolling to second product...');
    await page.evaluate(() => {
      const wrapper = document.querySelector('#ch11 .horiz-gallery-wrapper');
      if (wrapper) {
        wrapper.scrollLeft = 375;
      }
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const screenshotPath3 = path.join(__dirname, 'screenshot-ch11-product2.png');
    await page.screenshot({ path: screenshotPath3, fullPage: false });
    results.screenshots.push({ name: 'Second product', path: screenshotPath3 });
    console.log(`Screenshot saved: ${screenshotPath3}`);

    // Scroll to third product
    console.log('Scrolling to third product...');
    await page.evaluate(() => {
      const wrapper = document.querySelector('#ch11 .horiz-gallery-wrapper');
      if (wrapper) {
        wrapper.scrollLeft = 750;
      }
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const screenshotPath4 = path.join(__dirname, 'screenshot-ch11-product3.png');
    await page.screenshot({ path: screenshotPath4, fullPage: false });
    results.screenshots.push({ name: 'Third product', path: screenshotPath4 });
    console.log(`Screenshot saved: ${screenshotPath4}`);

    // Scroll to fourth product
    console.log('Scrolling to fourth product...');
    await page.evaluate(() => {
      const wrapper = document.querySelector('#ch11 .horiz-gallery-wrapper');
      if (wrapper) {
        wrapper.scrollLeft = 1125;
      }
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const screenshotPath5 = path.join(__dirname, 'screenshot-ch11-product4.png');
    await page.screenshot({ path: screenshotPath5, fullPage: false });
    results.screenshots.push({ name: 'Fourth product', path: screenshotPath5 });
    console.log(`Screenshot saved: ${screenshotPath5}`);

    // Final summary
    const passedTests = results.tests.filter(t => t.passed).length;
    const totalTests = results.tests.length;
    results.success = passedTests === totalTests;
    results.summary = `${passedTests}/${totalTests} tests passed`;

    console.log('\n' + '='.repeat(60));
    console.log('TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`Status: ${results.success ? 'PASSED ✓' : 'FAILED ✗'}`);
    console.log(`Tests: ${results.summary}`);
    console.log(`Screenshots: ${results.screenshots.length} saved`);

    results.tests.forEach((test, i) => {
      console.log(`\n${i + 1}. ${test.name}: ${test.passed ? 'PASSED ✓' : 'FAILED ✗'}`);
      console.log(`   Details:`, JSON.stringify(test.details, null, 2));
    });

  } catch (error) {
    console.error('Test error:', error);
    results.success = false;
    results.error = {
      message: error.message,
      stack: error.stack
    };
  } finally {
    if (browser) {
      await browser.close();
    }

    // Save results to JSON file
    const resultsPath = path.join(__dirname, 'test-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`\nTest results saved to: ${resultsPath}`);

    // Save markdown report
    const reportPath = path.join(__dirname, 'test-report.md');
    const report = generateMarkdownReport(results);
    fs.writeFileSync(reportPath, report);
    console.log(`Test report saved to: ${reportPath}`);

    return results;
  }
}

function generateMarkdownReport(results) {
  const lines = [];

  lines.push('# Chapter11Shop Mobile Horizontal Scroll Test Report');
  lines.push('');
  lines.push(`**Test Date:** ${results.timestamp}`);
  lines.push(`**URL:** ${results.url}`);
  lines.push(`**Viewport:** ${results.viewport.width}x${results.viewport.height} (Mobile)`);
  lines.push(`**Status:** ${results.success ? '✓ PASSED' : '✗ FAILED'}`);
  lines.push(`**Summary:** ${results.summary || 'N/A'}`);
  lines.push('');

  lines.push('## Test Results');
  lines.push('');

  results.tests.forEach((test, i) => {
    lines.push(`### ${i + 1}. ${test.name}`);
    lines.push(`**Status:** ${test.passed ? '✓ PASSED' : '✗ FAILED'}`);
    lines.push('');
    lines.push('**Details:**');
    lines.push('```json');
    lines.push(JSON.stringify(test.details, null, 2));
    lines.push('```');
    lines.push('');
  });

  lines.push('## Screenshots');
  lines.push('');
  results.screenshots.forEach(screenshot => {
    lines.push(`- **${screenshot.name}:** \`${path.basename(screenshot.path)}\``);
  });
  lines.push('');

  if (results.error) {
    lines.push('## Error Details');
    lines.push('```');
    lines.push(results.error.message);
    lines.push('```');
    lines.push('');
  }

  return lines.join('\n');
}

// Run the test
testMobileScroll()
  .then(results => {
    process.exit(results.success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
