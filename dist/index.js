(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.F = {})));
}(this, (function (exports) { 'use strict';

	const K = a => () => a;
	const I = a => a;

	const eq = a => b => a === b;
	const ne = a => b => a !== b;

	// Types
	const typeOf = a => typeof a;
	const instanceOf = t => a => a instanceof t;
	const isArray = a => Array.isArray(a);
	const isNull = a => eq(null)(a);
	const isFunction = a => eq('function')(typeOf(a));
	const isString = a => eq('string')(typeOf(a));
	const isNumber = a => eq('number')(typeOf(a));
	const isBoolean = a => eq('boolean')(typeOf(a));
	const isDefined = a => ne('undefined')(typeOf(a));
	const isObject = a => eq('object')(typeOf(a)) && !isNull(a) && !isFunction(a) && !isArray(a);

	// Lists
	const head = xs => xs[0];
	const tail = xs => xs.slice(1);
	const reverse = xs => xs.slice().reverse();
	const concat = b => a => a.concat(b);
	const append = a => xs => concat([a])(xs);
	const prepend = a => xs => concat(xs)([a]);
	const join = s => xs => xs.join(s);
	const map = f => xs => xs.map(f);
	const each = f => xs => xs.forEach(f);
	const filter = f => xs => xs.filter(f);
	const find = f => xs => xs.find(f);
	const reduce = f => a => xs => xs.reduce(f, a);
	const flatten = xs => reduce((a, c) => isArray(c) ? concat(flatten(c))(a) : append(c)(a))([])(xs);

	// Functions
	const noop = () => {};
	const not = a => !a;
	const apply = f => xs => f.apply(null, xs);
	const pipe = (...fns) => x => reduce((a, fn) => fn(a))(x)(fns);
	const compose = (...fns) => x => apply(pipe)(reverse(fns))(x);
	const composePromise = (...fns) => x => reduce((acc, fn) => Promise.resolve(acc).then(fn))(x)(reverse(fns));
	const method = k => x => (...args) => x[k](...args);

	// Objects
	const freeze = x => Object.freeze(x);
	const keys = x => isObject(x) ? Object.keys(x) : [];
	const prop = k => x => isObject(x) ? x[k] : void (0);
	const assoc = k => a => x => Object.assign(isArray(x) ? [] : {}, x, {[k]: a});
	const dissoc = k => x => reduce((acc, curr) => assoc(curr)(prop(curr)(x))(acc))({})(filter(ne(k))(keys(x)));
	const values = x => map(k => prop(k)(x))(keys(x));
	const has = k => x => isObject(x) && x.hasOwnProperty(k);
	const omit = xs => x => reduce((acc, curr) => dissoc(curr)(acc))(x)(xs);
	const objectOf = k => v => Object.assign({}, {[k]: v});

	// Strings
	const toLower = s => s.toLowerCase();
	const toUpper = s => s.toUpperCase();
	const split = s => x => x.split(s);

	exports.K = K;
	exports.I = I;
	exports.eq = eq;
	exports.ne = ne;
	exports.typeOf = typeOf;
	exports.instanceOf = instanceOf;
	exports.isArray = isArray;
	exports.isNull = isNull;
	exports.isFunction = isFunction;
	exports.isString = isString;
	exports.isNumber = isNumber;
	exports.isBoolean = isBoolean;
	exports.isDefined = isDefined;
	exports.isObject = isObject;
	exports.head = head;
	exports.tail = tail;
	exports.reverse = reverse;
	exports.concat = concat;
	exports.append = append;
	exports.prepend = prepend;
	exports.join = join;
	exports.map = map;
	exports.each = each;
	exports.filter = filter;
	exports.find = find;
	exports.reduce = reduce;
	exports.flatten = flatten;
	exports.noop = noop;
	exports.not = not;
	exports.apply = apply;
	exports.pipe = pipe;
	exports.compose = compose;
	exports.composePromise = composePromise;
	exports.method = method;
	exports.freeze = freeze;
	exports.keys = keys;
	exports.prop = prop;
	exports.assoc = assoc;
	exports.dissoc = dissoc;
	exports.values = values;
	exports.has = has;
	exports.omit = omit;
	exports.objectOf = objectOf;
	exports.toLower = toLower;
	exports.toUpper = toUpper;
	exports.split = split;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
