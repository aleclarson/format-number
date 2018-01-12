
module.exports = formatNumber

function formatNumber(n) {
  if (n >= 0.1) {
    let unit
    if (n >= 1e6) {
      if (n >= 1e9) {
        n /= 1e9
        unit = 'B'
      } else {
        n /= 1e6
        unit = 'M'
      }
    }
    if (n >= 1e3) {
      if (unit) n = floor(n, 2)
      n = addCommas(n)
    } else {
      n = floor(n, 2)
      n += zeroTrail(n)
    }
    return unit ? n + ' ' + unit : n
  } else {
    if (n < 0.000001) {
      return ''
    }
    // 0.0012345 => 0.00123
    return String(n).slice(0, Math.min(8, firstNonZero(n) + 3))
  }
}

// 1000.1 => 1,000.10
function addCommas(n) {
  const whole = Math.floor(n), fraction = n - whole
  return splitEveryNth(String(whole), 3).join(',') +
    (fraction ? String(fraction).substr(1, 3) : '.00')
}

function splitEveryNth(str, n) {
  const len = str.length
  if (len > n) {
    let i = len - n
    const parts = []
    while (true) {
      parts.push(str.substr(i, n))
      if (i <= n) {
        parts.push(str.substr(0, i))
        return parts.reverse()
      }
      i -= n
    }
  }
  return [str]
}

function floor(x, p) {
  const q = Math.pow(10, p)
  return Math.floor(q * x + q / 1e16) / q
}

function round(x, p) {
  const q = Math.pow(10, p)
  return Math.round(q * x + q / 1e16) / q
}

function zeroTrail(n) {
  const whole = Math.floor(n)
  const fraction = round(n - whole, 2)
  if (fraction == 0) {
    return '.00'
  } else if (fraction * 100 % 10 == 0) {
    return '0'
  }
  return ''
}

// 0.001 => 4
function firstNonZero(n) {
  if (n >= 1) return 0
  let i = 1
  do {
    n *= 10
    i += 1
  } while (n < 1)
  return i
}
