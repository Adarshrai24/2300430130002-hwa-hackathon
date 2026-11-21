# PulsePuzzle - Product Concept

**Adaptive Multi-Sensory Engagement System for Dogs**

## Overview

PulsePuzzle is a modular, scent-driven puzzle feeder that adapts difficulty in real time based on the dog's interaction patterns. It combines olfactory stimulation (the primary dog sense), mechanical problem-solving, and variable reward scheduling to maintain engagement for 2-4+ hours per session — solving the "dog home alone while away" problem.

## Selected concept

PulsePuzzle was selected over four alternatives (EchoBall, TugTree, NoseWork Nest, HydroPlay) because olfaction drives dog engagement more than audio, tug, burrowing, or water play, and it is the only concept that offers static-free, adaptive, unsupervised long engagement.

## Physical architecture

- Base unit: 180mm × 180mm × 60mm
- 4 adaptive chambers, each with a distinct scent cartridge and servo gate
- Central hub: ESP32, 4× servo, 4× Hall sensor, 18650 battery (30-day life), USB-C
- Scent cartridge bay: 4× swappable, tool-free, magnetic, color-coded pods

## Scent cartridge system

Food-grade polyethylene matrix infused with encapsulated essential oils (chicken, beef, peanut butter, cheese, bacon, liver). 30+ sessions per cartridge. GRAS-listed compounds, zero artificial preservatives.

## Adaptive algorithm (pseudocode)

```
target_solve_time = 15 * (chamber_index + 1)  # 15, 30, 45, 60 min
actual = measure_solve_time(chamber)
if actual < target * 0.7:
    next_chamber.difficulty += 1
elif actual > target * 1.5:
    next_chamber.difficulty -= 1
# Persist profile to dog_id for next session
```

## Engagement mechanics

1. Scent trail — each chamber emits a distinct scent gradient
2. Mechanical puzzle — sliding panels, rotating discs, lift flaps (varied per chamber)
3. Variable reward — micro-kibble (3-5 pieces) per chamber + jackpot (15-20) at end
4. Progress memory — device remembers the dog's skill level across sessions
5. App companion (optional) — owner sees session stats, orders cartridges, updates firmware

## Safety & compliance

- Choking: all parts > 50mm, no detachable components < 80mm
- Materials: FDA-compliant ABS, TPU gates, silicone seals
- Electronics: conformal-coated PCB, sealed battery compartment, <5V
- Chew rating: ASTM F963 / EN 71 testing planned
- Designed for 4-hour solo unsupervised use

## Manufacturing (launch volume 5,000 units)

| Component | Process | Unit cost |
|---|---|---|
| Chamber shells | Injection mold (4-cavity) | $2.10 |
| Gate mechanisms | Injection mold + assembly | $3.80 |
| Scent cartridges | Compression mold + infusion | $0.85 |
| Electronics PCB | SMT assembly | $6.20 |
| Final assembly | Manual + test jig | $4.50 |
| **Total BOM** | | **~$17.45** |

## Retail positioning

- Price: $79-99 (launch $89.00)
- Tagline: "Engagement that adapts to your dog."
- Brand voice: Expert, warm, evidence-based, never cutesy
- Colors: Deep teal (#0D6E6E), warm amber (#D4A843), clean white (#FAFAFA), charcoal (#1A1A2E)
