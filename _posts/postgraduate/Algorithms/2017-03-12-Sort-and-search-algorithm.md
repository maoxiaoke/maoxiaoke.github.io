---
layout: post
title: "排序和查找算法"
date: 2017-04-11 09:00:00 +0800 
categories: 研究生涯
tag: Algorithms
---
* content
{:toc}

[Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/Algorithms.html)提供了数据结构和算法的动画演示。

不同的排序算法性质有所不同，衡量算法的效率，通常是用资源，例如`CPU`(时间)占用、内存占用、硬盘占用和网络占用。当讨论大`O`表示法时，一般考虑的是`CPU`占用。

排序算法是重要的，因为排序算法是二分查找的第一个步骤。

`JavaScript`的`Array`类定义了一个`sort`函数(`Array.prototype.sort`)用以排序`JavaScript`数组。`ECMAScript`没有定义用哪个排序算法，所以浏览器厂商可以自己去定义。

<!-- more -->

```javascript
var numbers = [11,10,7,5,2,1];
console.log(numbers.sort()); //[1, 10, 11, 2, 5, 7]
```

这是因为`sort`方法在对数组做排序时，把元素默认为字符串来比较的。但是，你可以传入自己的比较函数。

```javascript
var numbers = [11,10,7,5,2,1];
numbers.sort (function(a, b){
    return a - b;   //按从大到小排序
})
```

我们还是关注排序算法把。

## 冒泡排序 -- Bubble Sort

冒泡排序的动画演示: [Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

冒泡排序在所有的排序算法中是最简单的。因为基础算法包含内外两个循环，所以它的复杂度是 `O(n`<sup>`2`</sup>`)`。

冒泡排序是不断比较两个相邻的项，如果前一个比后一个大，则交换他们。

```javascript
function bubbleSort(arr){
    var length = arr.length;
    for(var i=0;i<length;i++){
        for(var j=0;j<length-1;j++){
            if(arr[j] > arr[j+1]){
                swap(arr,j, j+1);
            }
        }
        console.log(arr);
    }
    return arr;
}

function swap(arr,index1,index2){
    var tem = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tem;
    return arr;
}

//code for testing
var arr = [];
for (var i=5; i >=1; i--){
    arr.push(i);
}
bubbleSort(arr);

/**
*[ 4, 3, 2, 1, 5 ]
*[ 3, 2, 1, 4, 5 ]
*[ 2, 1, 3, 4, 5 ]
*[ 1, 2, 3, 4, 5 ]
*[ 1, 2, 3, 4, 5 ]
*/
```

如果我们从内循环减去外循环中已跑过的轮数，可以避免不必要的比较，提高算法性能。

```javascript
function modifiedBubbleSort(arr) {
    var length = arr.length;
    for(var i=0;i<length;i++){
        for(var j=0;j<length-i-1;j++){
            if(arr[j] > arr[j+1]){
                swap(arr,j,j+1);
            }
        }
        console.log(arr);
    }
}
function swap(arr,index1,index2){
    var tem = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tem;
    return arr;
}
```

---

## 选择排序 -- Selection Sort

选择排序的动画演示: [Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，依次类推。

该排序和冒泡排序一样，包含有嵌套的两个循环，也是一个复杂度为`O(n`<sup>`2`</sup>`)`的算法。

```javascript
function selectionSort(arr) {
    var length = arr.length, indexMin;
    for (var i=0;i<length-1;i++){
        indexMin = i;

        //find the minValue of arr, then swap arr[i] and arr[indexMin]
        for(var j=i;j<length;j++){
            if (arr[indexMin]>arr[j]){
                indexMin = j;
            }
        }

        if (i !== indexMin){
            swap(arr,i,indexMin);
        }
        console.log(arr);
    }
    return arr;
}
function swap(arr,index1,index2){
    var tem = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tem;
    return arr;
}

//code for testing
var arr = [];
for (var i=5; i >=1; i--){
    arr.push(i);
}
selectionSort(arr);

/**
*[ 1, 4, 3, 2, 5 ]
*[ 1, 2, 3, 4, 5 ]
*[ 1, 2, 3, 4, 5 ]
*[ 1, 2, 3, 4, 5 ]
*/
```

---

## 插入排序 -- Insertion Sort

插入排序的动画演示: [Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

插入排序比冒泡和选择排序要好。插入排序每次排一个数组项，以此方式构建最后的排序数组。

- 排序从第二项开始，比较第二项与第一项，第二项则有可能插入到第一项之前或者保持原位不动
- 这样，前两项已经排序，接着和第三项比较，第三项有可能插入到第一项或第二项之前，或者保持原位不动
- 以此类推

```javascript
function insertionSort(arr){
    var length = arr.length, temp,j;
    for(var i =1;i<length;i++){
        j = i;
        temp = arr[i];
        while(j>0 && arr[j-1] > temp){
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = temp;
        //console.log(arr);
    }
    return arr;
}

//code for testing
var arr = [];
for (var i=5; i >=1; i--){
    arr.push(i);
}
insertionSort(arr);

/**
*[ 4, 5, 3, 2, 1 ]
*[ 3, 4, 5, 2, 1 ]
*[ 2, 3, 4, 5, 1 ]
*[ 1, 2, 3, 4, 5 ]
*/
```

排序小型数组时，插入排序比选择排序和冒泡排序性能要好。

---

## 希尔排序 -- Shell Sort

希尔排序的动画演示: [Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

希尔排序是按照设计者`Donald Shell`的名字命名的，该算法是插入排序的改进版本。准确来说，是一种分组的插入排序，能提高排序效率。

算法的思路是：

- 取一个正整数的步长`gap`，没有硬性要求`gap`的值，但我们通常取中间值
- 这样，我们将原始数组切分成`gap`个组，所有距离为`gap`的倍数的数组项看成是一个组，然后，在各个小数组内进行插入排序
- 更改步长`gap`的值，我们记为`gap_2`，则`gap_2 < gap`
- 重复上面的步骤，直到`gap_i`的值为`1`

举例：我们有数组`numbers = [9,8,7,6,5,4,3,2,1]`，`numbers.length`的值是`9`，我们取`gap = Math.floor(9/2)`，为`4`。则分成`[9,5,1]`、`[8,4]`、`[7,3]`、`[6,2]`四个小数组，对这四个小数组进行排序为`[1,5,9]`、`[4,8]`、`[3,7]`、`[2,6]`，则整个数组变成`numbers = [1,4,3,2,5,8,7,6,9]`。更改`gap`的值，我们取`gap = Math.floor(gap/2)`，为`2`,则分成`[1,3,5,7,9]`、`[4,2,8,6]`两个小数组，操作同上。

```javascript
function shellSort(arr){
    function swap(arr,index1,index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        return arr;
    }
    var len = arr.length,
        gap = Math.floor(len / 2);

    while (gap > 0){
        for (var i = gap;i < len;i++){
            for (var j = i; 0 < j; j -= gap){
                if (arr[j - gap] > arr[j])
                    swap(arr,j-gap,j);
                else
                    break;
            }
            console.log(arr);
        }
        gap = Math.floor(gap/2);
    }
    return arr;
}

//code for testing

var arr = [];
for (var i=9; i >=1; i--){
    arr.push(i);
}
shellSort(arr);

/**
*[ 5, 8, 7, 6, 9, 4, 3, 2, 1 ]
*[ 5, 4, 7, 6, 9, 8, 3, 2, 1 ]
*[ 5, 4, 3, 6, 9, 8, 7, 2, 1 ]
*[ 5, 4, 3, 2, 9, 8, 7, 6, 1 ]
*[ 1, 4, 3, 2, 5, 8, 7, 6, 9 ]
*[ 1, 4, 3, 2, 5, 8, 7, 6, 9 ]
*[ 1, 2, 3, 4, 5, 8, 7, 6, 9 ]
*[ 1, 2, 3, 4, 5, 8, 7, 6, 9 ]
*[ 1, 2, 3, 4, 5, 8, 7, 6, 9 ]
*[ 1, 2, 3, 4, 5, 8, 7, 6, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*/
```

---

## 堆排序 -- Heap Sort

堆排序的动画演示: [Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

堆排序是利用完全二叉树最大堆和最小堆的原来来进行排序的。[这篇文章描述得很好，可以参看](http://bubkoo.com/2014/01/14/sort-algorithm/heap-sort/)。

```javascript
function heapSort(array) {
    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    function maxHeapify(array, index, heapSize) {
        var iMax,
            iLeft,
            iRight;
        while (true) {
            iMax = index;
            iLeft = 2 * index + 1;
            iRight = 2 * (index + 1);
            if (iLeft < heapSize && array[index] < array[iLeft]) {
                iMax = iLeft;
            }
            if (iRight < heapSize && array[iMax] < array[iRight]) {
                iMax = iRight;
            }
            if (iMax != index) {
                swap(array, iMax, index);
                index = iMax;
            } else {
                break;
            }
        }
    }
    function buildMaxHeap(array) {
        var i,
            iParent = Math.floor(array.length / 2) - 1;
        for (i = iParent; i >= 0; i--) {
            maxHeapify(array, i, array.length);
        }
    }
    function sort(array) {
        buildMaxHeap(array);
        for (var i = array.length - 1; i > 0; i--) {
            swap(array, 0, i);
            maxHeapify(array, 0, i);
        }
        return array;
    }
    return sort(array);
}

//code for testing

var arr = [];
for (var i=9; i >=1; i--){
    arr.push(i);
}
heapSort(arr);
console.log(arr);
```

---

## 归并排序 -- Merge Sort

归并排序的动画演示: [Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

归并排序是第一个被实际使用的排序算法。这个算法的复杂度是`O(nlog`<sup>`n`</sup>`)`。

归并排序是一种分治算法，其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完成的大数组。

由于是分治法，所以是递归的。

```javascript
function mergeSortRec(arr) {
    var length = arr.length;
    if (length === 1)
        return arr;
    var mid = Math.floor(length/2),
        left = arr.slice(0, mid),
        right = arr.slice(mid, length);
    return merge(mergeSortRec(left),mergeSortRec(right));
}
function merge(left,right) {
    var res = [],
        il = 0,
        ir = 0;
    while (il < left.length && ir < right.length){
        if (left[il] < right[ir])
            res.push(left[il++]);
        else
            res.push(right[ir++]);
    }
    while (il < left.length){
        res.push(left[il++]);
    }
    while (ir < right.length){
        res.push(right[ir++]);
    }
    //console.log(res);
    return res;
}
```

如图执行过程。

![merge-insertion]({{ '/styles/images/algorithms/mergeSort.jpg' | prepend: site.baseurl }})

- 在`mergeSortRec()`函数中，如果数组长度是1，则返回被分解最小的只有一个项的数组，因为它已经排序了，而且这也是我们递归的终止条件。
- 如果数组长度大于1，我们就要将其分成小数组。为此，我们找到中间行，分成`left`和`right`两个小数组。
- 然后，我们调用`merge()`函数，该函数用来合并和排序小数组。
- 在`merge()`函数中，比较来自`left`数组的项是否比来自`right`的数组的项小，如果是，将`left`的数组添加至归并数组，然后将剩余的`right`剩余的项添加至归并数组，反之亦然。

---

## 快速排序 -- Quck Sort

快速排序的动画演示: [Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

快速排序也许是最常用的排序算法了。它的复杂度是`O(nlog`<sup>`n`</sup>`)`，且它的性能通常比其他的复杂度为`O(nlog`<sup>`n`</sup>`)`的排序算法好。

快速排序也是使用分治的方法，将原始数组分解为较小的数组。

- 首先，从数组中选择中间一项作为主元(当然，任选是合理的但并不是最优的)
- 创建两个指针，左边一个指向数组第一项，右边一个指向数组最后一项。移动左指针直到我们找到一个比主元大的元素，接着，移动右指针直到找到一个比主元小的元素，然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫划分操作。
- 接着，算法对划分后的小数组重复之前的两个步骤，直至数组完全排序。

```javascript
function quickSort(arr,left,right){
    var index;
    if(arr.length > 1){
        index = partition(arr, left, right);
        if(left < index - 1)
            quickSort(arr, left, index - 1);
        if(index < right)
            quickSort(arr,index,right);
    }
}

function partition(arr,left,right) {
    var pivot = arr[Math.floor((left + right) / 2)],
        i = left,
        j = right;

    while (i <=j){
        while (arr[i] < pivot){
            i++;
        }
        while  (arr[j] > pivot){
            j--;
        }
        if (i <= j){
            swapQuickSort(arr,i,j);
            i++;
            j--;
        }
    }
    return i;
}

function swapQuickSort(arr,index1,index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
```

---

## 桶排序 -- Bucket Sort

桶排序的动画演示: [Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/BucketSort.html)

桶排序(Bucket Sort)是通过一定规则将数据放到不同的桶中去，然后对每个桶进行分别排序(使用其他排序方式，或利用递归继续使用桶排序)。排序过程如下:

+ 待排的数据分布在一个范围内，对这一范围进行分割，分割为多个小范围
+ 待排的数据归档进入这些小范围，并对小范围的数据进行排序
+ 将各个子桶的数据有序归并

举个栗子，我们有一组数:[29 25 3 49 9 37 21 43]，其中最大数为49。则我们可以设置5个桶，每个桶的范围是[0~9][10~19][20~29][30~39][40~49]。[3,9]放到第一个桶，[21,25,29]放到第三个桶，[37]放到第四个桶，[49,43]放到第五个桶。然后对每个桶的数进行排序，保证每个桶有序，然后将各个桶中的数据有序合并起来。如下图:

![桶排序]({{ '/styles/images/algorithms/bucket-sort.png' | prepend: site.baseurl }})

```js
'use strict';
function bucketSort(array, step) {
    var result = [],
        bucket = [],
        bucketCount,
        l = array.length,
        i,
        j,
        k,
        s,
        max = array[0],
        min = array[0],
        temp;

    max = array.reduce((a, b) => Math.max(a, b));
    min = array.reduce((a, b) => Math.min(a, b)) - 1;

    bucketCount = Math.ceil((max - min) / step); // 需要桶的数量
    for (i = 0; i < l; i++) {
        temp = array[i];
        for (j = 0; j < bucketCount; j++) {
            if (temp > (min + step * j) && temp <= (min + step * (j + 1))) { // 判断放入哪个桶
                if (!bucket[j]) {
                    bucket[j] = [];
                }
                // 通过插入排序将数字插入到桶中的合适位置
                s = bucket[j].length;
                if (s > 0) {
                    for (k = s - 1; k >= 0; k--) {
                        if (bucket[j][k] > temp) {
                            bucket[j][k + 1] = bucket[j][k];
                        } else {
                            break;
                        }
                    }
                    bucket[j][k + 1] = temp;
                } else {
                    bucket[j].push(temp);
                }
            }
        }
    }
    for (i = 0; i < bucketCount; i++) { // 循环取出桶中数据
        if (bucket[i]) {
            k = bucket[i].length;
            for (j = 0; j < k; j++) {
                result.push(bucket[i][j]);
            }
        }
    }
    return result;
}
console.log(bucketSort([29, 25, 3, 49, 9, 37, 21, 43], 10));
```

> [代码参考](http://bubkoo.com/2014/01/15/sort-algorithm/bucket-sort/)，健壮性有待提高

---

## 二分查找

- 选择数组中间的值
- 如果选中值是待搜索值，结束
- 如果待搜索值比选中值要小，返回步骤1并在选中值左边的子数组中寻找
- 如果待搜索值比选中值要大，返回步骤1并在选中值右边的子数组中寻找

所以，在二分查找前，我们需要将数组项排序。

```javascript
function binarySearch(arr,item){
    quickSort(arr);
    var low = 0,
        high = arr.length - 1,
        mid, element;
    while (low <= high){
        mid = Math.floor((low + high)/2);
        element = arr[mid];
        if(element < item){
            low = mid + 1;
        }else if(element > item){
            high = mid -1;
        }else {
            return mid;
        }
    }
    return -1;
}
```