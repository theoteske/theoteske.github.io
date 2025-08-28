---
layout: post
title: "Fast Exponentiation and Modular Exponentiation"
date: 2025-08-28
categories: [tutorial, demo]
tags: [modular exponentiation, leetcode, number theory]
author: Theo Teske
toc: true
math: true
---

We give an exposition of both the fast exponentiation and modular exponentiation algorithms, then we apply the latter to the LeetCode problem [2438. Range Product Queries of Powers](https://leetcode.com/problems/range-product-queries-of-powers/description/). The solution to this problem presented here differs substantially from the solution provided in the LeetCode editorial while still achieving optimal runtime and memory efficiency.

## Fast Exponentiation

Consider the following problem: given some integer base $x$ and some non-negative integer exponent $n$, efficiently compute the value of $x^n$, or $x$ raised to the power of $n$. Of course, the brute force solution involves $n$ multiplications by $x$, which will have $O(n)$ runtime efficiency. However, we can do better.

The core insight is that we can repeatedly halve the exponent rather than multiplying the base $n$ times, leading to logarithmic time complexity. We can summarize the **fast exponentiation** algorithm, also known as the method of **repeated squaring**, with the following recursion<sup>[[1]](#ref1)</sup>:

$$
x^n = 
\begin{cases}
1 & \text{if } n = 0 \\
x^{n/2} \cdot x^{n/2} & \text{if } n \text{ is even} \\
x \cdot x^{(n-1)/2} \cdot x^{(n-1)/2} & \text{if } n \text{ is odd}
\end{cases}
$$

In each recursive call, we solve the subproblem with exponent $n/2$ when $n$ is even, or with exponent $(n-1)/2$, when $n$ is odd. This gives us the recurrence relation

$$
T(n) = T(n/2) + O(1),
$$

where $O(1)$ represents the constant time operations (one or two multiplications per call). By the master method<sup>[[1]](#ref1)</sup>, this yields a $O(\log_2 n)$ time complexity.

Below is an example of the algorithm implemented iteratively in C++:

```cpp
int power(int base, int exp) {
    int result = 1;
    while (exp > 0) {
        if (exp & 1) result = result * base; // If exp is odd, multiply by the base
        base = base * base;                  // Square the base
        exp >>= 1;                           // Halve the exponent
    }
    return result;
}
```

In effect, we're processing the binary representation of $n$ bit by bit, from least significant (rightmost) to most significant (leftmost). We can write any non-negative integer $n$ in binary by expressing it as a sum of powers of $2$:

$$
n = b_0\cdot 2^0 + b_1\cdot 2^1 + b_2\cdot 2^2 + \dots + b_k\cdot 2^k,
$$

where each $b_i \in \{ 0, 1 \}$ is the $i$th binary digit of $n$. For example, 

$$
27 = 1\cdot 2^0+1\cdot 2^1+0\cdot 2^2+1\cdot 2^3+1\cdot 2^4 = 11011_2,
$$

where the subscript-$2$ notation denotes a binary representation. With this in mind, we can write

$$
\begin{align*}
x^n &= x^{b_02^0 + b_12^1 + b_22^2 + \dots + b_k2^k} \\
&= \prod_{i=0}^k (x^{2^i})^{b_i}.
\end{align*}
$$

This latter formula works as a neat summary of the fast exponentiation algorithm. At iteration $i$, the variable `base` holds $x^{2^i}$. If $b_i = 1$ (the exponent's $i$th bit is 1), the algorithm multiplies this into `result`. If $b_i = 0$, the algorithm skips this multiplication. In both cases, it squares `base` to move from $x^{2^i}$ to $x^{2^{i+1}}$ for the next iteration.

To make this process more clear, consider the example when we want to compute $3^{13}$, so $x = 3$ and $n = 13$. When we write $n$ in binary, we are expressing it as a sum of powers of $2$, so $13$ is represented in binary as $1101_2$:

$$
13 = 8 + 4 + 1 = 2^3 + 2^2 + 2^0.
$$

The walkthrough of the algorithm's execution for this example is as follows:

| Step | Current exp (binary) | Lowest bit | Action on `result` | New result | Next base (squared) |
| ---- | -------------------- | ---------- | ------------------ | ---------- | ------------------- |
| 1    | $1101_2$ ($13$)           | 1          | Multiply by $3$      | $1\cdot 3 = 3$    | $3^2 = 9$              |
| 2    | $110_2$ ($6$)             | 0          | Skip               | $3$          | $9^2 = 81$             |
| 3    | $11_2$ ($3$)              | 1          | Multiply by $81$     | $3\cdot 81=243$   | $81^2 = 6561$          |
| 4    | $1_2$ ($1$)               | 1          | Multiply by $6561$   | $243 \cdot 6561$   | done (exp is $0$)        |

The final result we end up with is $243 \cdot 6561 = 1594323$.

## Modular Exponentiation

We can extend the above approach to instead raise one number to a power modulo another number, which is known as **modular exponentiation**. Formally, given a non-negative integer base $x$, a non-negative integer exponent $n$ and a positive integer modulus $m$, we want to efficiently compute the value $x^n \text{ mod } m$. Modular exponentation is crucial in many number-theoretic computations, including in primality-testing and in the RSA (Rivest–Shamir–Adleman) cryptosystem.

Practically, efficient modular exponentiation involves the same algorithm as fast exponentiation, but with modulo operations added at each step. Note that these modulo operations can safely be applied without threatening the correctness of the result because the modulo operation is distributive over multiplication, meaning that

$$
(a\cdot b) \text{ mod } m = (a \text{ mod } m) \cdot (b \text{ mod } m) \text{ mod } m,
$$

for non-negative integers $a, b$ and positive integer $m$.

Below is an example of modular exponentation implemented in C++:
```cpp
int power(int base, int exp, int mod) {
    int result = 1;
    base %= mod;                                           // Initial modulo operation
    while (exp > 0) {
        if (exp & 1) result = (1LL * result * base) % mod; // Modulo after multiplying
        base = (1LL * base * base) % mod;                  // Modulo after squaring
        exp >>= 1;
    }
    return result;
}
```

By performing modulo operations at each step, we keep intermediate values manageable, reducing the cost of calculation and preventing a potential overflow.

## LeetCode 2438. Range Product Queries of Powers

Finally, we apply modular exponentiation to a the LeetCode problem [2438. Range Product Queries of Powers](https://leetcode.com/problems/range-product-queries-of-powers/description/). The problem statement is as follows:

>Given a positive integer `n`, there exists a `0`-indexed array called `powers`, composed of the minimum number of powers of $2$ that sum to $n$. The array is sorted in non-decreasing order, and there is only one way to form the array.
> 
>You are also given a `0`-indexed 2D integer array `queries`, where `queries[i] = [left_i, right_i]`. Each `queries[i]` represents a query where you have to find the product of all `powers[j]` with `left_i <= j <= right_i`.
>
>Return an array answers, equal in length to queries, where `answers[i]` is the answer to the `i`th query. Since the answer to the `i`th query may be too large, each `answers[i]` should be returned modulo $10^9 + 7$.

The brute force solution would involve performing up to $32$ multiplications for each query, because the length of the `powers` array is bounded above by $32$, and then performing a modulo operation on the result we get at the end. Not only does this require a high constant factor to process each query, but it also requires multiplying very large numbers, which is costly and risks overflow.

We can use a prefix product array to achieve efficient processing of each query. However, the naive implementation of a prefix product array without performing intermediate modulo operations still requires multiplying large numbers and therefore risks overflow, and we can't just perform intermediate modulo operations because the modulo operation is not distributive over division.

To solve this problem, we can apply Fermat's Little Theorem. The statement is as follows:

>Let $m$ be prime and $x$ be an integer such that $x$ and $m$ are coprime. Then
$$
\begin{equation*}
x^{m-1} \text{ mod } m = 1.
\end{equation*}
$$

Readers well versed in number theory will recognize that this is a special case of Euler's Theorem, because for any prime $m$, we have $\phi(m) = m - 1$. From Fermat's Little Theorem, it immediately follows that

$$
\begin{equation*}
a \cdot a^{m-2} \text{ mod } m = 1.
\end{equation*}
$$

In other words, we know that modulo $m$, $a^{m-2}$ is the *multiplicative inverse* of $a$, so we can write that

$$
\begin{equation*}
a^{-1} \text{ mod } m = a^{m-2} \text{ mod } m.
\end{equation*}
$$

This means that, for any integer $b$ which is coprime to $m$, we have

$$
\begin{align*}
b / a \text{ mod } m &= b \cdot a^{-1} \text{ mod } m \\
&= b \cdot a^{m-2} \text{ mod } m.
\end{align*}
$$

Observe that $10^9 + 7$ is prime (this can be verified by the reader). Thus, we can apply the above result, efficiently precomputing the multiplicative inverse for each element in the prefix array using  modular exponentiation.

The solution in its entirety is below, implemented in C++:

```cpp
// OJ: leetcode.com/problems/range-product-queries-of-powers/description/
// Author: github.com/theoteske
// Time: O(Q)
// Space: O(1)
class Solution {
private:
    const int MOD = 1000000007;
    int modPower(long long base, long long exp) {
        int result = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp & 1) result = (1LL * result * base) % MOD;
            base = (1LL * base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }
public:
    vector<int> productQueries(int n, vector<vector<int>>& queries) {
        // construct powers array
        vector<int> powers;
        for (int i = 0; i <= 31; ++i) {
            if ((1 << i) & n) powers.push_back(1 << i);
        }

        // construct prefix product array
        const int P = powers.size();
        vector<int> prefix(P + 1, 1);
        for (int i = 1; i <= P; ++i) {
            prefix[i] = (1LL * prefix[i - 1] * powers[i - 1]) % MOD;
        }

        // precompute multiplicative inverses under mod for each value in prefix
        vector<int> inverse;
        inverse.reserve(P + 1);
        for (int num : prefix) {
            inverse.push_back(modPower(num, MOD - 2));
        }

        // process queries
        const int Q = queries.size();
        vector<int> ans(Q);
        for (int i = 0; i < queries.size(); ++i) {
            ans[i] = (1LL * prefix[queries[i][1]+1] * inverse[queries[i][0]]) % MOD;
        }

        return ans;
    }
};
```

## References

1. <a id="ref1"></a>Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press.