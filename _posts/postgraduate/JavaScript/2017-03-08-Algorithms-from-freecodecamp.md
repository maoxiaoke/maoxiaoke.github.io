---
layout: post
title: "Problems of Algorithms from FreeCodeCamp"
date: 2017-03-07 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
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