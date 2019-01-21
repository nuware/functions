export const K = a => () => a

export const I = a => a

export const eq = a => b => a === b

export const ne = a => b => a !== b

export const typeOf = a => typeof a

export const instanceOf = t => a => a instanceof t

export const isArray = a => Array.isArray(a)

export const isNull = a => eq(null)(a)

export const isFunction = a => eq('function')(typeOf(a))

export const isString = a => eq('string')(typeOf(a))

export const isNumber = a => eq('number')(typeOf(a))

export const isBoolean = a => eq('boolean')(typeOf(a))

export const isDefined = a => ne('undefined')(typeOf(a))

export const isObject = a => eq('object')(typeOf(a)) && !isNull(a) && !isFunction(a) && !isArray(a)

export const head = xs => xs[0]

export const tail = xs => xs.slice(1)

export const reverse = xs => xs.slice().reverse()

export const last = xs => head(reverse(xs))

export const length = x => (x && x.length) ? x.length : 0

export const concat = b => a => a.concat(b)

export const append = a => xs => concat([a])(xs)

export const prepend = a => xs => concat(xs)([a])

export const join = s => xs => xs.join(s)

export const map = f => xs => xs.map(f)

export const each = f => xs => xs.forEach(f)

export const filter = f => xs => xs.filter(f)

export const find = f => xs => xs.find(f)

export const reduce = f => a => xs => xs.reduce(f, a)

export const flatten = xs => reduce((a, c) => isArray(c) ? concat(flatten(c))(a) : append(c)(a))([])(xs)

export const sort = f => xs => xs.slice().sort(f)

export const noop = () => {}

export const not = a => !a

export const apply = f => xs => f.apply(null, xs)

export const pipe = (...fns) => x => reduce((a, fn) => fn(a))(x)(fns)

export const compose = (...fns) => x => apply(pipe)(reverse(fns))(x)

export const composePromise = (...fns) => x => reduce((acc, fn) => Promise.resolve(acc).then(fn))(x)(reverse(fns))

export const method = k => x => (...args) => x[k](...args)

export const juxt = (...fns) => (...args) => map((fn) => apply(fn)(args))(fns)

export const trampoline = (fn) => (...args) => {
  let recursion = apply(fn)(args)
  while (isFunction(recursion)) {
    recursion = recursion()
  }
  return recursion
}

export const freeze = x => Object.freeze(x)

export const keys = x => isObject(x) ? Object.keys(x) : []

export const prop = k => x => isObject(x) ? x[k] : void (0)

export const assoc = k => a => x => Object.assign(isArray(x) ? [] : {}, x, { [k]: a })

export const dissoc = k => x => reduce((acc, curr) => assoc(curr)(prop(curr)(x))(acc))({})(filter(ne(k))(keys(x)))

export const values = x => map(k => prop(k)(x))(keys(x))

export const has = k => x => isObject(x) && x.hasOwnProperty(k)

export const omit = xs => x => reduce((acc, curr) => dissoc(curr)(acc))(x)(xs)

export const pick = xs => x => reduce((acc, curr) => has(curr)(x) ? assoc(curr)(prop(curr)(x))(acc) : acc)({})(xs)

export const objectOf = k => v => assoc(k)(v)({})

export const toLower = s => s.toLowerCase()

export const toUpper = s => s.toUpperCase()

export const split = s => x => x.split(s)

export const equal = a => b => {
  if (eq(a)(b)) return true

  if (a && b && eq(typeOf(a))('object') && eq(typeOf(b))('object')) {
    if (isArray(a) ^ isArray(b)) return false

    if (isArray(a) && isArray(b)) {
      if (a.length ^ b.length) return false
      for (let i = a.length; i--;) {
        if (!equal(a[i], b[i])) return false
      }
      return true
    }

    if (instanceOf(Date)(a) ^ instanceOf(Date)(b)) return false

    if (instanceOf(Date)(a) && instanceOf(Date)(b)) {
      return !(a.getTime() ^ b.getTime())
    }

    if (instanceOf(RegExp)(a) ^ instanceOf(RegExp)(b)) return false

    if (instanceOf(RegExp)(a) && instanceOf(RegExp)(b)) {
      return eq(a.toString())(b.toString())
    }

    if (keys(a).length ^ keys(b).length) return false

    let xs = keys(a)

    for (let i = xs.length; i--;) {
      if (!has(xs[i])(b)) return false
    }

    for (let i = xs.length; i--;) {
      if (!equal(a[xs[i]])(b[xs[i]])) return false
    }

    return true
  }

  return ne(a)(a) && ne(b)(b)
}

const matched = x => freeze({
  on: () => matched(x),
  otherwise: () => x
})

export const match = x => freeze({
  on: (predicat, fn) => (predicat(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x)
})
