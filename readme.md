# \<root-element\>: ルート要素
```html
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<title>HTMLRootElement</title>
		<script src="root-element.js"></script>
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
　カスタム要素 ***[\<root-element\>](#root-element-ルート要素)*** を定義する [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) です。 ***[HTMLMutationEmitter](#HTMLMutationEmitter)*** を継承しています。

## 静的プロパティ
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
　インスタンスの[反復子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)の処理対象とする要素群を示す[セレクター](https://developer.mozilla.org/ja/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)か、それを戻り値として返す[関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions)のいずれかを指定する静的プロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。このシンボルを名前に持つ静的プロパティに関数を指定する場合、その戻り値は [Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array) であり、かつそれが列挙する値は実際にドキュメント上に存在し、このインスタンスが示す ***[\<root-element\>](#root-element-ルート要素)*** の子孫要素であるべきです。

　このシンボルを名前に持つ静的プロパティは、継承先で任意に実装可能です。未実装の場合、 *[HTMLRootElement[HTMLRootElement.$iterator]](#HTMLRootElement[HTMLRootElement.$iterator])* の値が使われます。
### $precedesBlock
### $raw
### tagName

## 静的メソッド
## プロパティ
## イベント
## メソッド

# \<mutation-emitter\>: 子孫ツリー監視要素
　この要素は ***[\<attributes-locker\>](#attributes-locker-属性ロック要素)*** を継承しています。
## 属性

# HTMLMutationEmitter
　カスタム要素 ***[\<mutation-emitter\>](#mutation-emitter-子孫ツリー監視要素)*** を定義する [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) です。 ***[HTMLAttributesLocker](#HTMLAttributesLocker)*** を継承しています。

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
　任意の属性の読み込み、書き込みの可否を制御します。この要素自身に属性はなく、この要素を定義する ***[HTMLAttributesLocker](#HTMLAttributesLocker)*** を継承する [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) 上で、それが定義する要素の属性を制御します。

　継承を前提ないし想定したカスタム要素で、ある継承先では継承元の属性を暴露できても、別の継承先でそれが問題になる場合があります。継承元のカスタム要素は、このカスタム要素を継承することで、継承元の属性を隠蔽したい継承先にその手段を提供できます。

# HTMLAttributesLocker
　カスタム要素 ***[\<attributes-locker\>](#attributes-locker-属性ロック要素)*** を定義する [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) です。[HTMLElement](#HTMLElement) を継承しています。

## 静的プロパティ
### $attribute
　制御する属性を示す [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) を指定したプロパティの名前を示す[シンボル値](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol)です。このオブジェクトは、このオブジェクトの継承先でこのシンボルを名前にした静的プロパティを作ることで機能します。

　プロパティに指定した Object には、制御する属性の名前と制御値をキーと値にしたプロパティを設定します。属性名は[キャメルケース](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%A1%E3%83%AB%E3%82%B1%E3%83%BC%E3%82%B9)ではなく[ケバブケース](https://en.wikipedia.org/wiki/Letter_case#Kebab_case)で指定します。
### LOCKED
　属性の読み書きの不可を意味する固定値です。 *[$attribute](#attribute)* を名前に持つプロパティが示す [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) に、値として使います。
### READABLE
　属性の読み取り可能を意味する固定値です。 *[$attribute](#attribute)* を名前に持つプロパティが示す [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) に、値として使います。
### tagName
　このカスタム要素のタグを示す文字列で、値は ``attributes-locker`` です。
### UNLOCKED
　属性の読み書きが可能であることを意味する固定値です。 *[$attribute](#attribute)* を名前に持つプロパティが示す [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) に、値として使います。

　この値は、 *[AttributesLocker.READABLE](#READABLE)*, *[AttributesLocker.WRITABLE](#WRITABLE)* を同時に指定した値と等価です。
### WRITABLE
　属性の書き込み可能を意味する固定値です。 *[$attribute](#attribute)* を名前に持つプロパティが示す [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) に、値として使います。
## 静的メソッド
### attr2val
　第二引数 *[type](#type)* が文字列 ``ba`` の時、第一引数 *[str](#str)* が [nullish](https://developer.mozilla.org/ja/docs/Glossary/Nullish) であれば ``false``、それ以外の時は ``true`` を戻り値として返します。str に与えられる値が要素の論理属性である場合に対応することを想定しています。 *[type](#type)* が ``ba`` 以外の時は、同じ引数で *[AttributesLocker.str2val](#str2val)* を実行し、その戻り値を返します。
#### 構文
```javasscript
converted = AttributesLocker.attr2val(str, type[, defaultValue]);
```
#### 引数
##### str
　*[AttributesLocker.str2val](#str2val)* の引数 *[type](#type)* と同じです。
##### type
　*[AttributesLocker.str2val](#str2val)* の引数 *[type](#type)* の対応に加え、文字列で ``ba`` を指定できます。
##### defaultValue
　*[str](#str)* を *[type](#type)* に指定された型に変換できなかった場合などに、既定値として返す値を任意で指定します。
#### 戻り値
　*[type](#type)* で指定された型の値が返されます。変換が失敗した場合は *[defaultValue](#defaultValue)* が返ります。 *[type](#type)* に対応しない型を指定した場合は *[str](#str)* がそのまま返ります。
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
　*[str](#str)* を[論理値プリミティブ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures#%E8%AB%96%E7%90%86%E5%9E%8B_boolean)に変換します。変換は[二重の否定論理演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_NOT#%E4%BA%8C%E9%87%8D%E5%90%A6%E5%AE%9A_!!)で行なわれます。そのため文字列の ``'false'`` は ``true`` に変換されます。
###### function
　*[str](#str)* を [Function() コンストラクター](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)の引数にして[関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions)に変換します。
###### json
　*[str](#str)* を [JSON](https://ja.wikipedia.org/wiki/JavaScript_Object_Notation) として、[JSON.parse()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) によって変換します。変換に失敗した場合は *[defaultValue](#defaultValue)* を返します。
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
　*[val](#val)* を [シンボル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures#%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB%E5%9E%8B_symbol) として、その説明文を戻り値にします。
###### undefined
　*[val](#val)* を空の文字列にします。
##### defaultValue
　変換に失敗した時の既定値を指定します。
## プロパティ
## メソッド