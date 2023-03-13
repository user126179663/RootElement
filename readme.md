# \<root-element\>: ルート要素
```html
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<title>HTMLRootElement</title>
		<script src="html-root-element.js"></script>
	</head>
	<body>
		
		<root-element>
			<article>
				<header>
					<h1>Title</h1>
				</header>
				<div data-re="0">
					<p data-re="0-0" data-re-value="a">...</p>
					<p data-re="0-1" data-re-value="b">...</p>
					<p data-re="0-2" data-re-value="c">...</p>
				</div>
			</article>
		</root-element>
		
	</body>
</html>
```
　指定された設定に関連付いた、この要素に包含されたすべての子孫要素およびそれが持つ[カスタムデータ属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/data-*)を操作できるようにします。基本的にはこの要素を継承したカスタム要素を通じてこの要素が持つ機能を使用することを想定しています。

## 属性
### allow-selector
　この要素の操作対象となる子孫要素の内、この属性に指定された[セレクター](https://developer.mozilla.org/ja/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)と一致する要素を処理対象とします。この指定は *[block-selector](#block-selector)* の指定よりも優先されます。ただし論理属性 *[precedes-block](#precedes-block)* が指定されている場合、*block-selector* の指定が優先されます。

　この属性は、要素を定義するオブジェクト ***[HTMLRootElement](#htmlrootelement)*** 上で、この属性の使用が有効に設定されている場合のみ指定が反映されます。
### block-selector
　この要素の操作対象となる子孫要素の内、この属性に指定された[セレクター](https://developer.mozilla.org/ja/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)と一致する要素は処理対象外とします。ある要素がこの属性が示すセレクターと一致しても、同じ要素が *[allow-selector](#allow-selector)* の指定と一致した場合、その要素は処理対象になります。ただし論理属性 *[precedes-block](#precedes-block)* が指定されている場合、この属性の指定が優先されます。

　この属性は、要素を定義するオブジェクト ***[HTMLRootElement](#htmlrootelement)*** 上で、この属性の使用が有効に設定されている場合のみ指定が反映されます。
### precedes-block
　論理属性で、指定されていると、 *[allow-selector](#allow-selector)* の指定よりも *[block-selector](#block-selector)* の指定を優先させます。

# HTMLRootElement
　カスタム要素 ***[\<root-element\>](#root-element-ルート要素)*** を定義するオブジェクトです。 ***[HTMLMutationEmitter](#HTMLMutationEmitter)*** を継承しています。

## 静的プロパティ
### [HTMLRootElement.$iterator]
### $allowSelector
　***[\<root-element\>](#root-element-ルート要素)*** の属性 *[allow-selector](#allow-selector)* の既定値を指定する静的プロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。このシンボルを名前に持つプロパティは、継承先で任意に実装します。
### $blockSelector
　***[\<root-element\>](#root-element-ルート要素)*** の属性 *[block-selector](#block-selector)* の既定値を指定する静的プロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。このシンボルを名前に持つプロパティは、継承先で任意に実装します。
### $cdp
　処理対象の子孫要素が持つ[カスタムデータ属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/data-*)の接頭辞を示す文字列が指定された静的プロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。

　cdp は、Custom Dataset Prefix の略です。
### $iterates
　インスタンスの[反復子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)が呼び出された時に、 *[HTMLRootElement.$iterator](#iterator)* を名前に持つ静的プロパティに指定された[関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions)が返す、[Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array) であることが期待される要素群から、要素をひとつずつ順に引数にして、またそれに続く引数に要素群そのものを与えて実行される、このインスタンスの反復子が実際にそれを反復処理の対象とするか判定する関数を指定する静的プロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。このシンボルを名前に持つ静的プロパティは、継承先で任意に実装します。

　判定関数が偽に相当する値(falsely)を返した場合、インスタンスの反復子は対象の要素を返しません。判定は、 *[allowSelector](#allowselector)*, *[blockSelector](#blockselector)* によるフィルタリングに先行して実行されます。関数が存在しない場合、判定は行なわれませんが、フィルタリングは行なわれます。
### $iterator
　インスタンスの[反復子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)の処理対象とする要素群を示す[セレクター](https://developer.mozilla.org/ja/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)か、任意の要素を列挙した [Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array) を戻り値として返す[関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions)のいずれかを指定する静的プロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。関数を指定する場合、戻り値の Array に列挙される要素は、実際にドキュメント上に存在し、かつこのオブジェクトのインスタンスが示す ***[\<root-element\>](#root-element-ルート要素)*** の子孫要素であるべき点に注意が必要です。

　このシンボルを名前に持つ静的プロパティは、継承先で任意に実装可能です。未実装の場合、 *[HTMLRootElement[HTMLRootElement.$iterator]](#HTMLRootElement[HTMLRootElement.$iterator])* の値が使われます。
### $precedesBlock
### $raw
### tagName

## 静的メソッド
## プロパティ
## イベント
## メソッド

# \<mutation-emitter\>: 子孫ツリー監視要素
　子孫ツリー内の要素の属性やこのカスタム要素への接続、切断などの変化をイベントリスナーに通知します。 ***[HTMLMutationEmitter](#HTMLMutationEmitter)*** により定義されています。
## 属性
***[\<attributes-locker\>](#attributes-locker-属性ロック要素)*** が持つ属性も使えます。
### observedAttributeFilter
### observesAttributes
### observesCharacterData
### observesChildList
### observesSubtree
### recordsAttributeOldValue
### recordsCharacterDataOldValue
## イベント
### mutated

# HTMLMutationEmitter
　カスタム要素 ***[\<mutation-emitter\>](#mutation-emitter-子孫ツリー監視要素)*** を定義するオブジェクトです。 ***[HTMLAttributesLocker](#HTMLAttributesLocker)*** を継承しています。

## 静的プロパティ
### $observer
　インスタンスおよびその子孫要素上の変化を監視する [MutationObserver](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver) のインスタンスが示されるプロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。
### $init
　*[$mutationEmitter](#mutationEmitter)* を名前に持つプロパティが示す [MutationObserver](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver) が [MutationObserver.observe](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver/observe) を実行する時に、第二引数に与えられる [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#parameters) が示されるプロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。
### $defaultInit
　*[$mutationEmitterInit](#mutationEmitterInit)* を名前に持つプロパティの既定値を示す静的プロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。このシンボルを名前に持つ静的プロパティは、継承先で任意に実装可能です。未実装の場合、[HTMLRootElement[HTMLRootElement.$mutationEmitterDefaultInit]](#HTMLRootElement[HTMLRootElement.$mutationEmitterDefaultInit]) の値が使われます。
### tagName
## 静的メソッド
## プロパティ
## イベント
## メソッド

# \<attributes-locker\>: 属性制御要素
　任意の属性の読み込み、書き込みの可否を制御するカスタム要素です。この要素自身の属性はなく、この要素を定義する ***[HTMLAttributesLocker](#HTMLAttributesLocker)*** を継承するオブジェクト上で、それが定義する要素の属性を制御します。ある継承先で継承元の属性を操作できても、別の継承先ではそれが望ましくない場合があります。継承元のカスタム要素は、このカスタム要素を継承することで、継承元の属性を隠蔽する手段を継承先に提供します。
　
## 属性
[HTMLElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement)から属性を継承します。

# HTMLAttributesLocker
　カスタム要素 ***[\<attributes-locker\>](#attributes-locker-属性ロック要素)*** を定義するオブジェクトです。[HTMLElement](#HTMLElement) を継承しています。

## 静的プロパティ
### $attribute
　制御する属性を示すオブジェクトを指定したプロパティの名前を示すシンボルです。プロパティは、このオブジェクトの継承先となるオブジェクトの静的プロパティとして、このシンボルを名前にして設定します。

　値のオブジェクトには、制御する属性の名前と制御値をキーと値にしてプロパティを設定します。その際、属性名は[キャメルケース](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%A1%E3%83%AB%E3%82%B1%E3%83%BC%E3%82%B9)ではなく[ケバブケース](https://en.wikipedia.org/wiki/Letter_case#Kebab_case)で指定します。
### LOCKED
　属性の読み書きの不可を意味する固定値です。属性の制御値として使います。
### READABLE
　属性の読み取り可能を意味する固定値です。属性の制御値として使います。
### tagName
　このカスタム要素のタグを示す文字列で、値は ``attributes-locker`` です。
### UNLOCKED
　属性の読み書きが可能であることを意味する固定値です。属性の制御値として使います。

　値は、 *[AttributesLocker.READABLE](#READABLE)*, *[AttributesLocker.WRITABLE](#WRITABLE)* を同時に指定した値と等価です。
### WRITABLE
　属性の書き込み可能を意味する固定値です。属性の制御値として使います。
## 静的メソッド
### attr2val
　*[AttributesLocker.str2val](#str2val)* のラッパー関数で、同関数の動作に加え、第二引数 *[type](#type)* が文字列 ``ba`` の時、第一引数 *[str](#str)* が [nullish](https://developer.mozilla.org/ja/docs/Glossary/Nullish) であれば ``false``、それ以外は ``true`` を戻り値として返します。これは要素の論理属性を値に変換することを想定した動作で、``ba`` は Boolean Attribute(論理属性) の略です。
#### 構文
```javasscript
val = AttributesLocker.attr2val(str, type[, defaultValue]);
```
#### 引数
##### str
　*[AttributesLocker.str2val](#str2val)* の第一引数 *[str](#str)* と同じです。
##### type
　*[AttributesLocker.str2val](#str2val)* の第二引数 *[type](#type)* の対応に加え、文字列で ``ba`` を指定できます。
###### ba
　*[str](#str)* が [nullish](https://developer.mozilla.org/ja/docs/Glossary/Nullish) であれば ``false``、それ以外（空文字や ``0`` などの nullish ではない [falsy](https://developer.mozilla.org/ja/docs/Glossary/Falsy) の値 を含む）は ``true`` を戻り値として返します。
##### defaultValue
　*[AttributesLocker.str2val](#str2val)* の第三引数 *[defaultValue](#defaultValue)* と同じです。
#### 戻り値
　*[type](#type)* で指定された型の値が返されます。変換できなかった場合は *[defaultValue](#defaultValue)* が返ります。 *[type](#type)* に対応しない型を指定した場合は *[str](#str)* がそのまま返ります。
### camelize
　第一引数 *[str](#str-1)* に指定された文字列をキャメルケースに変換します。
#### 構文
```javasscript
string = AttributesLocker.camelize(str[, index = 0][, delimiter = '-']);
```
#### 引数
##### str
　キャメルケースに変換する文字列です。
##### index
　*[delimiter](#delimiter)* で区切られた *[str](#str)* の、左から何番目の単語からキャメルケースに変換するかを数値で指定します。
##### delimiter
　*[str](#str)* 内で区切り文字として扱う文字を指定します。
#### 戻り値
　引数に基づいて変換された文字列です。
### str2val
　第一引数 *[string](#string)* に指定した任意の文字列を、第二引数 *[type](#type)* に指定した型に基づいて変換し、それを戻り値にします。
#### 構文
```javasscript
converted = AttributesLocker.str2val(str, type[, defaultValue]);
```
#### 引数
##### str
　任意の型に変換する文字列を指定します。
##### type
　*[str](#str)* に指定した文字列の、変換後の値の型を文字列で指定するか、任意に実装された変換関数を指定します。変換関数を指定した場合、 *[str](#str)* を第一引数にして実行した戻り値をこの関数の戻り値にします。未指定や対応しない型を指定した場合、 *[str](#str)* がそのまま戻り値になります。以下は指定できる文字列です。
###### array
　*[str](#str)* を [Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array) に変換します。区切り文字は半角スペースで、区切られた単語を順に Array の要素にします。 *[str](#str)* 内に半角スペースが存在しない場合は、 *[str](#str)* 全体を要素にした、要素数 1 の Array を返します。
###### bigint
　*[str](#str)* を [BigInt](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt) に変換します。変換に失敗した場合は *[defaultValue](#defaultValue)* を返します。
###### boolean
　*[str](#str)* を[論理値プリミティブ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures#%E8%AB%96%E7%90%86%E5%9E%8B_boolean)に変換します。変換は[二重の否定論理演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_NOT#%E4%BA%8C%E9%87%8D%E5%90%A6%E5%AE%9A_!!)で行なわれます。そのため文字列の ``false`` は ``true`` に変換されます。
###### function
　*[str](#str)* を [Function() コンストラクター](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)の引数にして[関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions)に変換します。
###### integer
　*[str](#str)* を整数に変換します。 *[str](#str)* が小数を示す場合、小数点以下は切り捨てられます。[NaN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/NaN) になった場合は *[defaultValue](#defaultValue)* を返します。
###### json
　*[str](#str)* を [JSON](https://ja.wikipedia.org/wiki/JavaScript_Object_Notation) として、[JSON.parse()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) によって変換します。変換に失敗した場合は *[defaultValue](#defaultValue)* を返します。
###### nn
　*[str](#str)* を[自然数](https://ja.wikipedia.org/wiki/%E8%87%AA%E7%84%B6%E6%95%B0)に変換します。この自然数は ``0`` を含みます。 *[str](#str)* が小数を示す場合、小数点以下は切り捨てられます。また負の数は ``0`` になります。[NaN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/NaN) になった場合は *[defaultValue](#defaultValue)* を返します。
###### number
　*[str](#str)* を [Number](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number) に変換します。[NaN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/NaN) になった場合は *[defaultValue](#defaultValue)* を返します。
###### object
　*[json](#json)* と同じです。
###### string
　*[str](#str)* を[文字列プリミティブ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures#%E6%96%87%E5%AD%97%E5%88%97%E5%9E%8B_string)に変換します。
###### symbol
　*[str](#str)* を [シンボル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures#%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB%E5%9E%8B_symbol) に変換します。 *[str](#str)* は [Symbol() コンストラクター](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol#%E5%BC%95%E6%95%B0)の第一引数に与えられます。
##### undefined
　*[str](#str)* をその値を問わず ``undefined`` にします。
##### defaultValue
　変換に失敗した時の既定値を指定します。
#### 戻り値
　変換後の値です。
### val2str
　第一引数 *[val](#val)* に指定した任意の値を、第二引数 *[type](#type)* に指定した型に応じた変換方式で文字列にします。
#### 構文
```javasscript
string = AttributesLocker.val2str(val[, type][, defaultValue]);
```
#### 引数
##### val
　文字列に変換する任意の型の値です。
##### type
　変換前の値の型を文字列で指定するか、任意に実装された変換関数を指定します。変換関数を指定した場合、 *[val](#val)* を第一引数にして実行した戻り値をこの関数の戻り値にします。未指定の場合、 *[val](#val)* を [Array.isArray()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) と [typeof 演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof)で評価した結果を使います。以下は指定できる文字列です。以下の型以外の型を指定した場合は、*[val](#val)* を単純に文字列化します。
###### array
　*[val](#val)* を [Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array) として、要素間を半角スペースを区切り文字にして文字列に変換します。
###### json
　*[val](#val)* を [JSON.stringify()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) で文字列に変換します。
###### object
　*[json](#json)* と同じです。
###### symbol
　*[val](#val)* を[シンボル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures#%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB%E5%9E%8B_symbol)として、その説明文を戻り値にします。
###### undefined
　*[val](#val)* を空の文字列にします。
##### defaultValue
　変換に失敗した時の既定値を指定します。
## プロパティ
## メソッド
### getFlags
　第一引数 *[name](#name)* に指定した文字列に一致する名前の属性の現在の制御値を戻り値にして返します。
#### 構文
```javasscript
number = attributesLocker.getFlags(name);
```
#### 引数
##### name
　制御値を取得したい属性の名前を文字列で指定します。
#### 戻り値
　制御値を示す数値です。
### getLockedAttribute
　第一引数 *[name](#name)* に指定した文字列に一致する名前の属性の値を取得して戻り値にします。属性の制御値が読み取り不可相当である場合は、第二引数 *[defaultValue](#defaultValue)* に指定した値を戻り値にします。
#### 構文
```javasscript
value = attributesLocker.getLockedAttribute(name[, defaultValue][, type = 'string']);
```
#### 引数
##### name
　値を取得したい属性の名前を文字列で指定します。
##### defaultValue
　属性が読み取り不可に設定されている場合に戻り値にする値を指定します。
##### type
　取得した値の型を指定します。型変換に成功した場合、値は指定した型で戻り値になります。
#### 戻り値
　指定した属性の値です。
### setLockedAttribute
　第一引数 *[name](#name)* に指定した文字列に一致する名前の属性に第二引数 *[value](#value)* に指定した値を書き込みます。属性の制御値が書き込み不可相当に設定されている場合は書き込みは行なわれません。
#### 構文
```javasscript
boolean = attributesLocker.setLockedAttribute(name[, value][, typeOrAsBooleanAttribute]);
```
#### 引数
##### name
　値を書き込みたい属性の名前を文字列で指定します。
##### value
　指定した属性に書き込む値を指定します。
##### typeOrAsBooleanAttribute
　*[value](#value)* に指定した値の型を文字列で明示します。 *[value](#value)* は明示された型に対応する方法で属性値として書き込み可能な文字列形式に変換されます。未指定の場合は自動で値の型を判定します。

　型の名前ではなく[論理値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures#%E8%AB%96%E7%90%86%E5%9E%8B_boolean)を設定した場合、書き込み先の属性を論理属性として認識します。``true`` の場合は空の値で指定の属性を要素に追加し、``false`` の場合は指定の属性を要素から削除します。
#### 戻り値
　書き込みの正否を示す[論理値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures#%E8%AB%96%E7%90%86%E5%9E%8B_boolean)です。属性の書き込みを行なえなかった場合は ``false`` を返し、そうでない場合は ``true`` を返します。

### isFlaggedAttribute
　第一引数 *[name](#name)* に指定した文字列に一致する名前の属性の制御値と、第二引数 *[flags](#flags)* に指定した制御値との[ビット論理積](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)を評価し、その結果を戻り値にします。
#### 構文
```javasscript
result = attributesLocker.isFlaggedAttribute(name, flags);
```
#### 引数
##### name
　属性の名前を文字列で指定します。
##### flags
　*[name](#name)* に指定した名前を持つ属性に設定された制御値と[ビット論理積](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)を行なう値を指定します。
#### 戻り値
　[ビット論理積](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)で評価した結果を示す数値です。 *[name](#name)* に指定した属性が存在しないか、制御値を設定されていない場合は ``false`` を返します。

### isLockedAttribute
　第一引数 *[name](#name)* に指定した文字列に一致する名前の属性が読み取り、書き込みいずれも不可相当であるかを確認し、その結果を戻り値にします。
#### 構文
```javasscript
boolean = attributesLocker.isLockedAttribute(name);
```
#### 引数
##### name
　属性の名前を文字列で指定します。
#### 戻り値
　読み取りと書き込みがどちらも不可であれば ``true``、そうでなければ ``false`` を返します。
### isReadableAttribute
　第一引数 *[name](#name)* に指定した文字列に一致する名前の属性が読み取りが可能であるかを確認し、その結果を戻り値にします。
#### 構文
```javasscript
boolean = attributesLocker.isReadableAttribute(name);
```
#### 引数
##### name
　属性の名前を文字列で指定します。
#### 戻り値
　読み取りが可能であれば ``true``、そうでなければ ``false`` を返します。
### isUnlockedAttribute
　第一引数 *[name](#name)* に指定した文字列に一致する名前の属性が読み取りも書き込みも行なえるかを確認し、その結果を戻り値にします。
#### 構文
```javasscript
boolean = attributesLocker.isUnlockedAttribute(name);
```
#### 引数
##### name
　属性の名前を文字列で指定します。
#### 戻り値
　読み取りも書き込みも可能であれば ``true``、そうでなければ ``false`` を返します。
### isWritableAttribute
　第一引数 *[name](#name)* に指定した文字列に一致する名前の属性が書き込みが可能であるかを確認し、その結果を戻り値にします。
#### 構文
```javasscript
boolean = attributesLocker.isWritableAttribute(name);
```
#### 引数
##### name
　属性の名前を文字列で指定します。
#### 戻り値
　書き込みが可能であれば ``true``、そうでなければ ``false`` を返します。