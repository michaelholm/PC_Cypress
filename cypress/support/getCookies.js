const puppeteer = require('puppeteer')
async function getCookies({ baseUrl, username, password }) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()
  await page.goto(baseUrl)
  await page.waitForSelector('[id=idp-discovery-username]', {
    visible: true,
    timeout: 0
  })  
  await page.click('[id=idp-discovery-username]')
  await page.type(
    '[id=idp-discovery-username]',
    username || process.env.CYPRESS_OKTA_USERNAME
  )
  await page.click('#idp-discovery-submit')
  await page.waitForSelector('#okta-signin-password', {
    visible: true,
    timeout: 0
  })
  await page.click('#okta-signin-password')
  await page.type(
    '#okta-signin-password',
    password || process.env.CYPRESS_OKTA_PASSWORD
  )
  await page.click('#okta-signin-submit')
  await page.waitForNavigation()
  const cookies = await page.cookies()
  const arcCookies = cookies.filter(
    (cookie) => cookie.name === 'Arc-Token' || cookie.name === 'Arc-Client-Info'
  )
  await browser.close()
  return arcCookies
}
module.exports = getCookies