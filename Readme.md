Documention Hooks.js

## FormatDate()
  Example: </br></br>
  Input: </br>
  FormatDate(new Date(),'Y-m-d H:i:s') </br></br>
  FormatDate('first') </br></br>
  FormatDate('last') </br></br>
  FormatDate('2020-11-14', {first: true}) </br></br>
  FormatDate('2020-11-14', 'Y/m/d',{first: true}) </br></br>
  Output:
  > 2020-10-02 19:29:40
  > 2020-10-01
  > 2020-10-31
  > 2020-11-01
  > 2020/11/01

  Supported format</br>
  - Y-m-d
  - d-m-Y
  - Y/m/d
  - d/m/Y
  - d-M-Y
  - Y-M-d
  - d/M/Y
  - Y/M/d
  - Y M d
  - d M Y
  - Y-m-d H:i:s
  - Y-m-d H:i
  - d-m-Y H:i:s
  - d-m-Y H:i
  - Y/m/d H:i:s
  - d-M-Y H:i:s
  - d-M-Y H:i
  - Y-M-d H:i
  - Y-M-d H:i:s
  - Y/M/d H:i:s
  - Y/M/d H:i
  - Y/m/d H:i
  - Y
  - m
  - d
  - H:i:s
  - H:i
  - H
  - i
  - s

Parameter </br>
- date type String
- formatdate type String

## FormatCurrency()
  Example : </br></br>
  Input: </br>
  FormatCurrency(100000)</br>
  FormatCurrency(100000, {currencyType: 'USD'})</br>
  FormatCurrency(100000, {currencyType: 'USD', showCurrencyType: true})</br>
  FormatCurrency(100000, {currencyType: 'USD', showSymbolCurrency: true})</br>
  FormatCurrency(100000, {currencyType: 'USD', showDec: true})</br></br>
  FormatCurrency(100000, {currencyType: 'USD', symbolSparator: '.'})</br></br>

  Output:
  > 10.000 <br>
  > 100,000 <br>
  > USD 100,000 <br>
  > $ 100,000 <br>
  > 100,000.00 <br>
  > 10.000 <br>

Supported symbol currency type
- USD
- IDR
- JPY
- SGD
- CNY
- MYR
- EUR

Parameter </br>
- numberCurrency type Number
- obj type Object
   -currencyType type String <optional>
   - showCurrencyType type Boolean <optional>
   - showSymbolCurrency type Boolean <optional>
   - showDec  type Boolean <optional>
   - symbolSparator <optional>

## isArray()
Example: </br></br>
Input <br>
isArray(['Ani', 'John', 'Doe']) <br>

Output<br>
> true

## isObject()
Example: </br></br>
Input <br>
isObject({name:'Ali', age:20}) <br>

Output<br>
> true

## isString()
Example: </br></br>
Input <br>
isString('Hello) <br>

Output<br>
> true

## isBoolean()
Example: </br></br>
Input <br>
isBoolean(true) <br>

Output<br>
> true

## filterData()
Example: </br></br>
Input <br>
let data = [</br>
  {name:'Ana', age:18},</br>
  {name:'Leon', age:20},</br>
  {name:'John', age:15},</br>
  {name:'Mark', age:24},</br>
]</br>
filterData(data, 'name', 'John');

Output<br>
> [{name:'John', age:15}]

Parameter
- data type Array
- fieldName type String
- keyword type String

## hashFNV()
Example: </br></br>
Input <br>
hashFNV('Hello World')

Output<br>
> 3d58dee72d4ec27

Supported bit hash
- 64 bit
- 128 bit
- 256 bit

Parameter
- str type String
- bit type Number

## setSession()
Example: </br></br>
Input <br>
setSession('item', dataArrayObject)<br>

Output<br>
> 

Parameter
- keyname type String/Array
- data type Object/Array

## getSession()
Example: </br></br>
Input <br>
getSession('cart')

Output<br>
> [{product:'Aqua', qty: 1}, {product:'Pizza', qty: 1}]

## removeSession()
Example: </br></br>
Input <br>
removeSession()

Output<br>
> true

## clearAllSession()
Example: </br></br>
Input <br>

Output<br>
> true