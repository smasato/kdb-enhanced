import { time } from 'console'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  browser.contextMenus.create({
    title: 'Search KdB',
    contexts: ['selection'],
    type: 'normal',
    id: 'kdb',
  })
})

browser.contextMenus.onClicked.addListener((info, tab): void => {
  if (info.menuItemId === 'kdb') {
    const courseCode = info.selectionText as string
    const now = new Date()
    if (validate(courseCode)) {
      browser.tabs.create(
        { url: `https://kdb.tsukuba.ac.jp/syllabi/${now.getFullYear()}/${courseCode}/jpn/` },
      )
    }
  }
})

function validate(courseCode: string) {
  return /[A-Z0-9]{7,}/.test(courseCode)
}
