---
layout: project
title: "Neural Network Implementation from Scratch"
description: "A pure NumPy implementation of a deep neural network with backpropagation"
date: 2025-08-24
category: ml
featured: true
tech: [Python, NumPy, Matplotlib, Jupyter]
github: https://github.com/theoteske/basic-neural-net
demo: 
featured_image: /assets/images/neural-network-project.png
---

## Overview

This project implements a fully-functional deep neural network from scratch using only NumPy. The goal was to understand the fundamental mathematics behind neural networks by implementing forward propagation, backpropagation, and various optimization algorithms.

## Features

 - **Layers**: Dense (fully connected) layers
 - **Activation Functions**: ReLU, Sigmoid, Softmax, Identity
 - **Loss Functions**: MSE, Cross-Entropy
 - **Optimizers**: SGD with Momentum, Nesterov AGD, RMSprop, Adam
 - **Sequential Model API**: Easy model construction and training

## Installation

Clone the repository and install the package:

```bash
git clone https://github.com/theoteske/basic-neural-net.git
cd basic-neural-net
pip install -e .
```

To run the examples, install additional dependencies:

```bash
pip install -e ".[examples]"
```

## Usage

Basic example of creating and training a model:

```python
from basic_neural_net import Sequential
from basic_neural_net import layers, activations, losses, optimizers

# Create model
model = Sequential()
model.add(layers.InputLayer(input_shape=784))
model.add(layers.Dense(784, 128, activation=activations.Sigmoid))
model.add(layers.Dense(128, 10, activation=activations.Softmax))

# Train model
model.train(
    X_train,
    y_train,
    epochs=10,
    learning_rate=0.001,
    batch_size=32,
    loss=losses.CrossEntropy
)

# Make predictions
predictions = model.predict(X_test)
```

## Examples

The repository includes a Jupyter notebook demonstrating MNIST digit classification:

```bash
cd examples
jupyter notebook mnist_example.ipynb
```

## Requirements

 - Python 3.7+
 - NumPy
 - SciPy

Optional dependencies for examples:
 - TensorFlow (for MNIST dataset)
 - Matplotlib (for visualizations)
 - Jupyter (for notebooks)