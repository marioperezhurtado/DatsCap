const today = new Date(Date.now()).toLocaleDateString()

export default function useTimestamp(timestamp) {
  const initialDate = new Date(Date.parse(timestamp))
  const date = initialDate.toLocaleDateString(navigator.language)
  const time = initialDate.toLocaleTimeString(navigator.language, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })

  const displayDate = today === date ? '' : date

  return `${displayDate} ${time}`
}
