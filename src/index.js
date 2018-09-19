// K :: a -> b -> a
export const K = a => () => a

// I :: a -> a
export const I = a => a

// eq :: a -> b -> Boolean
export const eq = a => b => a === b

// ne :: a -> b -> Boolead
export const ne = a => b => a !== b

// typeOf :: a -> String
export const typeOf = a => typeof a

// instanceOf ::
export const instanceOf = t => a => a instanceof t

// isArray :: a -> Boolean
export const isArray = a => Array.isArray(a)

// isNull :: a -> Boolean
export const isNull = a => eq(null)(a)

// isFunction :: a -> Boolean
export const isFunction = a => eq('function')(typeOf(a))

// isString :: a -> Boolean
export const isString = a => eq('string')(typeOf(a))

// isNumber :: a -> Boolean
export const isNumber = a => eq('number')(typeOf(a))

// isBoolean :: a -> Boolean
export const isBoolean = a => eq('boolean')(typeOf(a))

// isDefined :: a -> Boolean
export const isDefined = a => ne('undefined')(typeOf(a))

// isObject :: a -> Boolean
export const isObject = a => eq('object')(typeOf(a)) && !isNull(a) && !isFunction(a) && !isArray(a)

// head :: [a] -> a
export const head = xs => xs[0]

// tail :: [a] -> [a]
export const tail = xs => xs.slice(1)

// reverse :: [a] -> [a]
export const reverse = xs => xs.slice().reverse()

// last :: [a] -> [a]
export const last = xs => head(reverse(xs))

// concat :: [b] -> [a] -> [c]
export const concat = b => a => a.concat(b)

// append :: a -> [a] -> [a]
export const append = a => xs => concat([a])(xs)

// prepend :: a -> [a] -> [a]
export const prepend = a => xs => concat(xs)([a])

// join :: String -> [String] -> String
export const join = s => xs => xs.join(s)

// map :: (a -> b) -> [a] -> [b]
export const map = f => xs => xs.map(f)

export const each = f => xs => xs.forEach(f)

// filter :: (a -> Boolean) -> [a] -> [a]
export const filter = f => xs => xs.filter(f)

// find :: (a -> Boolean) -> [a] -> a
export const find = f => xs => xs.find(f)

// reduce :: (b -> a -> b) -> b -> [a] -> b
export const reduce = f => a => xs => xs.reduce(f, a)

export const flatten = xs => reduce((a, c) => isArray(c) ? concat(flatten(c))(a) : append(c)(a))([])(xs)
export const sort = f => xs => xs.slice().sort(f)

export const noop = () => {}

// not :: Boolean -> Boolean
export const not = a => !a

export const apply = f => xs => f.apply(null, xs)
export const pipe = (...fns) => x => reduce((a, fn) => fn(a))(x)(fns)
export const compose = (...fns) => x => apply(pipe)(reverse(fns))(x)
export const composePromise = (...fns) => x => reduce((acc, fn) => Promise.resolve(acc).then(fn))(x)(reverse(fns))
export const method = k => x => (...args) => x[k](...args)
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
export const assoc = k => a => x => Object.assign(isArray(x) ? [] : {}, x, {[k]: a})
export const dissoc = k => x => reduce((acc, curr) => assoc(curr)(prop(curr)(x))(acc))({})(filter(ne(k))(keys(x)))
export const values = x => map(k => prop(k)(x))(keys(x))
export const has = k => x => isObject(x) && x.hasOwnProperty(k)
export const omit = xs => x => reduce((acc, curr) => dissoc(curr)(acc))(x)(xs)
export const objectOf = k => v => assoc(k)(v)({})

// toLower :: String -> String
export const toLower = s => s.toLowerCase()

// toUpper :: String -> String
export const toUpper = s => s.toUpperCase()

// split :: String -> String -> [String]
export const split = s => x => x.split(s)

const matched = x => freeze({
  on: () => matched(x),
  otherwise: () => x
})

export const match = x => freeze({
  on: (predicat, fn) => (predicat(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x)
})
