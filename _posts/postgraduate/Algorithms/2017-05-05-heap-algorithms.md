---
layout: post
title: "全排列的经典算法-heap's algorithms"
date: 2017-05-05 09:00:00 +0800 
categories: 研究生涯
tags: 
 - Algorithms

---
* content
{:toc}

全排列是一个是一个常见的问题，对于学过简单数学的人都知道，没有重复元素的全排列的个数是`n! = n * (n-1) * ... * 2 * 1`。比如：有三个元素`[a,b,c]`，全排列的结果是`[a,b,c] [b,a,c] [a,c,b] [c,a,b] [b,c,a] [c,b,a]`6种。


<!-- more -->

## 一种全排列的思考方法

一种遵循大脑的全排列方法是：假设有一个空集合，依次插入各元素，得到最终结果。比如，以`[a,b,c]`三个元素为例，有一个空集合`[?,?,?]`，首先插入元素`a`，得到`[a]`，然后插入元素`b`，有两种情况，分别是插入`[a]`之前得到`[b,a]`，插入`[a]`之后得到`[a,b]`。以此类推。示意图如下图：

![a-method-of-full-arrangement]({{ '/styles/images/algorithms/a-method-of-full-arrangement.png' | prepend: site.baseurl }})

> 图片来源： [freecodecamp github](https://camo.githubusercontent.com/b03b14d937879d36804ead55a10d4d73712b9a96/68747470733a2f2f692e696d6775722e636f6d2f7a466d356752782e706e67)

但是这种算法有一种弊端，如果我们需要全排列的元素过多，就需要多次移动元素，这是非常费力的一件事情。

---

## Heap's Algorithm

`Heap's Algorithm` 是B. R. Heap在1963提出的一种全排列的算法。核心思想就是每次保持`n - 2`个元素不动，对剩余的两个元素进行交换。什么意思呢？我们以`[a,b,c,d]`这四个元素的全排列为例，首先，我们将元素`d`作为固定元素拿出来，对`[a,b,c]`进行全排列，而对`[a,b,c]`进行全排列的过程中，我们又将`c`作为固定元素拿出来，对元素`a`、`b`进行交换，这样就得到全排列的两种可能。同理，下一步是我们将`b`作为固定元素拿出来，对`a`、`c`进行交换。依次类推。这张图详细地展示了这一种算法思想，[请参考](https://upload.wikimedia.org/wikipedia/commons/1/19/Heap_algorithm_with_4_elements.svg)。



### 伪代码

```text
procedure generate(n : integer, A : array of any):
    if n = 1 then
          output(A)
    else
        for i := 0; i < n - 1; i += 1 do
            generate(n - 1, A)
            if n is even then
                swap(A[i], A[n-1])
            else
                swap(A[0], A[n-1])
            end if
        end for
        generate(n - 1, A)
    end if
```

> 来源：[wiki百科](https://en.wikipedia.org/wiki/Heap%27s_algorithm)

### 算法过程

1. 保持第`n`个元素不动，对前`n-1`个元素进行全排列。
2. 如果`n`是奇数，交换第一个和最后一个元素；如果`n`是偶数，交换低`i`个和最后一个元素。重复上诉过程。

### 算法的JavaScript实现

```js
/**
 * Created by timi on 2017/5/8.
 */

function heapPermutation(arr,size,n){
    var swap = function (index1,index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }
    if (size === 1){
        console.log(arr);
        return;
    }
    for (let i = 0; i < size; i++){
        heapPermutation(arr, size -1,n);

        swap(size % 2 ? 0 : i, size - 1);
    }
}

var arr = ['a','b','c','d'];

heapPermutation(arr,arr.length,arr.length);
```

程序输出：

```text
[ 'a', 'b', 'c', 'd' ]
[ 'b', 'a', 'c', 'd' ]
[ 'c', 'a', 'b', 'd' ]
[ 'a', 'c', 'b', 'd' ]
[ 'b', 'c', 'a', 'd' ]
[ 'c', 'b', 'a', 'd' ]
[ 'd', 'b', 'c', 'a' ]
[ 'b', 'd', 'c', 'a' ]
[ 'c', 'd', 'b', 'a' ]
[ 'd', 'c', 'b', 'a' ]
[ 'b', 'c', 'd', 'a' ]
[ 'c', 'b', 'd', 'a' ]
[ 'd', 'a', 'c', 'b' ]
[ 'a', 'd', 'c', 'b' ]
[ 'c', 'd', 'a', 'b' ]
[ 'd', 'c', 'a', 'b' ]
[ 'a', 'c', 'd', 'b' ]
[ 'c', 'a', 'd', 'b' ]
[ 'd', 'a', 'b', 'c' ]
[ 'a', 'd', 'b', 'c' ]
[ 'b', 'd', 'a', 'c' ]
[ 'd', 'b', 'a', 'c' ]
[ 'a', 'b', 'd', 'c' ]
[ 'b', 'a', 'd', 'c' ]
```

---

## 还有一种递归思路的算法

这种递归想法是如图所示：

![recursion-tree-for-permutations]({{ '/styles/images/algorithms/anther-method-of-full-arrangement.png' | prepend: site.baseurl }})

> 图片来源：[https://www.youtube.com/watch?v=KBHFyg2AcZ4](https://www.youtube.com/watch?v=KBHFyg2AcZ4) 其中也有对该思想的理解。

这种想法也是通过固定一个元素，进行剩余元素的交换。缺点是，每次交换过后需要再次交换以回到上一层数组。

当然，也给出这种方法的`JavaScript`代码。

```js
function generate(arr, start, end) {
    var swap = function (start,current) {
        var temp = arr[start];
        arr[start] = arr[current];
        arr[current] = temp;
    }
    var current = 0;
    if (start === end-1) {
        console.log(arr);
    } else {
        for (current = start; current < end; current++) {
            swap(start,current)
            generate(arr, start+1, arr.length);
            swap(start,current);
        }
    }
}

var arr = ['a','b','c'];
generate(arr, 0 ,arr.length);
```

为了跟回归树相对应，我们给出三个元素的全排列结果。输出结果如下：

```text
[ 'a', 'b', 'c' ]
[ 'a', 'c', 'b' ]
[ 'b', 'a', 'c' ]
[ 'b', 'c', 'a' ]
[ 'c', 'b', 'a' ]
[ 'c', 'a', 'b' ]
```

> 更多可参考： [freecodecamp forum](https://forum.freecodecamp.com/t/no-repeats-please-heaps-algorithm-and-frustration-with-recursions/15909)