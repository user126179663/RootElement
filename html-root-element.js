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
	getLockedAttribute(name, defaultValue, specification, ...args) {
		
		return	this.isReadableAttribute(name) ?
						//document.createElement('attr-' + type)?.specify?.(this.attributes[name])
						specification.specify(this.getAttribute(name, ...args)) : defaultValue;
		
	}
	//getLockedAttribute(name, defaultValue, type = 'string') {
	//	
	//	return	this.isReadableAttribute(name) ?
	//					//document.createElement('attr-' + type)?.specify?.(this.attributes[name])
	//					HTMLAttributesLocker.attr2val(this.getAttribute(name), defaultValue, type) : defaultValue;
	//	
	//}
	setLockedAttribute(name, value, specificationOrAsBooleanAttribute, ...args) {
		
		const writes = this.isWritableAttribute(name);
		
		writes &&
			(
				typeof specificationOrAsBooleanAttribute instanceof HTMLAttrVal ?
					specificationOrAsBooleanAttribute.specify(value, ...args) : this.toggleAttribute(name, !!value)
			);
		
		return writes;
		
	}
	//setLockedAttribute(name, value, typeOrAsBooleanAttribute) {
	//	
	//	const writes = this.isWritableAttribute(name);
	//	
	//	writes &&
	//		(
	//			typeof typeOrAsBooleanAttribute === 'string' ?
	//				this.setAttribute(name, HTMLAttributesLocker.val2str(value, typeOrAsBooleanAttribute)) :
	//				this.toggleAttribute(name, !!value)
	//		);
	//	
	//	return writes;
	//	
	//}
	
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
	setObserverInitValue(key, value, reflects, specificationOrAsBooleanAttribute, ...args) {
		
		const { $init, getAttrNameByInitKey } = HTMLMutationEmitter, attrName = getAttrNameByInitKey(key);
		
		attrName &&
			this.setLockedAttribute
				(attrName, value = typeof value === 'string' || value, specificationOrAsBooleanAttribute, ...args) &&
			reflects &&
			(this[$init][key] = Array.isArray(value) ? [ ...value ] : !!value, this.observeMutation());
		
	}
	
	get observedAttributeFilter() {
		
		return this.getObserverInitValue('attributeFilter', 'array');
		
	}
	set observedAttributeFilter(v) {
		
		this.setObserverInitValue('attributeFilter', v, true, HTMLAttrArray);
		
	}
	get observesAttributes() {
		
		return this.getObserverInitValue('attributes', 'ba');
		
	}
	set observesAttributes(v) {
		
		this.setObserverInitValue('attributes', v, true, true);
		
	}
	get observesCharacterData() {
		
		return this.getObserverInitValue('characterData', 'ba');
		
	}
	set observesCharacterData(v) {
		
		this.setObserverInitValue('characterData', v, true, true);
		
	}
	get observesChildList() {
		
		return this.getObserverInitValue('childList', 'ba');
		
	}
	set observesChildList(v) {
		
		this.setObserverInitValue('childList', v, true, true);
		
	}
	get observesSubtree() {
		
		return this.getObserverInitValue('subtree', 'ba');
		
	}
	set observesSubtree(v) {
		
		this.setObserverInitValue('subtree', v, true, true);
		
	}
	get recordsAttributeOldValue() {
		
		return this.getObserverInitValue('attributeOldValue', 'ba');
		
	}
	set recordsAttributeOldValue(v) {
		
		this.setObserverInitValue('attributeOldValue', v, true, true);
		
	}
	get recordsCharacterDataOldValue() {
		
		return this.getObserverInitValue('characterDataOldValue', 'ba');
		
	}
	set recordsCharacterDataOldValue(v) {
		
		this.setObserverInitValue('characterDataOldValue', v, true, true);
		
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
		let k,k0,v, spec, attr;
		
		for (spec of this) {
			
			(
				v =	(attr = attributes[k = spec.name]) instanceof Attr ?
							spec.specify(attr) :
							(k0 = spec.inheritProperty) ?	k0 in host ? host[k0] : spec.specify() :
																	spec.specify(hostAttributes?.[spec.inherit])
			) === $false || (specified[asCamel ? camelize(k) : k] = v);
			
		}
		
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
		this.$specify = Symbol('HTMLAttrVal.specify'),
		this.$specifyValue = Symbol('HTMLAttrVal.specifyValue');
		
	}
	
	static specify(value, name, attr, defaultValue, raw, asBooleanAttribute, scope, ...args) {
		
		const { $false, $specify, $specifyValue } = HTMLAttrVal;
		
		return	asBooleanAttribute && (value === null || value === undefined) && $false ||
						attr instanceof Attr ?
							(scope ?? this)?.[$specify](value, name || attr.name, attr, defaultValue, raw, ...args) :
							typeof (scope = scope ?? this)?.[$specifyValue] === 'function' ?
								scope[$specifyValue](value, defaultValue, raw, ...args) :
								scope?.[$specify]?.(value, undefined, undefined, defaultValue, raw, ...args);
		
	}
	
	static specifyValue(value, defaultValue, raw, asBooleanAttribute, scope, ...args) {
		
		return HTMLAttrVal.specify(value, undefined, undefined, defaultValue, raw, asBooleanAttribute, scope, ...args);
		
	}
	
	static toStr(value, defaultValue, raw, scope, ...args) {
		
		const toStr = (scope ?? this)?.[HTMLAttrVal.$toStr];
		
		return typeof toStr === 'function' ? toStr(value, defaultValue, raw, ...args) : raw ? value : ''+value;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	specify(attr, ...args) {
		
		const { specify } = HTMLAttrVal, { asBool, raw } = this;
		
		if (attr instanceof Attr) {
			
			const { name, value } = attr;
			
			return specify(value, name, attr, undefined, raw, asBool, this, ...args);
			
		} else return specify(attr, undefined, undefined, undefined, raw, asBool, this, ...args);
		
	}
	
	toStr(value, defaultValue, ...args) {
		
		return HTMLAttrVal.toStr(value, defaultValue, this.raw, this, ...args);
		
	}
	
	//specify(attr) {
	//	
	//	const { $specify, $specifyValue } = HTMLAttrVal;
	//	
	//	if (attr instanceof Attr) {
	//		
	//		const { name, value } = attr;
	//		
	//		return this[$specify]?.(value, name, attr);
	//		
	//	} else return	this.asBool ? HTMLAttrVal.$false :
	//							this[typeof this[$specifyValue] === 'function' ? $specifyValue : $specify]?.(attr);
	//	
	//}
	
	get asBool() {
		
		return this.hasAttribute('bool');
		
	}
	set asBool(v) {
		
		return this.toggleAttribute('bool', !!v);
		
	}
	get inherit() {
		
		return this.getAttribute('inherit');
		
	}
	set inherit(v) {
		
		return this.setAttribute('inherit', v);
		
	}
	get inheritProperty() {
		
		return this.getAttribute('inherit-property');
		
	}
	set inheritProperty(v) {
		
		return this.setAttribute('inherit-property', v);
		
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
		
		this.tagName = 'attr-array',
		
		this.delimiter = ' ';
		
	}
	
	static [HTMLAttrVal.$specify](str, defaultValue, raw, delimiter = HTMLAttrArray.delimiter) {
		
		return (str = ''+str)?.split?.(delimiter) ?? [];
		
	}
	
	static [HTMLAttrVal.$toStr](value, defaultValue, raw, delimiter = HTMLAttrArray.delimiter) {
		
		return (value = (''+value))?.join?.(delimiter) ?? value;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](str, name, attr, defaultValue, raw, delimiter = this.delimiter) {
		
		return HTMLAttrArray[HTMLAttrVal.$specify](str, defaultValue, raw, delimiter);
		
	}
	
	[HTMLAttrVal.$toStr](value, defaultValue, raw, delimiter = this.delimiter) {
		
		return HTMLAttrArray[HTMLAttrVal.$toStr](value, defaultValue, raw, delimiter);
		
	}
	
	get delimiter() {
		
		return this.getAttribute('delimiter') ?? HTMLAttrArray.delimiter;
		
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
	
	static [HTMLAttrVal.$specify](value, defaultValue, raw) {
		
		try {
			
			value = BigInt(value);
			
		} catch (error) {
			
			console.info(error),
			raw || (value = HTMLAttrBigInt[HTMLAttrVal.$specify](defaultValue, 0, raw));
			
		};
		
		return value;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr, defaultValue = this.textContent, raw = this.raw) {
		
		return HTMLAttrBigInt[HTMLAttrVal.$specify](value, defaultValue, raw);
		
	}
	
	//[HTMLAttrVal.$specify](value, name, attr, defaultValue = this.textContent) {
	//	
	//	try {
	//		
	//		value = BigInt(value);
	//		
	//	} catch (error) {
	//		
	//		console.info(error),
	//		this.raw || (value = this[HTMLAttrBigInt.$specify](defaultValue, undefined, undefined, 0));
	//		
	//	};
	//	
	//	return value;
	//	
	//}
	
}
customElements.define(HTMLAttrBigInt.tagName, HTMLAttrBigInt);

class HTMLAttrBool extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-bool';
		
	}
	
	static [HTMLAttrVal.$specify](value) {
		
		return !!value;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value) {
		
		return HTMLAttrBool[HTMLAttrVal.$specify](value);
		
	}
	
}
customElements.define(HTMLAttrBool.tagName, HTMLAttrBool);

class HTMLAttrFunc extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-func';
		
	}
	
	static [HTMLAttrVal.$specify](value, defaultValue, raw, ...args) {
		
		return new Function(...args, ''+value);
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr, defaultValue, raw, ...args) {
		
		return HTMLAttrFunc[HTMLAttrVal.$specify](value, defaultValue, raw, ...args);
		
	}
	
}
customElements.define(HTMLAttrFunc.tagName, HTMLAttrFunc);

class HTMLAttrJSON extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-json',
		
		this.defaultValue = 'null',
		this.strDefaultValue = null;
		
	}
	
	static [HTMLAttrVal.$specify](value, defaultValue = HTMLAttrJSON.defaultValue, raw) {
		
		try {
			
			value = JSON.parse(value);
			
		} catch (error) {
			
			console.info(value, error),
			raw || (value = HTMLAttrJSON[HTMLAttrVal.$specify](defaultValue, HTMLAttrJSON.defaultValue, raw));
			
		}
		
		return value;
		
	}
	
	static [HTMLAttrVal.$toStr](value, defaultValue = HTMLAttrJSON.strDefaultValue, raw) {
		
		
		try {
			
			value = JSON.stringify(value);
			
		} catch (error) {
			
			console.info(value, error),
			raw || (value = HTMLAttrJSON[HTMLAttrVal.$toStr](defaultValue, HTMLAttrJSON.strDefaultValue, raw));
			
		};
		
		return value;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value, name, attr, defaultValue = this.textContent, raw = this.raw) {
		
		return HTMLAttrJSON[HTMLAttrVal.$specify](value, defaultValue, raw);
		
	}
	
	[HTMLAttrVal.$toStr](value, defaultValue = this.textContent, raw = this.raw) {
		
		return HTMLAttrJSON[HTMLAttrVal.$toStr](value, defaultValue, raw);
		
	}
	
	//[HTMLAttrVal.$specify](value, name, attr, defaultValue = this.textContent) {
	//	
	//	try {
	//		
	//		value = JSON.parse(value);
	//		
	//	} catch (error) {
	//		
	//		console.info(error),
	//		this.raw || (value = this[HTMLAttrVal.$specify](defaultValue, undefined, undefined, 'null'));
	//		
	//	};
	//	
	//	return value;
	//	
	//}
	
}
customElements.define(HTMLAttrJSON.tagName, HTMLAttrJSON);

class HTMLAttrNum extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-num',
		
		this.$failed = Symbol('HTMLAttrNum.failed'),
		this.$raw = Symbol('HTMLAttrNum.raw'),
		
		this.defaultValue = null,
		this.isInt = false,
		this.max = Infinity,
		this.min = -Infinity;
		
	}
	
	static [HTMLAttrVal.$specify](
		value,
		defaultValue = HTMLAttrNum.defaultValue,
		raw,
		min = HTMLAttrNum.min,
		max = HTMLAttrNum.max,
		isInt = HTMLAttrNum.isInt
	) {
		
		const	{ $failed, $raw, toNumber } = HTMLAttrNum;
		let v;
		
		if ((v = toNumber(value, raw ? $raw : toNumber(defaultValue, $failed))) === $failed) {
			
			return HTMLAttrNum.defaultValue;
		
		} else if (v === $raw) {
			
			return value;
			
		}
		
		typeof max === 'number' && v > max && (v = max),
		typeof min === 'number' && v < min && (v = min);
		
		return isInt ? parseInt(v) : v;
		
	}
	
	static toNumber(value, defaultValue = HTMLAttrNum.defaultValue) {
		
		return value === '' || Number.isNaN(value = +value) ? defaultValue : value;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](
		value,
		name,
		attr,
		defaultValue = this.textContent,
		raw = this.raw,
		min = this.min,
		max = this.max,
		int = this.int
	) {
		
		return HTMLAttrNum[HTMLAttrVal.$specify](value, defaultValue, raw, min, max, int);
		
	}
	
	//toNumber(value) {
	//	
	//	const	{ $NaN, toNumber } = HTMLAttrNum, { int, max, min, raw, textContent } = this;
	//	let v;
	//	
	//	if ((v = toNumber(value, raw ? $NaN : toNumber(textContent, null))) === null) return v;
	//	else if (v === $NaN) return value;
	//	
	//	typeof max === 'number' && v > max && (v = max),
	//	typeof min === 'number' && v < min && (v = min);
	//	
	//	return int ? parseInt(v) : v;
	//	
	//}
	//
	//[HTMLAttrVal.$specify](value, name, attr) {
	//	
	//	return this.toNumber(value);
	//	
	//}
	
	get int() {
		
		return this.hasAttribute('int');
		
	}
	set int(v) {
		
		return this.toggleAttribute('int', !!v);
		
	}
	get max() {
		
		return HTMLAttrNum.toNumber(this.getAttribute('max') ?? HTMLAttrNum.max, HTMLAttrNum.max);
		
	}
	set max(v) {
		
		return this.setAttribute('max', v);
		
	}
	get min() {
		
		return HTMLAttrNum.toNumber(this.getAttribute('min') ?? HTMLAttrNum.min, HTMLAttrNum.min);
		
	}
	set min(v) {
		
		return this.setAttribute('min', v);
		
	}
	
}
customElements.define(HTMLAttrNum.tagName, HTMLAttrNum);

class HTMLAttrStr extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-str';
		
	}
	
	static [HTMLAttrVal.$specify](value) {
		
		return '' + (value ?? '');
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value) {
		
		return HTMLAttrStr[HTMLAttrVal.$specify](value);
		
	}
	
	//[HTMLAttrVal.$specify](value, name, attr) {
	//	
	//	return '' + (value ?? '');
	//	
	//}
	
}
customElements.define(HTMLAttrStr.tagName, HTMLAttrStr);

class HTMLAttrSymbol extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-symbol',
		
		this.strDefaultValue = '';
		
	}
	
	static [HTMLAttrVal.$specify](value) {
		
		return Symbol(''+value);
		
	}
	
	static [HTMLAttrVal.$toStr](value, defaultValue = HTMLAttrSymbol.strDefaultValue, raw) {
		
		return typeof value === 'symbol' ? value.description : raw ? ''+value : defaultValue;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify](value) {
		
		return HTMLAttrSymbol[HTMLAttrVal.$specify](value);
		
	}
	
	[HTMLAttrVal.$toStr](value, defaultValue = HTMLAttrSymbol.strDefaultValue, raw = this.raw) {
		
		return HTMLAttrSymbol[HTMLAttrVal.$toStr](value, defaultValue, raw);
		
	}
	
	//[HTMLAttrVal.$specify](value, name, attr) {
	//	
	//	return Symbol(''+value);
	//	
	//}
	
}
customElements.define(HTMLAttrSymbol.tagName, HTMLAttrSymbol);

class HTMLAttrUndefined extends HTMLAttrVal {
	
	static {
		
		this.tagName = 'attr-undefined';
		
	}
	
	static [HTMLAttrVal.$specify]() {
		
		return undefined;
		
	}
	
	constructor() {
		
		super();
		
	}
	
	[HTMLAttrVal.$specify]() {
		
		return HTMLAttrUndefined[HTMLAttrVal.$specify]();
		
	}
	
	//[HTMLAttrVal.$specify](value, name, attr) {
	//	
	//	return undefined;
	//	
	//}
	
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
	
	static matches(element, selector, that) {
		
		return element instanceof Element &&
			(typeof selector === 'function' ? !!selector(element).call(that) : element.matches(selector));
		
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
	
	specify(element) {
		
		return element instanceof Element ? this.spec.specify(element) : null;
		
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
	get spec() {
		
		return document.getElementById(this.getAttribute('spec'));
		
	}
	set spec(v) {
		
		this.setAttribute('spec', v);
		
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