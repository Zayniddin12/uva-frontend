export function moneyMask() {
  return {
    mask: [
      'D',
      'DN',
      'DNN',
      'D NNN',
      'DN NNN',
      'DNN NNN',
      'D NNN NNN',
      'DN NNN NNN',
      'DNN NNN NNN',
      'D NNN NNN NNN',
    ],
    tokens: {
      D: {
        pattern: /[1-9]/,
      },
      N: {
        pattern: /[0-9]/,
      },
    },
  }
}
const timeouts = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}
export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key, fn, timeout) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {
        console.log(e)
      }

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}

export const share = (network, title) => {
  switch (network) {
    case 'telegram':
      window.open(
        `https://t.me/share/url?url=${window.location.href}&text=${title}`,
        '_blank'
      )
      break
    case 'twitter':
      window.open(
        `https://twitter.com/intent/tweet?text=${title}\n+${window.location.href}`,
        '_blank'
      )
      break
    case 'facebook':
      window.open(
        `https://www.facebook.com/sharer/sharer.php?t=${title}\n${window.location.href}`,
        '_blank'
      )
      break
  }
}
