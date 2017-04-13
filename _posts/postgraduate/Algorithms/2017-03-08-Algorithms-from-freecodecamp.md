---
layout: post
title: "FreeCodeCamp的算法题"
date: 2017-03-07 09:00:00 +0800 
categories: 研究生涯
tag: Algorithms
---
* content
{:toc}


这里收集[`FreeCodeCamp`](https://www.freecodecamp.com)上的所有的`Javascript`算法题目，自己的解答以及运行结果和思考。

<!-- more -->

## 1. Reverse a String

#### Description

Reverse the provided string.

#### Way to solve it

Turn the string into an array before reversing it.

#### Code

```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log (reverseString("hello"));
```

#### Output

olleh

---

## 2. Check for Palindromes -- 判断回文

#### Description

A **palindrome** is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation(标点), case(大小写), symbols(符号)，and spacing(空格).

#### Way to solve it

删除所有非字母字符，然后将所得字符全都变成大写或小写。删除字符使用**正则表达式**。

#### Code

```javascript
function palindrome(str) {
  // Good luck!
  var pd = str.replace(/[\W_]/g, '').toLowerCase();
  return (pd === pd.split('').reverse().join(''));
}

console.log(palindrome("eye"));
```

#### Output

true

---

## 3. Find the Longest Word in a String

#### Description

Return the length of the longest word in the provided sentence.

#### Way to solve it

None.

#### Code

```javascript
function findLongestWord(str) {
   return str.split(' ').sort(function(curr, next){return curr.length < next.length;})[0].length;
}

console.log (findLongestWord("The quick brown fox jumped over the lazy dog"));
```

#### Output

6

---

## 4. Confirm the Ending

#### Description

Check if a string (first argument, `str`) ends with the given target string (second argument, `target`).

#### Way to solve it

None.

#### Code

```javascript
function confirmEnding(str, target) {
  var pos = str.indexOf(target);
  if (pos >= 0){
    return (pos + target.length) === str.length;
  }
  return false;
}

console.log (confirmEnding("Bastian", "n"));
```

#### Output

true

---

## 5. Falsy Bouncer -- 假值删除

#### Description

Remove all falsy values from an array.

Falsy values in JavaScript are `false`, `null`, `0`, `""`, `undefined`, and `NaN`.

#### Way to solve it

None.

#### Code

```javascript
function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  return arr.filter(Boolean);
}

console.log (bouncer([7, "ate", "", false, 9]));
```

#### Output

[ 7, 'ate', 9 ]

---

## 6. Seek and Destroy -- 删除选定的值

#### Description

You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.

#### Way to solve it

None.

#### Code

```javascript
function destroyer(arr) {
  // Remove all the values
  var args = Array.prototype.slice.call(arguments).splice(1);
  return arr.filter(function(element) {
    return args.indexOf(element) === -1;
  });
}

console.log (destroyer([1, 2, 3, 1, 2, 3], 2, 3));
```

#### Output

[ 1, 1 ]

---

## 7. Caesars Cipher -- 凯撒密码

#### Description

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on

#### Way to solve it

使用ASCII码。

#### Code

```javascript
function rot13(str) { 
  return str.toUpperCase().split('').map(function(subStr) {
    return decode(subStr.charCodeAt(0));
  }).join('');

  function decode(arg) {
    // Takes care of characters that are not in [A-Z] such as ! and ? and decodes [A-Z]
    var decoded = 0;
    if (arg >= 65 && arg <= 90) {
      decoded = (arg + 13) % 91;
      return String.fromCharCode(decoded < 65 ? decoded += 65 : decoded);
    }
    return String.fromCharCode(arg);
  }
}

console.log (rot13("SERR PBQR PNZC"));
```

#### Output

FREE CODE CAMP

---

## 8. Sum All Numbers in a Range

#### Description

We'll pass you an array of two numbers. Return the sum of those two numbers and all numbers between them.

The lowest number will not always come first.

#### Way to solve it

`Math`对象的`Min()`和`Max()`方法。

#### Code

```javascript
function sumAll(arr) {
  var maxValue = arr.reduce(function(a, b) {
    return Math.max(a, b);
});
  var minValue = arr.reduce(function(a, b){
    return Math.min(a, b);
  });
  var n = maxValue - minValue + 1;
  return (n * minValue + n * (n-1) / 2);
}

sumAll([1, 4]);

```

#### Output

10

---

## 9. Roman Numeral Converter

#### Description

Convert the given number into a roman numeral.

#### Way to solve it

比较简单的方法，使用一个对照表。

#### Code

```javascript
function convertToRoman(num) {
  var lookup =  {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  var romanStr = "";
  for (var i in lookup){
    while (num >= lookup[i]){
      romanStr+=i;
      num -= lookup[i];
    }
  }
  return romanStr;
}

convertToRoman(36);

```

#### Output

XXXVI

---

## 10. Search and Replace

#### Description

Perform a search and replace on the sentence using the arguments provided and return the new sentence.

First argument is the sentence to perform the search and replace on.Second argument is the word that you will be replacing (before).Third argument is what you will be replacing the second argument with (after).

NOTE: Preserve the case of the original word when you are replacing it. For example if you mean to replace the word "Book" with the word "dog", it should be replaced as "Dog"

#### Way to solve it

问题的关键是如果被替换的单词第一个是大写的时候该怎么办。

#### Code

```javascript
function myReplace(str, before, after) {
  if (before[0] === before[0].toUpperCase()){
    after = after[0].toUpperCase() + after.slice(1, after.length);

  }
  return str.replace(before,after);
}

myReplace("A quick brown fox Jumped over the lazy dog", "Jumped", "leaped");
```

#### Output

A quick brown for Leaped over the lazy dog

---

## 11. Missing letters

#### Description

Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined.

#### Way to solve it

`String.prototype.charCodeAt()` 和 `String.fromCharCode()`

#### Code

```javascript
function fearNotLetter(str) {
    for (var i = 0; i < str.length - 1; ++ i){
    if (str.charCodeAt(i + 1) !== (str.charCodeAt(i) + 1))
      return String.fromCharCode(str.charCodeAt(i) + 1);
}
  return undefined;
}

fearNotLetter("abce");
```

#### Output

d

---


## 12. Convert HTML Entities

#### Description

Convert the characters `&`, `<`, `>`, " (double quote), and `'`(apostrophe), in a string to their corresponding HTML entities.

#### Way to solve it

虽然有提示说使用正则表达式以及`String.replace()`，但还是很容易会想到例9的罗马转换问题，使用一个`lookup table`。问题的关键是，很多情况下，我们是不是应该将字符串转换成数组来解决问题。另外注意的是，我们利用`split('')`将每个字母进行分割，而不是`split(' ')`将单词进行分割，因为还有可能有`"abc"`这样的输入。

#### Code

```javascript
function convertHTML(str) {
  var lookup = {'&':'&amp;','>':'&gt;','<':'&lt;','\"':'&quot;','\'':'&apos;'};
  return str.split('').map(function(entity){
    return lookup[entity] || entity;
  }).join('');
}

convertHTML("Dolce & Gabbana");
```

#### Output

Dolce &amp; Gabbana

---

## 13. Spinal Tap Case

#### Description

Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

#### Way to solve it

这个问题看上去挺简单，使用正则表达式，然后`String.prototype.replace()`，接着用`String.prototype.toLowerCase()`变成大小写。问题在于提供的输入有`thisIsSpinalTap`这种形式，就算是分割成字母数组，也不好判断`-`该怎么添加。我们观察到，一个单词的末尾是小写字母，而开头是大写的。我们是不是可以用正则表达式匹配。其实这里只是因为输入的例子是这样的，但实际上可能并不是这样。所有有很大的局限性。

#### Code

```javascript
function spinalCase(str) {
  var regExp = /[\W_]/gi;
  return str.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase().replace(regExp,'-');
}

spinalCase("AllThe-small Things");
```

#### Output

all-the-small things

---

## 14. Sum All Primes

#### Description

Sum all the prime numbers up to and including the provided number.

A prime number is defined as a number greater than one and having only two divisors, one and itself. For example, 2 is a prime number because it's only divisible by one and two.

The provided number may not be a prime.

#### Way to solve it

素数是什么：除了`1`和其本身，无法被其他数整除。特别的，`1`不是素数，`2`是素数。

这里的重点是如何取得小于或等于`num`的所有素数，对数组元素进行加法运算可以使用迭代遍历，但我觉得最好的方法还是`array.prototype.reduce()`函数，会箭头函数那就更好了。

#### Code

```javascript
function sumPrimes(num) {
  var i,j,arr=[];
  for(i = 1; i<=num; ++i)
    {
      for(j = 2;j<i;++j)
        {
          if(i%j === 0)
          break;
        }
      if(i <= j &&i !== 1)
        arr.push(i);
    }

  return arr.reduce(function(a,b){
                 return a+b;
                 });
//return arr.reduce((a,b)=> a+b,0);
}

sumPrimes(977);
```

#### Output

73156

---

## 15. Smallest Common Multiple

#### Description

Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is evenly divisible by all numbers between 1 and 3.

#### Way to solve it

要求得给出两数范围内所有的数的最小公倍数，我们可以先求出每两个的公倍数，采用循环就好。问题在于如何求得两数的最小公倍数。经过分析，我们知道两数的最小公倍数`[a,b]= |a*b|/(a,b)`，所以问题转化成求两数的最大公约数，如何求最大公约数，有多种算法，这里采用辗转相除法。代码段发布在[`Github gist`](https://gist.github.com/maoxiaoke/5f1d6e0cfe89666888a822c4af9215bb)上。

#### Code

```javascript
function smallestCommons(arr) {
  var minValue = arr[0] <= arr[1] ? arr[0]:arr[1],
      maxValue = arr[1] >= arr[0] ? arr[1]:arr[0],
      mul = minValue;
  for (var i=minValue; i <=maxValue; ++i)
    {
      mul = smalltestCommonsMultiple(mul,i);
    }
  return mul;
}

function smalltestCommonsMultiple(x,y){
  return (x*y)/(greatestCommonsDivisor(x,y));
}
function greatestCommonsDivisor(a,b){
  //递归
  if(b) return greatestCommonsDivisor(b,a%b);
  return a;

  //非递归
  /*  var r = 0;
  if (r)
  do {
    r = a%b; a = b; b=r;
  }while(r !== 0);
  return a;*/
}


smallestCommons([5,1]);
```

#### Output

60

---

## 16. Binary Agents

#### Description

Return an English translated sentence of the passed binary string.

The binary string will be space separated.

#### Way to solve it

这题的难度之一就在于将二进制转化为十进制，才可以使用`String.fromCharCode()`函数，庆幸的是，进制转换在`JavaScript`中非常方便，十进制转其他进制，使用`x.toString(a)`，`x`表示一个十进制数，`a`表示进制。其他进制转十进制，使用`parseInt(x,a)`，`x`表示进制字符串，`a`表示字符串的进制。

#### Code

```javascript
function binaryAgent(str) {
  var arr = str.split(' '),tr='';
  for (var a in arr)
    tr += String.fromCharCode(parseInt(arr[a],2));
  return tr;

}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");
}
```

#### Output

Aren't bonfires fun!?

---

## 17. Everything Be True

#### Description

Check if the predicate (second argument) is truthy on all elements of a collection (first argument).

#### Way to solve it

第一个参数是一个对象数组，第二个参数是一个字符串，表示第一个数组中对象的属性，如果前一个参数中没有该属性，或者该属性的值为`0`、`null`、`''`一类的也判断为`false`。那么第一种情况，对象没有该属性的情况，我们联想到一个[对象的属性探测]({{ '/2017/03/22/Objects' | prepend: site.baseurl }})，可以使用`in`操作符或者`hasOwnProperty()`方法。对于第二种情况，刚开始我以为是假值，但发现并不是。后来一想，这些值进行强制类型转换，不都是`false`吗。

#### Code

```javascript
function truthCheck(collection, pre) {
  // Is everyone being true?
  for (var i in collection)
    {
      if(!(collection[i].hasOwnProperty(pre)) || !collection[i][pre])
      //or if(!(pre in collection[i]) || !collection[i][pre])
        return false;
    }
  return true;
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");

/*
truthCheck([{"user": "Tinky-Winky", "sex": "male", "age": 0}, {"user": "Dipsy", "sex": "male", "age": 3}, {"user": "Laa-Laa", "sex": "female", "age": 5}, {"user": "Po", "sex": "female", "age": 4}], "age")
*/
```

#### Output

true

---

## 18. Arguments Optional

#### Description

Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = addTogether(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined.

#### Way to solve it

对于闭包，以下是一个很好的例子

```javascript
function add(x)
{
  return function(y){
    return x + y;
  }
}
add(2)(3);//5
```

对于传递了多少个参数，我们可以用`arguments`对象来解决。

#### Code

```javascript
function addTogether() {
  if(arguments.length === 2){
    if ((typeof arguments[0] !== 'number') || (typeof arguments[1] !== 'number'))
      return undefined;
    return arguments[0]+arguments[1];
  }
  if(arguments.length === 1){
    if (typeof arguments[0] !== 'number')
      return undefined;
    var a = arguments[0];
    return function sumTwoAnd(b){
      if(typeof b !=='number'){
           return undefined;
           }
      return a + b;
    };
  }
}

addTogether(2)([3]);
```

#### Output

undefined

---

## 19. Symmetric Difference

#### Description

Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.

Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).

#### Way to solve it

这里的问题是，是不知传入多少参数。这个我们可以使用`arguments`参数。因为考虑到是两个两个数组处理，如果我们想使用得是`Array.prototype.reduce()`方法。

其次，我们要判断数组`A`的每项元素是否存在`B`当中，反之也是如此。所以我们可以使用`forEach()`遍历，使用`indexOf()`判断某元素是否是数组中，如果不存在，返回`-1`。

`in`操作符可以替代`indexOf()`的操作吗？

#### Code

```javascript
function sym() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    function symDiff(arrayOne, arrayTwo) {
        var result = [];

        arrayOne.forEach(function(item) {
            if (arrayTwo.indexOf(item) < 0 && result.indexOf(item) < 0) {
                result.push(item);
            }
        });

        arrayTwo.forEach(function(item) {
            if (arrayOne.indexOf(item) < 0 && result.indexOf(item) < 0) {
                result.push(item);
            }
        });

        return result.sort();
    }

    return args.reduce(symDiff);
}

sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
```

#### Output

[1,4,5]

---

编辑备注：

+ 2017-03-07第一次编辑
+ 2017-03-28第二次编辑