import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Pickling BackOffice'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
