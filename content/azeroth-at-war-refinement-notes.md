# AZEROTH AT WAR — Open Design Issues

*Unresolved questions from the v1.0 refinement review. These items were not integrated into the v1.1 rules and require further playtesting or design decisions.*

> **See also:** The v1.1 core rules already incorporate all decided refinements (no defensive strikes, INI-as-dodge, Taunt rework, Dispel/Counterspell, Rout fleeing, Mana scaling, summoned unit rules, LOS, terrain, etc.). This document tracks only the **remaining open questions**.

---

### #20 — Morale Cascade Frequency
**[Balance]**

Every model within 6" of a destroyed friendly must test Morale. In a typical game with 9-12 models per side on a 30"x21" table, most of your army will be within 6" of *something* that dies. This means once casualties start, you could be rolling Morale for 5-8 models every single turn. That's a lot of dice rolling that slows the game down, and the cascading Waver/Rout effects can create unfun death spirals.

**Suggestion — Tighten the Trigger:** Change to "within 3" of a destroyed friendly" (only nearby models are shaken) or limit it to "a friendly model of the same or higher tier was destroyed within 6"" (grunts don't panic when another grunt dies across the field, but they notice when the Kodo Beast falls). This preserves the drama without creating a Morale cascade every turn.

---

### #21 — Waver Too Punishing for Melee
**[Depth] [Balance]**

A Wavering model can only Hold -> Shoot or Fight (Hold Ground). For a melee-only model with no ranged weapon, Wavering means it literally does nothing useful — it can fight if already engaged, but can't move to *become* engaged. A Wavering melee model in the open is a sitting duck for a full turn.

**Suggestion:** Allow Wavering models to also **Move (but not Rush, Charge, or Combat Withdraw)**. This lets them reposition or fall back toward allies without being completely helpless. They still can't be aggressive, but they aren't rooted in place.

---

### #24 — Objectives Are Binary and Uncontested
**[Balance] [Depth]**

"A player controls an objective if they have a unit within 3" and the enemy does not." This means a single model standing on a point controls it regardless of how many enemy models are nearby — as long as one enemy is also within 3", *nobody* controls it. This creates situations where sending a single disposable unit to contest an objective is always correct.

**Suggestion — Contested Objectives:** Control could require having **more models within 3"** than your opponent (majority control). This encourages committing forces to objectives rather than just sending a single body. Alternatively, keep the current system but add: *"If both players have models within 3", the player with the most models within range controls it. If tied, neither player controls it."*

---

### #25 — Assassination Degenerate Strategy
**[Balance]**

In Assassination, each player secretly nominates a Warlord. The optimal strategy is to nominate your *cheapest, most expendable* Hero as Warlord, keep them hidden in the back, and play a normal game of attrition. This undermines the intended drama.

**Suggestion:** Require the Warlord to be the player's **most expensive Hero** (or require the Warlord to have been within 12" of an enemy model at least once by Round 3, or they are "revealed" and their opponent may choose which Hero is the Warlord). This forces the Warlord into the fight.

---

### #26 — Annihilation Tiebreaker
**[Edge Case]**

"The player who destroyed the most enemy points wins." What if both players destroy the exact same points value? This is unlikely but possible.

**Note:** The v1.1 rules added a tiebreaker (most surviving Wounds, then draw), but this should be validated in playtesting to ensure it feels satisfying.

---

### #29 — Base Sizes / Size Categories
**[Clarity] [Depth]**

The rules mention 28-32mm scale minis but never define base sizes. Base size matters enormously — a model on a 40mm base has a much larger engagement zone footprint than a 25mm base model. And there's no Small/Medium/Large/Huge size category, which matters for LOS, movement through gaps, and terrain interactions.

**Suggestion:** Define base size standards (e.g., Baseline: 25mm round, Mounted: 25x50mm oval, Elite Monsters: 40mm round, Large Monsters: 50mm round) and add a **Size** stat or tag (Small, Medium, Large) to unit profiles. This also future-proofs the rules for monsters that should block LOS, occupy more space, etc.

---

### #30 — Ability Targeting Framework
**[Clarity] [Depth]**

Section 8 describes ability *types* (Instant, Buff, Debuff, Reaction, Blast) but provides no framework for how non-Blast abilities target. Do Buffs require LOS? What's the default range? Can you Buff a model across the entire map? The rules say "affects friendly units within range" — but what range?

**Suggestion:** Each ability on a unit card should specify its range and targeting. But the core rules should provide defaults: *"Unless stated otherwise, abilities require Line of Sight and have a maximum range of 12". Buff/Aura abilities that affect 'friendly models within X inches' are measured from the caster and do not require LOS."*

---

### #31 — Round 1 Alpha Strike
**[Balance]**

With deployment zones only 3-5" deep on a 21-30" table, the gap between armies is 11-20". A fast unit (MOV 8+) can Rush 16" on turn 1 and be in charge range by turn 2. Ranged units can shoot immediately. There's no "first turn protection" — the player who activates first can potentially cripple a key model before it ever acts.

**Suggestion:** Consider a "Cautious Advance" rule for Round 1: *"During Round 1, models may not Charge, and ranged attacks suffer an additional -1 to hit."* This represents the fog of war as armies close the distance, and prevents feel-bad moments where a player loses a Hero before it activates. Alternatively, limit Round 1 to Move and Rush actions only.
