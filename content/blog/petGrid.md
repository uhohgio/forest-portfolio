---
title: "How I Built the Pet Grid for Our Pet Adoption App"
date: "2025-08-13"
slug: "pet-grid-process"
tags: [ "React", "UI/UX", "Design", "Tutorial" ]
---

## Introduction

In our pet adoption app, one of the core UI patterns is a grid of pet profile cards. Think of it like an online store, but instead of products, we’re displaying adoptable pets.

We needed a **reusable** solution that would work in multiple contexts:

- Browsing all pets  
- Viewing pets for a specific shelter  
- Showing filtered results (e.g., only puppies, only cats, etc.)  

I’ll walk through **why** we built it the way we did, **how** the data flows, and **what patterns** we used to keep it clean and maintainable. At the end, you’ll see a diagram of the whole process.

---

## The Problem

A "PetCard" in our app is a small, clickable React component. It shows the pet’s photo, name, and some quick info, and when clicked, navigates to the pet’s profile page.

We wanted a grid of these PetCards,  **PetGrid** , that:

1. **Could adapt to different contexts** without rewriting logic each time.  
2. **Fetched pet data dynamically** (so we weren’t hardcoding lists anywhere).  
3. **Stayed clean, modular, and maintainable**, even as new features got added.

---

## Why Not Just Build It Once and Reuse It Everywhere?

If we simply hardcoded PetGrid to always fetch all pets, we’d run into problems:

- On a shelter’s profile page, we’d still be fetching every pet, then manually filtering them in each place we used the grid.  
- In the browse section, we’d need *different* filtering logic (size, breed, age, etc.).  
- If the filtering logic changed, we’d have to update it in multiple places (not ideal for long-term maintenance).

So instead, we made **PetGrid dumb and flexible** — meaning it doesn’t decide what pets to show on its own. The logic comes from outside.

---

## The Solution: Passing in `filters`

We decided to **outsource the decision-making**.

PetGrid accepts an object called `filters` that describes *what* pets it should display. This `filters` object is created or updated by other components (like PetFilter or ShelterProfile) depending on the current context.

Here’s the mental model:

- **PetGrid** is the **chef**.  
- **Fetched data** is the **ingredients**.  
- **Filters** are the **recipe instructions**.

PetGrid takes the data, applies the filters, and produces a grid of PetCards.

---

### Step-by-Step Flow

1. **Data Fetching** – PetGrid calls the API to fetch a list of pets.  
2. **Filtering** – PetGrid applies the `filters` object to decide which pets to include.  
3. **Card Rendering** – For each pet that passes the filters, PetGrid renders a PetCard.  
4. **Context Changes** – If another component updates `filters`, PetGrid re-renders with the new filtered list.

🐶 API Fetch → 📋 PetGrid → 🔍 Apply Filters → 🖼️ Render Cards


---

### In-App Examples

**Scenario 1: Shelter Profile Page**  
- The `filters` object contains `{ shelterId: "abc123" }`.  
- PetGrid fetches all pets but only shows ones from that shelter.

**Scenario 2: Browse Pets Page**  
- A `PetFilter` component lets the user select preferences (species, age, size).  
- These preferences update `filters`, which PetGrid uses to re-render the grid.

---

## The Pattern

This approach is similar to **functional programming**:

- Instead of embedding filtering logic inside PetGrid, we *pass it in* as data.  
- PetGrid’s job is purely to **take data → apply filters → render components**.  

**Important to note:** that we are not strictly doing functional programming here. This pattern simply borrows from functional programming ideas. 

In our case, the `filters` object is a set of rules rather than an actual function, but the spirit is similar: the behavior is controlled **externally** rather than being hardcoded inside.

```
// How filters are applied in the PetGrid component

const filteredPets = petList.filter((pet) => {
  for (const key in filters) {
    const filterValue = filters[key];
    if (filterValue === '' || filterValue === false) continue;
    return pet[key] === filterValue;
  }
  return true;
});
```

By separating **what to render** (filters) from **how to render it** (PetGrid), we make the component easier to test, maintain, and reuse.

---

## Conclusion

By passing filters into PetGrid instead of hardcoding logic, we ended up with a component that’s:

- **Reusable** in multiple contexts.  
- **Easier to maintain** because filtering logic is centralized elsewhere.  
- **Cleaner** in its separation of concerns.

It’s a small architectural choice, but it’s one of those patterns that keeps your React codebase sane as your app grows.
