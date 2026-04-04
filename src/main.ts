const form = document.getElementById('cleaner-form') as HTMLFormElement
const input = document.getElementById('url-input') as HTMLTextAreaElement
const errorSummary = document.getElementById('error-summary') as HTMLDivElement
const errorSummaryLink = document.getElementById('error-summary-link') as HTMLAnchorElement
const inlineError = document.getElementById('url-error') as HTMLParagraphElement
const inlineErrorText = document.getElementById('url-error-text') as HTMLSpanElement
const resultArea = document.getElementById('result-area') as HTMLDivElement
const resultLink = document.getElementById('result-link') as HTMLAnchorElement
const copyButton = document.getElementById('copy-button') as HTMLButtonElement

function showError(message: string): void {
  resultArea.hidden = true

  inlineErrorText.textContent = message
  inlineError.hidden = false
  input.setAttribute('aria-invalid', 'true')

  errorSummaryLink.textContent = message
  errorSummary.hidden = false
  errorSummary.focus()
}

function clearErrors(): void {
  inlineError.hidden = true
  inlineErrorText.textContent = ''
  input.removeAttribute('aria-invalid')
  errorSummary.hidden = true
}

function showResult(cleanUrl: string): void {
  clearErrors()
  resultLink.href = cleanUrl
  resultLink.textContent = cleanUrl
  resultArea.hidden = false
}

function extractCleanUrl(rawUrl: string): string {
  const url = new URL(rawUrl)

  if (url.origin !== 'https://www.civilservicejobs.service.gov.uk') {
    throw new Error('Enter a URL from civilservicejobs.service.gov.uk')
  }

  const jcode = url.searchParams.get('jcode')
  if (jcode) {
    return `https://www.civilservicejobs.service.gov.uk/csr/jobs.cgi?jcode=${jcode}`
  }

  const sid = url.searchParams.get('SID')
  if (!sid) throw new Error('Enter the URL of a specific job listing')

  let decoded: string
  try {
    decoded = atob(sid)
  } catch {
    throw new Error('Enter the URL of a specific job listing')
  }

  const params = new URLSearchParams(decoded)
  const jobId = params.get('joblist_view_vac')
  if (!jobId) throw new Error('Enter the URL of a specific job listing')

  return `https://www.civilservicejobs.service.gov.uk/csr/jobs.cgi?jcode=${jobId}`
}

input.addEventListener('input', () => {
  resultArea.hidden = true
})

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    form.requestSubmit()
  }
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const rawUrl = input.value.trim()

  if (!rawUrl) {
    showError('Enter a Civil Service Jobs URL')
    return
  }

  try {
    const cleanUrl = extractCleanUrl(rawUrl)
    showResult(cleanUrl)
  } catch {
    showError('Enter a full Civil Service Jobs URL for a specific job')
  }
})

copyButton.addEventListener('click', () => {
  const url = resultLink.href
  navigator.clipboard.writeText(url).then(() => {
    copyButton.textContent = 'URL copied'
    setTimeout(() => {
      copyButton.textContent = 'Copy to clipboard'
    }, 2000)
  })
})
