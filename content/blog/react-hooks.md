---
title: "Understanding React Hooks"
date: "2024-03-10"
slug: "understanding-react-hooks"
tags: ["React", "JavaScript", "Frontend"]
---

React Hooks are a fantastic addition to the React ecosystem...

## Why Hooks?
Before hooks, functional components were limited...

### useState
The `useState` hook allows you to add state to functional components...

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}