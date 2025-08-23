---
layout: post
title: "Sample Technical Post Demonstrating Math and Code"
date: 2025-08-22
categories: [tutorial, demo]
tags: [math, latex, code, markdown]
author: Theo Teske
toc: true
math: true
---

This is a sample post demonstrating the technical capabilities of my Jekyll blog, including LaTeX math rendering and syntax-highlighted code blocks.

## Math with LaTeX

### Inline Math

We can write inline math like $E = mc^2$ or $\sum_{i=1}^{n} x_i$ directly in our text.

### Display Math

For larger equations, we use display math:

$$
\frac{\partial L}{\partial \theta} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}.
$$

### Complex Equations

Here's the quadratic formula:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.
$$

Here is an aligned set of equations:

$$
\begin{align*}
(x+2)^2 &= (x+2)(x+2) \\
&= x^2 + 4x + 4.
\end{align*}
$$

And here is a matrix example:

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
$$

## Code Examples

### Python Code

```python
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib_sequence = [0, 1]
    for i in range(2, n):
        next_num = fib_sequence[i-1] + fib_sequence[i-2]
        fib_sequence.append(next_num)
    
    return fib_sequence
```

### JavaScript Code

```javascript
// Implementing a binary search tree
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    insert(value) {
        const newNode = new Node(value);
        
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
}
```

### Bash/Shell Script

```bash
#!/bin/bash
# Script to backup important files

SOURCE_DIR="/home/user/documents"
BACKUP_DIR="/backup/documents"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Perform backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" "$SOURCE_DIR"

# Keep only last 7 backups
ls -t "$BACKUP_DIR"/backup_*.tar.gz | tail -n +8 | xargs rm -f

echo "Backup completed: backup_$DATE.tar.gz"
```

## Algorithm Analysis

Let's analyze the time complexity of the Fibonacci function above. The recursive implementation has a time complexity of $O(2^n)$, while our iterative approach has:

- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$

We can improve the space complexity to $O(1)$ by only keeping track of the last two numbers:

```python
def fibonacci_optimized(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    
    return curr
```

## Combining Math and Code

Consider the following implementation of gradient descent:

```python
import numpy as np

def gradient_descent(X, y, theta, alpha, iterations):
    """
    Performs gradient descent to learn theta.
    
    Args:
        X: input features (m x n matrix)
        y: target values (m x 1 vector)
        theta: parameters (n x 1 vector)
        alpha: learning rate
        iterations: number of iterations
    """
    m = len(y)
    
    for i in range(iterations):
        # Hypothesis: h = X * theta
        h = X.dot(theta)
        
        # Calculate the cost J(theta)
        cost = (1/(2*m)) * np.sum((h - y)**2)
        
        # Calculate gradient
        gradient = (1/m) * X.T.dot(h - y)
        
        # Update parameters
        theta = theta - alpha * gradient
        
        if i % 100 == 0:
            print(f"Iteration {i}: Cost = {cost:.4f}")
    
    return theta
```

The cost function being minimized is:

$$
J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})^2
$$

Where $h_\theta(x) = \theta^T x$ is our hypothesis function.