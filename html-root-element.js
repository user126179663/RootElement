class HTMLAttributesLocker extends HTMLElement {
	
	static {
		
		this.tagName = 'attributes-locker',
		
		this.$attribute = Symbol('HTMLAttributesLocker.attribute'),
		
		this.READABLE = 1,
		this.WRITABLE = 2,
		this.LOCKED = 4,
		
		this.UNLOCKED = this.READABLE + this.WRITABLE,
		
		this[this.$attribute] = Object.create(null);
		
	}
	
	static attr2val(str, type, defaultValue) {
		
		switch (type) {
			
			case 'ba':
			return str === null || str === undefined ? false : true;
			break;
			
			default:
			return HTMLAttributesLocker.str2val(str, type, defaultValue);
			
		}
		
	}
	static camelize(str, index = 0, delimiter = '-') {
		
		const splitted = (''+str).split(''+delimiter), l = splitted.length;
		let i, k, camel;
		
		camel = splitted?.[i = +index] ?? '';
		while (++i < l) camel += (k = splitted[i])[0].toUpperCase() + k.slice(1);
		
		return camel;
		
	}
	static str2val(str, type, defaultValue) {
		
		switch (type) {
			
			case 'array':
			return str.split(' ');
			
			case 'bigint':
			try {
				str = BigInt(str);
			} catch (error) {
				console.error(error), str = defaultValue;
			};
			return str;
			
			case 'boolean':
			return !!str;
			
			case 'function':
			return new Function(str);
			
			case 'integer':
			return Number.isNaN(str = +str) ? defaultValue : parseInt(str);
			
			case 'json': case 'object': 
			try {
				str = JSON.parse(str);
			} catch (error) {
				console.error(error), str = defaultValue;
			};
			return str;
			
			case 'nn':
			return Number.isNaN(str = +str) ? defaultValue : (str = parseInt(str)) < 0 ? 0 : str;
			
			case 'number':
			return Number.isNaN(str = +str) ? defaultValue : str;
			
			case 'string':
			return '' + (str ?? '');
			
			case 'symbol':
			return Symbol(str);
			
			case 'undefined':
			return undefined;
			
			default:
			typeof type === 'function' && (str = type(str));
			return str;
			
		}
		
	}
	static val2str(val, type = Array.isArray(val) ? 'array' : typeof val, defaultValue) {
		
		switch (type) {
			
			case 'array':
			return val.join(' ');
			
			case 'json':
			case 'object':
			try {
				val = JSON.stringify(val);
			} catch (error) {
				console.error(error), val = defaultValue;
			};
			return val;
			
			case 'symbol':
			return val.description;
			
			case 'undefined':
			return '';
			
			default:
			return typeof type === 'function' ? (val = type(val)) : val.toString();
			
		}
		
	}
	
	constructor() {
		
		super();
		
	}
	
	getFlags(name) {
		
		const { $attribute, UNLOCKED } = HTMLAttributesLocker;
		
		return this.constructor?.[$attribute]?.[name] ?? UNLOCKED;
		
	}
	getLockedAttribute(name, defaultValue, type = 'string') {
		
		return	this.isReadableAttribute(name) ?
						HTMLAttributesLocker.attr2val(this.getAttribute(name), defaultValue, type) : defaultValue;
		
	}
	setLockedAttribute(name, value, typeOrAsBooleanAttribute) {
		
		const writes = this.isWritableAttribute(name);
		
		writes &&
			(
				typeof typeOrAsBooleanAttribute === 'string' ?
					this.setAttribute(name, HTMLAttributesLocker.val2str(value, typeOrAsBooleanAttribute)) :
					this.toggleAttribute(name, !!value)
			);
		
		return writes;
		
	}
	
	isFlaggedAttribute(name, flags) {
		
		const v = this.getFlags(name);
		
		return typeof v === 'number' && v & flags;
		
	}
	isLockedAttribute(name) {
		
		return !!this.isFlaggedAttribute(name, HTMLAttributesLocker.LOCKED);
		
	}
	isReadableAttribute(name) {
		
		return !!this.isFlaggedAttribute(name, HTMLAttributesLocker.READABLE);
		
	}
	isUnlockedAttribute(name) {
		
		return !!this.isFlaggedAttribute(name, HTMLAttributesLocker.UNLOCKED);
		
	}
	isWritableAttribute(name) {
		
		return !!this.isFlaggedAttribute(name, HTMLAttributesLocker.WRITABLE);
		
	}
	
}
customElements.define(HTMLAttributesLocker.tagName, HTMLAttributesLocker);

class HTMLMutationEmitter extends HTMLAttributesLocker {
	
	static {
		
		this.tagName = 'mutation-emitter',
		
		this.$defaultInit = Symbol('HTMLMutationEmitter.defaultInit'),
		this.$init = Symbol('HTMLMutationEmitter.init'),
		this.$mutated = Symbol('HTMLMutationEmitter.mutated'),
		this.$observer = Symbol('HTMLMutationEmitter.observer'),
		
		this[this.$mutated] = HTMLMutationEmitter.mutated,
		
		this.initAttributeName = {
			attributeFilter: 'observed-attribute-filter',
			attributes: 'observes-attributes',
			attributeOldValue: 'records-attribute-old-value',
			characterData: 'observes-character-data',
			characterDataOldValue: 'records-character-data-old-value',
			childList: 'observes-child-list',
			subtree: 'observes-subtree'
		},
		this.observedAttributesValue = Object.values(this.initAttributeName),
		
		this[HTMLAttributesLocker.$attributes] = {
			'observed-attribute-filter': HTMLAttributesLocker.LOCKED,
			'observes-attributes': HTMLAttributesLocker.LOCKED,
			'records-attribute-old-value': HTMLAttributesLocker.LOCKED,
			'observes-character-data': HTMLAttributesLocker.LOCKED,
			'records-character-data-old-value': HTMLAttributesLocker.LOCKED,
			'observes-child-list': HTMLAttributesLocker.LOCKED,
			'observes-subtree': HTMLAttributesLocker.LOCKED
		};
		
	}
	
	static get observedAttributes() {
		
		return this.observedAttributesValue;
		
	}
	
	static getAttrNameByInitKey(key) {
		
		return HTMLMutationEmitter.initAttributeName[key] ?? null;
		
	}
	static getInitKeyByAttrName(name) {
		
		const { initAttributeName } = HTMLMutationEmitter;
		let k;
		
		for (k in initAttributeName) if (initAttributeName[k] === name) return k;
		
		return null;
		
	}
	
	static mutated(mrs) {
		
		const l = mrs.length;
		let i,i0,ia,la,ir,lr, k,v, mr, target, attribute, characterData, childList, addedNodes, removedNodes, node;
		
		i = ia = ir = -1;
		while (++i < l) {
			
			switch ((mr = mrs[i]).type) {
				
				case 'attributes':
				(v = (attribute ??= new Map()).get(target = mr.target) ?? (attribute.set(target, v = {}), v))
					[k = mr.attributeName] = { current: target.getAttribute(k), last: mr.oldValue, mutationRecord: mr };
				break;
				
				case 'characterData':
				characterData = mr;
				break;
				
				case 'childList':
				
				if (la = (v = mr.addedNodes)?.length) {
					i0 = -1, addedNodes ??= [];
					while (++i0 < la) addedNodes.indexOf(node = v[i0]) === -1 && (addedNodes[++ia] = node);
				}
				
				if (lr = (v = mr.removedNodes)?.length) {
					i0 = -1, removedNodes ??= [];
					while (++i0 < lr) removedNodes.indexOf(node = v[i0]) === -1 && (removedNodes[++ir] = node);
				}
				
				(la || lr) && ((childList ??= [])[childList.length] = mr);
				
				break;
				
			}
			
		}
		hi({ attribute, characterData, childList, addedNodes, removedNodes, mutationRecords: mrs });
		this.dispatchEvent
			(
				new CustomEvent(
					'mutated',
					{ attribute, characterData, childList, addedNodes, removedNodes, mutationRecords: mrs }
				)
			);
		
	}
	
	constructor() {
		
		super();
		
		const	{ $observer, $init, $defaultInit, $mutated } = HTMLRootElement,
				mutated = this.constructor[$mutated],
				callback = typeof mutated === 'function' && mutated,
				defaultInit = this.constructor[$defaultInit];
		
		typeof callback === 'function' && this.updateMutationEmitter(callback.bind(this)),
		
		defaultInit && typeof defaultInit === 'object' && this.observeMutation(defaultInit, true);
		
	}
	attributeChangedCallback(name, last, current) {
		
		const { observedAttributesValue } = HTMLMutationEmitter;
		
		if (observedAttributesValue.indexOf(name) !== -1) {
			
			const init = this.getObserverInit();
			
			if (init && typeof init === 'object') {
				
				let k,v;
				
				(current !== (v = this[k = HTMLAttributesLocker.camelize(name)])) &&
					(this[k] = current, this.observeMutation());
				
			}
			
		}
		
	}
	disconnectMutationEmitter() {
		
		const { $observer } = HTMLMutationEmitter, observer = this[$observer];
		
		observer instanceof MutationObserver && observer.disconnect();
		
	}
	getObserverInit() {
		
		const init = this[HTMLMutationEmitter.$init];
		
		return init && typeof init === 'object' ? init : undefined;
		
	}
	getObserverInitValue(key, type) {
		
		const	init = this.getObserverInit();
		let v;
		
		if (init) {
			
			const attrName = HTMLMutationEmitter.getAttrNameByInitKey(key);
			
			attrName &&	(v = this.getLockedAttribute(attrName, v = init[key], type));
			
		}
		
		return v;
		
	}
	observeMutation(init = this[HTMLMutationEmitter.$init], replaces) {
		
		const { $observer } = HTMLMutationEmitter, observer = this[$observer];
		
		if (observer instanceof MutationObserver && init && typeof init === 'object') {
			
			const	{ isArray } = Array, { $observer, $init } = HTMLRootElement,
					currentInit = replaces ? (this[$init] = {}) : this[$init];
			
			if (init !== currentInit) {
				
				let k, v;
				
				for (k in init)
					(v = init[k]) === null ? delete currentInit[k] : (currentInit[k] = isArray(v) ? [ ...v ] : v);
				
			}
			
			observer.observe(this, currentInit);
			
			return true;
			
		}
		
		return false;
		
	}
	updateMutationEmitter(callback) {
		
		const	{ $mutated, $observer, mutated } = HTMLMutationEmitter;
		
		callback = typeof mutated === 'function' && mutated.bind(this);
		
		if (callback) {
			
			this.disconnectMutationEmitter(),
			
			this[$observer] = new MutationObserver(this[$mutated] = callback);
			
		}
		
	}
	setObserverInitValue(key, value, typeOrAsBooleanAttribute, reflects) {
		
		const { $init, getAttrNameByInitKey } = HTMLMutationEmitter, attrName = getAttrNameByInitKey(key);
		
		attrName &&
			(
				this.setLockedAttribute
					(attrName, value = typeof value === 'string' || value, typeOrAsBooleanAttribute) || !reflects
			) &&
			(this[$init][key] = Array.isArray(value) ? [ ...value ] : !!value, this.observeMutation());
		
	}
	
	get observedAttributeFilter() {
		
		return this.getObserverInitValue('attributeFilter', 'array');
		
	}
	set observedAttributeFilter(v) {
		
		this.setObserverInitValue('attributeFilter', v, 'array');
		
	}
	get observesAttributes() {
		
		return this.getObserverInitValue('attributes', 'ba');
		
	}
	set observesAttributes(v) {
		
		this.setObserverInitValue('attributes', v, true);
		
	}
	get observesCharacterData() {
		
		return this.getObserverInitValue('characterData', 'ba');
		
	}
	set observesCharacterData(v) {
		
		this.setObserverInitValue('characterData', v, true);
		
	}
	get observesChildList() {
		
		return this.getObserverInitValue('childList', 'ba');
		
	}
	set observesChildList(v) {
		
		this.setObserverInitValue('childList', v, true);
		
	}
	get observesSubtree() {
		
		return this.getObserverInitValue('subtree', 'ba');
		
	}
	set observesSubtree(v) {
		
		this.setObserverInitValue('subtree', v, true);
		
	}
	get recordsAttributeOldValue() {
		
		return this.getObserverInitValue('attributeOldValue', 'ba');
		
	}
	set recordsAttributeOldValue(v) {
		
		this.setObserverInitValue('attributeOldValue', v, true);
		
	}
	get recordsCharacterDataOldValue() {
		
		return this.getObserverInitValue('characterDataOldValue', 'ba');
		
	}
	set recordsCharacterDataOldValue(v) {
		
		this.setObserverInitValue('characterDataOldValue', v, true);
		
	}
	
}
customElements.define(HTMLMutationEmitter.tagName, HTMLMutationEmitter);

class HTMLAttrSpec extends HTMLElement {
	
	static {
		
		this.tagName = 'attr-spec',
		
		this.$noSpec = Symbol('HTMLAttrSpec.noSpec');
		
	}
	
	constructor() {
		
		super();
		
	}
	
	*[Symbol.iterator]() {
		
		const { children } = this, l = children.length;
		let i, child;
		
		i = -1;
		while (++i < l) (child = children[i]) instanceof HTMLAttrVal && (yield child);
		
	}
	
	getSpec(nameOrAttr) {
		
		const	specs =	this.querySelectorAll
								(`:scope > [name="${nameOrAttr instanceof Attr ? nameOrAttr.name : nameOrAttr}"]`),
				spec = specs?.[specs.length - 1];
		
		return spec instanceof HTMLAttrVal ? spec : null;
		
	}
	specify(element) {
		
		const	{ camelize } = HTMLAttributesLocker,
				{ $false } = HTMLAttrVal,
				{ asCamel, inherit } = this,
				{ attributes } = element,
				host = element.closest(inherit),
				hostAttributes = host?.attributes,
				specified = {};
		let i,k,k0,v, spec, attr;
		
		for (spec of this) {
			
			(
				v =	(
							attr = attributes[k = spec.name] ??
								((k0 = spec.inheritedProperty) && k0 in host ? host[k0] : hostAttributes?.[spec.inheritedName]),
							attr instanceof Attr ? spec.specify(attr) : attr
						)
			) === $false || (specified[asCamel ? camelize(k) : k] = v);
			
		}
		
		//for (v of this) {
		//	
		//	if ((k = v.name) in attributes) {
		//		
		//		(v = this.specifyAttr(attr = attributes[k])) === $false ||
		//			(specified[asCamel ? camelize(k) : k] = v);
		//		
		//	} else if (globalNode instanceof Element && (k0 = v.globalName) in attributes) {
		//		
		//		const { attributes } = globalNode; 
		//		
		//		(v0 = this.specifyAttr(attr = attributes[k0], k) === $false) ||
		//			(specified[asCamel ? camelize(k) : k] = v0);
		//		
		//	}
		//	
		//}
		//
		//const { attributes } = element, l = attributes.length;
		//
		//i = -1;
		//while (++i < l)	attr = attributes[i],
		//						(v = this.specifyAttr(attr)) === $false ||
		//							(specified[asCamel ? camelize(attr.name) : attr.name] = v);
		
		return specified;
		
	}
	specifyAttr(attr, as) {
		
		const spec = this.getSpec(as || attr);
		
		return spec ? spec.specify(attr) : attr?.value;
		
	}
	
	get asCamel() {
		
		return this.hasAttribute('camel-case');
		
	}
	set asCamel(v) {
		
		this.toggleAttribute('camel-case', !!v);
		
	}
	get inherit() {
		
		return this.getAttribute('inherit');
		
	}
	set inherit(v) {
		
		return this.setAttribute('inherit', v);
		
	}
	
}
customElements.define(HTMLAttrSpec.tagName, HTMLAttrSpec);

class HTMLAttrVal extends HTMLElement {
	
	static {
		
		this.tagName = 'attr-val',
		
		this.$false = Symbol('HTMLAttrVal.false'),
		this.$specify = Symbol('HTMLAttrVal.specify');
		
	}
	
	constructor() {
		
		super();
		
	}
	
	specify(attr) {
		
		const { $specify, $specifyValue } = HTMLAttrVal;
		
		if (attr instanceof Attr) {
			
			const { name, value } = attr;
			
			return this[$specify]?.(value, name, attr);
			
		} else return	this.asBool ? HTMLAttrVal.$false :
								this[typeof this[$specifyValue] === 'function' ? $specifyValue : $specify]?.(attr);
		
	}
	
	get asBool() {
		
		return this.hasAttribute('bool');
		
	}
	set asBool(v) {
		
		return this.toggleAttribute('bool', !!v);
		
	}
	get inheritedName() {
		
		return this.getAttribute('inherited-name');
		
	}
	set inheritedName(v) {
		
		return this.setAttribute('inherited-name', v);
		
	}
	get inheritedProperty() {
		
		return this.getAttribute('inherited-property');
		
	}
	set inheritedProperty(v) {
		
		return this.setAttribute('inherited-property', v);
		
	}
	get name() {
		
		return this.getAttribute('name');
		
	}
	set name(v) {
		
		return this.setAttribute('name', v);
		
	}
	get raw() {
		
		return this.hasAttribute('raw');
		
	}
	set raw(v) {
		
		return this.toggleAttribute('raw', !!v);
		
	}
	
}
customElements.define(HTMLAttrVal.tagName, HTMLAttrVal);

class HTMLAttrArray extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-array';
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr) {
		
		return value?.split?.(this.delimiter) ?? [];
		
	}
	
	get delimiter() {
		
		return this.getAttribute('delimiter') ?? ' ';
		
	}
	set delimiter(v) {
		
		return this.setAttribute('delimiter');
		
	}
	
}
customElements.define(HTMLAttrArray.tagName, HTMLAttrArray);

class HTMLAttrBigInt extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-bigint';
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr, defaultValue = this.textContent) {
		
		try {
			
			value = BigInt(value);
			
		} catch (error) {
			
			console.error(error),
			this.raw || (value = this[HTMLAttrBigInt.$specify](defaultValue, undefined, undefined, 0));
			
		};
		
		return value;
		
	}
	
}
customElements.define(HTMLAttrBigInt.tagName, HTMLAttrBigInt);

class HTMLAttrBool extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-bool';
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr) {
		
		return !!value;
		
	}
	
}
customElements.define(HTMLAttrBool.tagName, HTMLAttrBool);

class HTMLAttrFunc extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-func';
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr) {
		
		return new Function(''+value);
		
	}
	
}
customElements.define(HTMLAttrFunc.tagName, HTMLAttrFunc);

class HTMLAttrNum extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-num',
		
		this.$NaN = Symbol('HTMLAttrNum.NaN');
		
	}
	
	static toNumber(value, defaultValue) {
		
		return value === '' || Number.isNaN(value = +value) ? defaultValue : value;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	toNumber(value) {
		
		const	{ $NaN, toNumber } = HTMLAttrNum, { int, max, min, raw, textContent } = this;
		let v;
		
		if ((v = toNumber(value, raw ? $NaN : toNumber(textContent, null))) === null) return v;
		else if (v === $NaN) return value;
		
		typeof max === 'number' && v > max && (v = max),
		typeof min === 'number' && v < min && (v = min);
		
		return int ? parseInt(v) : v;
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr) {
		
		return this.toNumber(value);
		
	}
	
	get int() {
		
		return this.hasAttribute('int');
		
	}
	set int(v) {
		
		return this.toggleAttribute('int', !!v);
		
	}
	get max() {
		
		return HTMLAttrNum.toNumber(this.getAttribute('max') ?? Infinity, Infinity);
		
	}
	set max(v) {
		
		return this.setAttribute('max', v);
		
	}
	get min() {
		
		return HTMLAttrNum.toNumber(this.getAttribute('min') ?? -Infinity, -Infinity);
		
	}
	set min(v) {
		
		return this.setAttribute('min', v);
		
	}
	
}
customElements.define(HTMLAttrNum.tagName, HTMLAttrNum);

class HTMLAttrJSON extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-json';
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr, defaultValue = this.textContent) {
		
		try {
			
			value = JSON.parse(value);
			
		} catch (error) {
			
			console.error(error),
			this.raw || (value = this[HTMLAttrVal.$specify](defaultValue, undefined, undefined, 'null'));
			
		};
		
		return value;
		
	}
	
}
customElements.define(HTMLAttrJSON.tagName, HTMLAttrJSON);

class HTMLAttrStr extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-str';
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr) {
		
		return '' + (value ?? '');
		
	}
	
}
customElements.define(HTMLAttrStr.tagName, HTMLAttrStr);

class HTMLAttrSymbol extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-symbol';
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr) {
		
		return Symbol(''+value);
		
	}
	
}
customElements.define(HTMLAttrSymbol.tagName, HTMLAttrSymbol);

class HTMLAttrUndefined extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-undefined';
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr) {
		
		return undefined;
		
	}
	
}
customElements.define(HTMLAttrUndefined.tagName, HTMLAttrUndefined);

class HTMLRootElement extends HTMLMutationEmitter {
	
	static {
		
		this.tagName = 'root-element',
		
		this.$allowSelector = Symbol('HTMLRootElement.allowSelector'),
		this.$blockSelector = Symbol('HTMLRootElement.blockSelector'),
		this.$cdp = Symbol('HTMLRootElement.cdp'),
		this.$iterates = Symbol('HTMLRootElement.iterates'),
		this.$iterator = Symbol('HTMLRootElement.iterator'),
		// 通常は、allowSelector は blockSelector に優先される。
		// precedesBlock を true に設定すると、この動作を反転させ、
		// 先に blockSelector の一致を確認し、それが ture の場合、その要素を処理の対象外にする。
		this.$precedesBlock = Symbol('HTMLRootElement.precedesBlock'),
		this.$raw = Symbol('HTMLRootElement.raw'),
		
		this[this.$cdp] = /re/,
		this[this.$iterator] = '*';
		//this[this.$mutationEmitterDefaultInit] = { subtree: true };
		
		//this[AttributeLocker.$attribute] = {
		//	allowSelector: AttributeLocker.LOCKED,
		//	blockSelector: AttributeLocker.LOCKED
		//};;
		
	}
	
	static getPrefixedDSV(element, prefix, name) {
		
		if (prefix) {
			
			if (prefix instanceof RegExp) {
				
				const { attributes } = element, l = attributes.length;
				
				i = -1;
				while	(
							++i < l &&
							!(k = (attr = attributes[i]).name).indexOf('data-') &&
							k.slice(5).replace(prefix, '') !== name
						);
				
				return i === l ? undefined : attr.value;
				
			} else return element.attributes['data-' + prefix + (name ? '-' + name : '')];
			
		} return undefined;
		
	}
	static getPrefixedDS(element, prefix, asDash) {
		
		// 以下の RegExp が示すように、このメソッドは、カスタムデータ属性名の data-prefix-0a data-prefix0-a の違いを区別できない。
		// このカスタム要素を使う場合、対応するカスタムデータ属性の名前内の二番目の単語の頭文字に数字とアンダーバーを使うのは避ける必要がある。
		
		const { camelize } = HTMLRootElement, { attributes } = element, l = attributes.length, value = {};
		let i,k, attr;
		
		i = -1;
		
		if (prefix instanceof RegExp) {
			
			while (++i < l)	(k = (attr = attributes[i]).name).indexOf('data-') || prefix.test(k.slice(5)) &&
										(value[asDash ? k : camelize(k, 1)] = attr.value);
			
		} else {
			
			let i0,l0, k0, p,p0, splitted;
			
			p = 'data-' + prefix, l0 = (p0 = prefix ? p + '-' : p).length;
			while (++i < l)	(((k = (attr = attributes[i]).name) === p && prefix) || (!k.indexOf(p0) && k[l0])) &&
										(value[asDash ? k : camelize(k, 1)] = attr.value);
			
		}
		
		return value;
		
	}
	static matches(element, selector, that) {
		
		return element instanceof Element &&
			(typeof selector === 'function' ? !!selector(element).call(that) : element.matches(selector));
		
	}
	static specify(data, specification, asCamel) {
		
		// specification に指定された Object 内の各記述子のプロパティ defatultValue に
		// HTMLRootElement.$raw が示すシンボルを値として指定すると、記述子に対応する属性値がない場合や、その値の型変換に失敗した際の既定値をその属性値にする。
		// 例えば要素が <div data-a="1" /> <div data-a="a" />、記述子が { a: { type: 'number', defaultValue} } だった場合、
		// 戻り値は [ { a: 1 }, { a: 'a' } ] になる。
		
		if (specification && typeof specification === 'object') {
			
			const { $raw, camelize, specifyValue } = HTMLRootElement;
			let k,k0,v, spec, asBool;
			
			for (k in specification)
				spec = specification[k],
				k0 = asCamel ? camelize(k, 0) : k,
				(v = data[k]) === $raw ?
					(data[k0] = v) :
					(
						k in data && (data[k0] = specifyValue(v, spec)),
						// asBool が truly である時、data にプロパティが存在していれば、それが falsy であってもその値は変換される。
						// data にプロパティが存在していなければ、仮に specification に defaultValue が設定されていても、
						// それは用いられず存在しないままとして扱われる。この動作は asBool が falsy の時とは異なり、通常は defaultValue の指定は尊重される。
						// この違いによって、該当のプロパティが論理属性由来のものだったとして、
						// その値が任意の型の値として使えるのと同時に、論理属性の指定の有無を data にプロパティが存在しているかどうかで判定できる。
						// つまり論理属性の指定が data 上で再現されている。
						k0 in data || spec?.asBool || (data[k0] = typeof spec === 'object' ? spec.defaultValue : spec),
						data[k0] === $raw && (data[k0] = v)
					),
				asCamel && k !== k0 && delete data[k];
				
		}
		
		return data;
		
	}
	static specifyValue(value, spec) {
		
		return	spec && typeof spec === 'object' && typeof v === 'string' ?
						HTMLRootElement.str2val(v, spec.type, spec.defaultValue) : value;
		
	}
	static specifyValueByName(value, name, specification) {
		
		let k;
		
		for (k in specification) if (k === name) return RootElement.specifyValueByName(value, specification[k]);
		
	}
	
	constructor() {
		
		super();
		
	}
	
	*[Symbol.iterator]() {
		
		const	{ constructor } = this,
				{ $iterates, $iterator } = HTMLRootElement,
				iterator = constructor[$iterator],
				iterated = typeof iterator === 'function' ? iterator.call(this) : this.querySelectorAll(iterator),
				l = iterated?.length;
		
		if (l) {
			
			const { precedesBlock } = this;
			let i, element;
			
			i = -1;
			while (++i < l) (this[$iterates]?.(element = iterated[i], iterated) ?? (element = iterated[i])) &&
				(
					precedesBlock ?
						(!this.matchesByBlockSelector(element) && this.matchesByAllowSelector(element)) :
						(this.matchesByAllowSelector(element) || !this.matchesByBlockSelector(element))
				) && (yield element);
			
		}
		
	}
	
	getCustomDSV(element, name) {
		
		const { $cdp, getPrefixedDSV } = HTMLRootElement;
		
		return getPrefixedDSV(element, this.constructor[$cdp], name);
		
	}
	getCustomDS(element, asDash, inherits) {
		
		const { $cdp, getPrefixedDS } = HTMLRootElement;
		
		return getPrefixedDS(element, this.constructor[$cdp], asDash);
		
	}
	specifyDS(element, specification, asDash) {
		
		return	HTMLRootElement.specify(
						this.inheritSpecifiedProperty(this.getCustomDS(element, asDash), specification),
						specification
					);
		
	}
	getSpecifiedAttr(element, specification, asCamel) {
		
		const attr = {};
		
		if (specification && typeof specification === 'object') {
			
			const { attributes } = element;
			let k;
			
			for (k in specification) attributes.hasOwnProperty(k) && (attr[k] = attributes[k].value);
			
			return HTMLRootElement.specify(this.inheritSpecifiedProperty(attr), specification, true);
			
		}
		
		return attr;
		
	}
	getSpecifiedAttrValue(name, specificaton) {
		
		return this.specifyValue(this.getAttribute(name), specificaton[name]);
		
	}
	//getSpecifiedAttrValue(element, name, specification) {
	//	
	//	const { attributes } = element;
	//	
	//	if (attributes.hasOwnProperty(name) && specification && typeof specification === 'object') {
	//		
	//		(attr[k] = attributes[name].value);
	//		
	//		return HTMLRootElement.specify(this.inheritSpecifiedProperty(attr), specification, true);
	//		
	//	}
	//	
	//}
	inheritSpecifiedProperty(source, specification) {
		
		if (source && typeof source === 'object') {
			
			const { camelize } = HTMLRootElement;
			let k;
			
			for (k in specification) source[k] ??
				((inherit = specification[k].inherit) && (inherit === true ? this[camelize(k)] : this[inherit]));
			
			return source;
			
		}
		
		return null;
		
	}
	
	matchesAll(element, selector) {
		
		return this.contains(element) && (selector && HTMLRootElement.matches(element, selector, this));
		
	}
	
	matchesByAllowSelector(element) {
		
		const { $allowSelector } = HTMLRootElement;
		
		return this.matchesAll(element, this.allowSelector);
		
	}
	
	matchesByBlockSelector(element) {
		
		return this.matchesAll(element, this.blockSelector);
		
	}
	
	getLockedAttribute(name, defaultValue, has) {
		
		return	(
						this.constructor[HTMLRootElement.$unlockedAttributes]?.indexOf?.(name) === -1 ||
							(this.hasAttribute(name) ? has || this.getAttribute(name) : has ? !!defaultValue : defaultValue)
					);
		
	}
	
	get allowSelector() {
		
		return this.getLockedAttribute('allow-selector', this.constructor[HTMLRootElement.$allowSelector]);
		
	}
	set allowSelector(v) {
		
		return this.setAttribute('allow-selector', v);
		
	}
	get attrSpec() {
		
		return document.getElementById(this.getAttribute('attr-spec'));
		
	}
	set attrSpec(v) {
		
		this.setAttribute('attr-spec', v);
		
	}
	get blockSelector() {
		
		return this.getLockedAttribute('block-selector', this.constructor[HTMLRootElement.$blockSelector]);
		
	}
	set blockSelector(v) {
		
		return this.setAttribute('block-selector', v);
		
	}
	get precedesBlock() {
		
		return this.getLockedAttribute('precedes-block', this.constructor[HTMLRootElement.$precedesBlock], true);
		
	}
	set precedesBlock(v) {
		
		return this.toggleAttribute('precedes-block', !!v);
		
	}
	
}
customElements.define(HTMLRootElement.tagName, HTMLRootElement);