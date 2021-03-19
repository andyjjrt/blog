---
layout: post
title: "背包問題2 時間"
date: 2021-03-19 13:18:56 +0800
tags:
 - C
 - DP
---

繼上次研究完背包問題，初步程式碼為


```c++
#include <stdio.h>
#include <limits.h>
#define MIN(a,b) (((a)<(b))?(a):(b))

int main(){
	int n;
	scanf("%d", &n);
	int solutions[1000010];
	solutions[0] = 0;
	solutions[1] = 1;
	for(int i = 2; i <= n; ++i){
		solutions[i] = i;
		for(int j = 2; j*j <= i; ++j){
			solutions[i] = MIN(solutions[i], solutions[i - j*j] + 1);
		}
	}
	printf("%d\n", solutions[n]);
}
```
但是這樣的程式時間為691ms，超過原題預設時間450ms。

但是神奇的是，將兩個`for`迴圈反著包，時間壓縮近一倍到373ms
```c++
#include <stdio.h>
#define MIN(a,b) (((a)<(b))?(a):(b))

int main(){
	int n;
	scanf("%d", &n);
	int solutions[1000010];
	for(int u = 0; u < 1000010; u++){
		solutions[u] = 1000010;
	}
	solutions[0] = 0;
	int perfect = 1;
	for(int i = 1; perfect <= n; i++){
		perfect = i*i;
		for(int j = perfect; j <= n; j++){
			solutions[j] = MIN(solutions[j], solutions[j - perfect] + 1);
		}
	}
	printf("%d\n", solutions[n]);
}
```
<br>

在概念上雖然可以理解成**先直後橫**和**先橫後直**的差別，但第一種方法不斷計算最大完全平方數，第二種方法卻只計算一遍，而兩者又都要跑一遍 `1~n`，因此第二種方法比第一種少了一個三角形，自然快上許多。

