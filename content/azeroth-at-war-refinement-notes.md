# Azeroth at War — Refinement Notes (v1.0 Review)

*Organized by section. Each issue is tagged: **[Balance]**, **[Clarity]**, **[Edge Case]**, or **[Depth]**.*

---

## MAJOR COMBAT REWORK — Three Connected Changes

These three changes are interconnected and represent the biggest revision to the core rules. They must be implemented together.

---

### A. No Defensive Strikes — DECIDED
**[Balance] [Depth] — Replaces old Section 7.2.2 Strike Order**

**Old rule:** When attacked in melee, the defender strikes back based on Initiative order.

**New rule:** When you attack a model in melee, **only the attacker rolls.** The defending model takes damage but does **not** strike back. A model only fights when **it is activated** by its controlling player.

**Impact on combat flow:**
> 1. Activate your model.
> 2. Choose an action sequence (Move → Charge → Fight, Fight, etc.).
> 3. If fighting: roll ATK dice → hit → wound → defender saves → apply damage. Done.
> 4. The defender does NOT roll any attacks. It fights on its own activation later.

**Why this works:** Alternating activations already ensure both players act regularly. Removing defensive strikes makes activation order the core tactical decision — *who* you activate and *when* matters far more than before. It also speeds up each activation significantly (one attack roll instead of two).

**Cascade changes needed:**
- Remove Section 7.2.2 (Strike Order) entirely — no more "higher INI strikes first"
- Remove simultaneous combat rules (ties no longer relevant)
- Rewrite Section 7.2.4 (Multiple Models in Melee) — the "defender strikes back each time" clause is gone
- Combat Withdrawal (Fight → Move) becomes: fight (attacker only), then move away, provoke Opportunity Attack

---

### B. Initiative Repurposed as Dodge — DECIDED
**[Balance] [Depth] — Replaces old Initiative strike-order role**

With no defensive strikes, Initiative no longer determines who swings first. Instead, it represents **agility and evasiveness in melee.**

**New rule:** When making a melee attack, compare the attacker's **Effective Initiative** to the defender's **Effective Initiative**:
> - If the **defender's** Effective INI is **higher** than the attacker's: the attacker suffers **-1 to hit rolls**.
> - If the attacker's Effective INI is **equal to or higher** than the defender's: no modifier.

**Effective Initiative** is still calculated the same way:
> Base INI + Armor Modifier (HA -1 / MA 0 / LA +1) + Weapon Modifier (LW +1) + Charge Bonus (+1)

**Examples:**
> - Rogue (INI 5, LA +1, LW +1 = **Eff. INI 7**) is attacked by an Orc Grunt (INI 3, MA 0, SW 0 = **Eff. INI 3**). Defender's INI is higher → Grunt suffers **-1 to hit**. The Rogue is too fast.
> - Knight charging (INI 4, HA -1, SW 0, Charge +1 = **Eff. INI 4**) attacks a Footman (INI 3, HA -1, SW 0 = **Eff. INI 2**). Attacker's INI is higher → **no modifier**. The charge connects cleanly.
> - Two Grunts (both Eff. INI 3) — equal, **no modifier**.

**Why this works:** All the existing equipment modifiers still matter. Light Armor + Light Weapon units become evasive and hard to pin down. Heavy Armor units are slow and easy to hit but tough to wound (high DEF/TGH). The stat stays on every unit card with no reprinting needed — it just does something different. Charging still gives +1 INI, which now helps overcome a defender's dodge bonus.

**Revised Initiative Modifiers table (Section 7.3):**
> | Source | INI Modifier |
> |---|---|
> | Heavy Armor (HA) | -1 |
> | Medium Armor (MA) | 0 |
> | Light Armor / None (LA) | +1 |
> | Light Weapon (LW) | +1 |
> | Heavy Weapon (HW) | -1 *(NEW — see issue #2)* |
> | Charging | +1 |

**Revised Combat Modifiers table — add:**
> | Defender's Effective INI higher than attacker's | -1 to hit rolls (melee only) |

---

### C. Taunt Reworked — Mark/Debuff — DECIDED
**[Depth] — Replaces old Taunt keyword**

**Old rule:** Enemies within 2" must direct melee attacks at the Taunt model.

**New rule:**
> **Taunt** — Once per round, after this model completes its activation (including any movement, charges, or attacks), it may declare **Taunt** on one enemy model within **6"** and Line of Sight. The target does not need to be engaged with the Taunt model.
>
> On the **taunted model's next activation**, it is compelled:
> - If **not engaged** with the Taunt model: it **must charge** the Taunt model (Move → Charge → Fight). If it cannot reach the Taunt model this activation (out of range, path blocked), it must move as close as possible toward the Taunt model (using its full MOV) and may take no other actions.
> - If **already engaged** with the Taunt model: it **must fight** the Taunt model (Fight action). It cannot choose a different target, use Combat Withdrawal, Rush away, or shoot a different target.
>
> **Taunt expires** after the taunted model completes its forced activation, or if the Taunt model is destroyed before then.
>
> **Restrictions:**
> - Once per round per Taunt model.
> - Target must be within 6" and within Line of Sight.
> - Taunt does not work on models with the **Undead/Mechanical** keyword (they cannot be compelled).
> - A model can only be affected by one Taunt at a time. If a second Taunt model targets an already-taunted enemy, the newer Taunt replaces the old one.

**Flow example:**
> 1. You activate your Paladin (has Taunt keyword).
> 2. Paladin moves → charges an Orc Grunt → fights it.
> 3. After fighting, declares Taunt on an enemy Warlock 5" away.
> 4. On the enemy's turn, the Warlock activates — it is taunted. It must charge the Paladin and fight it. No casting spells at your backline, no running away.
> 5. Next round, the Taunt has expired. The Paladin can Taunt again (same or different target).

**Why this works:** The tank gets a full activation (move, charge, fight) AND locks down a second enemy for their next turn. This is powerful but balanced — the tank can only mark one model per round, and the Taunt expires after one activation. It forces the enemy to deal with the tank instead of targeting your vulnerable casters and archers, which is exactly the WoW tank fantasy. It also synergizes with the no-strike-back system: the taunted model is forced to spend its precious activation attacking the toughest model on the field instead of a soft target.

**Update Keywords Quick Ref:**
> - **Taunt** — After activation, mark one enemy within 6". That enemy must charge/fight the Taunt model on its next activation. Once per round. Immune: Undead/Mechanical.

---

## COMBAT (Melee & Ranged)

### 1. ~~Defenders Strike Back Every Time~~ — SUPERSEDED
**[Superseded by Major Change A above]**

~~Previously marked as "resolved by design."~~ Now fully replaced — defenders do not strike back at all. See Major Change A.

### 2. Heavy Weapons -1 Initiative — DECIDED
**[Balance]**

**Decision:** Heavy Weapons get **-1 Initiative**, included in the revised INI modifier table in Major Change B above. Clean symmetry: LW +1 → SW 0 → HW -1, mirroring armor. A model with HA + HW is at -2 INI — slow and easy to hit but devastating when it connects.

### 3. Ranged STR vs Melee STR — Clarity on Armor Piercing
**[Clarity] [Edge Case]**

Section 4.5 introduces Ranged STR as separate from base STR. But the Armor Piercing rule (Section 7.4) just says "STR ≥ 2× TGH." Which STR? It should be explicit: **use whatever STR value was used for the wound roll** (Ranged STR for ranged attacks, base STR for melee). This matters for edge cases where a model has high melee STR but low Ranged STR on a throwing weapon.

### 4. Decisive Blow Stacking — DECIDED
**[Clarity]**

**Decision:** Decisive Blow values **do not stack additively**. If a model has multiple sources of Decisive Blow, use the **highest value only**.

**Revised rule text:** *"If a model has Decisive Blow from multiple sources (e.g., Heavy Weapon built-in and a separate keyword), use the highest Decisive Blow [X] value. They do not add together."*

### 5. Cleave Reworked — DECIDED
**[Clarity]**

**Decision:** When a model with Cleave rolls a **natural 6 on a hit roll**, that single hit die becomes **2 wound dice**. One wound die is resolved against the original target as normal. The second wound die is allocated to **one enemy model within 2"** of the original target (attacker chooses). Roll to wound and save separately for each target using the attacker's STR vs each target's TGH.

**Revised Cleave keyword:**
> **Cleave** — On a natural 6 to hit in melee, that hit generates **2 wound dice** instead of 1. The first wound die is resolved against the original target. The second is allocated to one enemy model within 2" of the target (roll to wound and save separately). If no enemy model is within 2", the second die is also applied to the original target.

### 6. ~~Simultaneous Death in Melee~~ — SUPERSEDED
**[Superseded]**

No longer relevant — with no defensive strikes, there is no simultaneous combat. Only the attacker rolls.

### 7. Opportunity Attack — DECIDED
**[Balance]**

**Decision:** Opportunity Attacks use **full ATK dice** but at **-1 to hit** (not +1). Still punishing, but harder to land than a normal attack. This replaces the old +1 to hit bonus.

**Revised rule text:**
> The enemy makes a single melee attack (full ATK dice) with **-1 to hit rolls**.

### 8. Fight → Shoot — Missing Restrictions
**[Edge Case] [Clarity]**

Fight → Shoot says the ranged attack must target a "different target" than the melee opponent. But:
- Can the ranged portion target a model that is engaged in melee with someone else? (This normally requires Precision Shot.)
- Does the ranged attack suffer any penalty for being made while engaged? Many wargames impose such a penalty.

**Suggestion:** Clarify that standard shooting-into-melee restrictions apply to the Shoot portion. Also consider a -1 to hit penalty on the ranged attack, representing the difficulty of attacking at range while also fighting in melee. This prevents Fight → Shoot from being a strictly superior version of Hold Ground for any model with a ranged weapon.

### 9. Flanking — Melee Only — DECIDED
**[Balance]**

**Decision:** Flanking (-1 DEF) applies to **melee attacks only**, not ranged. Remove "Flanking applies to both melee and ranged attacks" from Section 7.5.

**Revised note:** *"Flanking applies to melee attacks only. Ranged attacks are not affected by the target's facing."*

---

## MANA & ABILITIES

### 10. Abilities — One Per Activation — DECIDED (REVISED)
**[Clarity]**

**Decision:** A model may use **one ability per activation**. Some abilities are typed as **"Spell (Shoot)"** — these count as the model's ranged attack for that activation and follow the same action sequences (Move → Shoot, Hold → Shoot, Fight → Shoot). A model cannot use a Spell (Shoot) *and* make a normal ranged attack in the same activation.

**Revised Section 8.2 text:**
> You may activate multiple abilities per turn from different models, as long as you have the Mana. A single model can only use **one ability per activation**. Some abilities are typed as **Spell (Shoot)** — these replace the model's ranged attack in any action sequence that includes Shoot (Move → Shoot, Hold → Shoot, Fight → Shoot). A model cannot use a Spell (Shoot) and also make a normal ranged weapon attack in the same activation.

### 11. Reaction Timing — DECIDED
**[Clarity]**

**Decision:** Reaction abilities trigger **when a unit leaves the engagement range** of the model with the Reaction ability. This is the same trigger as Opportunity Attacks but uses an ability instead of (or in addition to) a melee swing.

**Revised rule text:**
> **Reaction** abilities are triggered when an enemy model moves **out of** the reacting model's 2" engagement zone. The Reaction is resolved immediately, before the moving model continues. A model may use a Reaction ability **and** make an Opportunity Attack in response to the same trigger (if it has both available), but each is limited to once per round.

### 12. Dispel Expanded to Cover Damage Spells — DECIDED
**[Balance] [Depth]**

Dispel now has two tiers. The existing Dispel stays as-is for Buffs/Debuffs. A new **Counterspell** option covers Instant and Blast spells at a higher Mana cost.

**Revised Section 8.5 text:**

> **Dispel (Buffs/Debuffs):** When an enemy activates a Buff or Debuff ability, you may spend **2 Mana** to attempt a Dispel. Roll a D6: on a **4+**, the ability is canceled (enemy's Mana is still spent). On 1–3, the Dispel fails.
>
> **Counterspell (Instant/Blast):** When an enemy activates an Instant or Blast ability, you may spend **3 Mana** to attempt a Counterspell. Roll a D6: on a **4+**, the spell is canceled before it resolves (enemy's Mana is still spent). On 1–3, the Counterspell fails and the spell goes off as normal.
>
> **Who can Dispel/Counterspell?** Any surviving model with the **Magical** tag may attempt either. Magical Heroes add +1 to the roll. Non-Hero Magical models roll without this bonus.
>
> **No Magical models = no Dispels or Counterspells.** If all your Magical models are destroyed, you lose both abilities for the rest of the game.
>
> **Spell Block vs Counterspell:** If both a Spell Block (2" melee interrupt) and a Counterspell are possible against the same spell, resolve Spell Block first. If Spell Block succeeds, no Counterspell is needed.

**Quick Ref update:**
> - Dispel (Buff/Debuff): 2 Mana, 4+. Counterspell (Instant/Blast): 3 Mana, 4+. Magical Heroes get +1 to both. Requires a surviving Magical model.

### 13. Mana Economy Scaling — DECIDED
**[Balance] [Depth]**

**Decision:** Base Mana scales by battle size, and non-Hero Magical units also generate Mana.

**Revised Section 8.1 Mana Generation:**
> At the start of each turn (Mana Phase), you generate Mana:
>
> **Base Mana (by battle size):**
> | Battle Size | Base Mana |
> |---|---|
> | Skirmish | 2 |
> | Standard | 3 |
> | Large Battle | 4 |
>
> **Hero Bonus:** Each surviving Hero generates **+1 Mana**.
>
> **Magical Unit Bonus:** Each surviving non-Hero model with the **Magical** keyword generates **+1 Mana**.
>
> **Control Points:** Some scenarios grant +1 Mana per controlled objective.
>
> **Mana Cap:** Maximum **10 Mana** at any time. Excess is lost.

**Why this works:** Skirmish armies (fewer models, fewer Magical units) generate less but also need less — smaller games have fewer abilities flying around. Large armies generate more but have more models competing for that Mana. Non-Hero Magical units generating Mana makes them valuable beyond just enabling Dispel — losing your Spell Breakers hurts your economy, not just your counterplay. It also creates interesting army-building tension: do you take more Magical units for Mana income, or more combat units for raw power?

**Example generation per turn:**
> - Skirmish (1 Hero, 1 Magical unit): 2 + 1 + 1 = **4 Mana/turn**
> - Standard (2 Heroes, 2 Magical units): 3 + 2 + 2 = **7 Mana/turn**
> - Large (3 Heroes, 3 Magical units): 4 + 3 + 3 = **10 Mana/turn** (hits cap immediately)

**Note:** The Large Battle example hits the cap with max Magical investment. This is intentional — it means not every army maxes out, and losing Magical models in large games creates real Mana pressure. The cap may need adjusting to 12 after playtesting if large games feel too constrained.

### 14. Summoned Unit Rules — DECIDED
**[Edge Case]**

**Decision:** Summoned units follow these rules:

**Revised Summon rules (add to Section 4.6 under Summon keyword):**
> **Summoning a unit:**
> - Summoning is an **ability** and follows normal ability rules (one ability per activation, costs Mana as listed on the unit card).
> - Summoning **may end the summoner's activation** (if the ability specifies it does). Check the summoner's unit card — some summon abilities allow continued action, others end the activation.
>
> **Summoned unit behavior:**
> - Summoned units **count as activations**. They are added to the activation pool and activate normally during the Activation Phase. This means summoning gives you additional activations — a real tactical advantage.
> - Summoned units last for **[X] rounds** as defined by the summoner's Summon [X] keyword, then are removed.
> - If the summoner is destroyed, all their summoned units are immediately removed (as per Section 7.8 Destroyed triggers).
>
> **Objectives:** Whether a summoned unit can control an objective is **defined on the summoned unit's card**. Not all summons are substantial enough to hold ground — a pack of spirit wolves might not, but a summoned Infernal might.
>
> **Morale:** Summoned units being removed (either by expiring or summoner death) do **not** trigger Morale tests for nearby friendlies. They were temporary — allies expected them to vanish. Summoned units being *destroyed in combat* (reduced to 0 Wounds) **do** trigger Morale tests as normal.
>
> **Resummon:** A summoner may cast a new summon ability after their previous summoned units have expired or been destroyed. They cannot have more active summons than their unit card allows.

---

## MOVEMENT & TERRAIN

### 15. Hill Movement — DECIDED
**[Clarity]**

~~"Measure along the slope" is impractical.~~

**Decision:** Hills cost **-1 MOV** (reduce the model's remaining movement by 1" when moving onto or across a hill). Measure horizontal distance normally — no slope measuring. Simple, consistent, and gives hills a minor movement cost without being punishing.

**Revised rule text for Section 3.2 (Hills):**
> **Hills / Elevated Ground:** Units on higher ground gain +1 to ranged Attack rolls against lower targets. Moving onto or across a hill costs **1" of extra movement** (effectively -1 MOV). **Melee on hills** — see Section 7.5 for detailed hill combat rules.

**Update Section 7.7 notes:** Remove *"Hills have no movement penalty — measure the actual distance along the slope."* Replace with *"Moving onto or across a hill costs 1" of extra movement."*

### 16. Forest Boundaries — DECIDED
**[Clarity]**

~~When is a model "inside" a forest?~~

**Decision:** Forests are defined by **physical markers on the ground** (e.g., a felt cutout, a drawn boundary, or placed marker stones). A model is inside the forest if more than half its base is within the marked boundary. No ambiguity — the markers are the edges.

**Add to Section 3.2 (Forests):**
> *Forest boundaries are defined by markers placed on the table before the game. A model is considered "inside" a forest if more than half its base is within the marked boundary.*

### 17. Ruins — "Behind" vs "Inside" — RESOLVED
**[Clarity]**

Same marker approach as forests. Ruins boundaries are marked on the table. A model behind/inside ruins gains Hard Cover against attacks that pass through the ruin terrain. Directional — cover depends on whether the terrain is between attacker and defender.

### 18. ~~No Rules for Buildings / Garrisoning~~ — NOT ADDING
**[Depth]**

**Decision:** No garrison or building entry rules. Buildings are purely visual/impassable terrain or treated as ruins. Keeps the game streamlined.

### 19. Flying Keyword — DECIDED
**[Edge Case]**

**Decision:** Fly keyword has been drafted as a separate document. See `fly-keyword-draft.md`. All specific unit references (Gryphon Riders, etc.) removed from core rules — those belong in Army Books.

---

## MORALE & SCENARIOS

### 20. Morale — "Friendly Model Destroyed Within 6"" Is Too Frequent
**[Balance]**

Every model within 6" of a destroyed friendly must test Morale. In a typical game with 9-12 models per side on a 30"×21" table, most of your army will be within 6" of *something* that dies. This means once casualties start, you could be rolling Morale for 5-8 models every single turn. That's a lot of dice rolling that slows the game down, and the cascading Waver/Rout effects can create unfun death spirals.

**Suggestion — Tighten the Trigger:** Change to "within 3" of a destroyed friendly" (only nearby models are shaken) or limit it to "a friendly model of the same or higher tier was destroyed within 6"" (grunts don't panic when another grunt dies across the field, but they notice when the Kodo Beast falls). This preserves the drama without creating a Morale cascade every turn.

### 21. Waver Is Punishing but Bland
**[Depth] [Balance]**

A Wavering model can only Hold → Shoot or Fight (Hold Ground). For a melee-only model with no ranged weapon, Wavering means it literally does nothing useful — it can fight if already engaged, but can't move to *become* engaged. A Wavering melee model in the open is a sitting duck for a full turn.

**Suggestion:** Allow Wavering models to also **Move (but not Rush, Charge, or Combat Withdraw)**. This lets them reposition or fall back toward allies without being completely helpless. They still can't be aggressive, but they aren't rooted in place.

### 22. Rout — Fleeing, Not Instant Removal — DECIDED
**[Depth]**

~~Rout = removed from play is anticlimactic.~~

**Decision:** Routing models **flee** instead of being instantly removed.

**Revised Section 10.3 Rout result:**
> **Fail by 3+: Rout.** The model immediately flees — it moves its **full MOV directly toward its own deployment edge** (this move does not count as an activation). Enemy models it passes within 2" may make Opportunity Attacks. If the fleeing model reaches the table edge, it is removed from play. If it survives to the next Morale Phase, it may test Morale again — on a **pass**, it Rallies (returns to Wavering status and activates normally next round). On a **fail**, it continues fleeing toward the table edge.
>
> *Routing models cannot activate normally — they do not get an activation during the Activation Phase. Their only action is the flee move during the Morale Phase.*

### 23. Hero Morale — DECIDED (REVISED)
**[Balance]**

**Decision:** Heroes keep Morale 9, but **Command Aura does not apply to the Hero itself** — Heroes don't inspire themselves. This means Heroes pass on ~83% without help, but can be pressured by Fear (-1 → ~72%), low Wounds (-1 → ~72%), or both stacking (-2 → ~58%). Meaningful pressure without making Heroes fragile.

**Revised Section 9.1 (Command Aura) text:**
> Heroes have a **Command Aura** of 6" — friendly models within 6" may reroll one failed Morale test per turn. **The Hero's own Command Aura does not apply to itself** — a Hero cannot reroll its own Morale tests using its own aura (though it can benefit from a *different* Hero's Command Aura).

### 24. Scenario 2 — Objectives Are Binary and Uncontested
**[Balance] [Depth]**

"A player controls an objective if they have a unit within 3" and the enemy does not." This means a single model standing on a point controls it regardless of how many enemy models are nearby — as long as one enemy is also within 3", *nobody* controls it. This creates situations where sending a single disposable unit to contest an objective is always correct.

**Suggestion — Contested Objectives:** Control could require having **more models within 3"** than your opponent (majority control). This encourages committing forces to objectives rather than just sending a single body. Alternatively, keep the current system but add: *"If both players have models within 3", the player with the most models within range controls it. If tied, neither player controls it."*

### 25. Scenario 3 — Assassination Has a Degenerate Strategy
**[Balance]**

In Assassination, each player secretly nominates a Warlord. The optimal strategy is to nominate your *cheapest, most expendable* Hero as Warlord, keep them hidden in the back, and play a normal game of attrition. This undermines the intended drama.

**Suggestion:** Require the Warlord to be the player's **most expensive Hero** (or require the Warlord to have been within 12" of an enemy model at least once by Round 3, or they are "revealed" and their opponent may choose which Hero is the Warlord). This forces the Warlord into the fight.

### 26. No Tiebreaker for Annihilation
**[Edge Case]**

"The player who destroyed the most enemy points wins." What if both players destroy the exact same points value? This is unlikely but possible.

**Suggestion:** Add: *"If tied on points destroyed, the player with the most surviving Wounds across all models wins. If still tied, the game is a draw."*

---

## GENERAL / CROSS-CUTTING ISSUES

### 27. Destroyed Model Rules — DECIDED
**[Edge Case] [Depth]**

**Decision:** Add a "Destruction" section covering all four triggers:

**Revised rule text — new Section 7.8 "When a Model Is Destroyed":**
> When a model is reduced to 0 Wounds, it is **destroyed**. Resolve the following immediately:
>
> 1. **Engagement zone vanishes.** The destroyed model's 2" engagement zone ceases to exist immediately. Any models that were engaged with it are no longer engaged (they are free to act normally on their next activation).
>
> 2. **Summoned units removed.** If the destroyed model had the **Summon** keyword and had active summoned units on the battlefield, all of its summoned units are **immediately removed** from play.
>
> 3. **Morale trigger.** The destruction triggers Morale tests for friendly models within 6" during the next Morale Phase (as per Section 10.1).
>
> 4. **On-death effects.** Some models have abilities that trigger "when this model is destroyed" (e.g., an explosion, a curse, a death rattle). These are resolved **immediately** after the model is destroyed, before play continues. On-death effects are defined on the unit's card.
>
> After all destruction effects are resolved, remove the model from the battlefield.

### 28. Line of Sight — DECIDED
**[Clarity]**

**Decision:** LOS is straightforward. Draw a line from the attacker's base to any visible part of the target model. If terrain fully blocks the line, no shot. Base sizes are defined per unit on the unit card — larger models are easier to see, smaller ones easier to hide behind terrain.

**Revised Section 7.1 LOS text:**
> **Line of Sight (LOS):** Draw an imaginary line from the attacking model's **base** to any **visible part** of the target model. If terrain completely blocks the line, there is no LOS and the attack cannot be made. If any part of the target is visible, LOS is established — but the target may benefit from Cover if terrain partially obscures it (see Terrain Types, Section 3.2).
>
> **Base sizes** are defined on each unit's card. Larger models (mounted units, monsters) are easier to spot behind terrain; smaller infantry can hide more effectively.
>
> Other models (friendly or enemy) do **not** block Line of Sight.

### 29. No Rules for Model Bases / Size Categories
**[Clarity] [Depth]**

The rules mention 28-32mm scale minis but never define base sizes. Base size matters enormously — a model on a 40mm base has a much larger engagement zone footprint than a 25mm base model. And there's no Small/Medium/Large/Huge size category, which matters for LOS, movement through gaps, and terrain interactions.

**Suggestion:** Define base size standards (e.g., Baseline: 25mm round, Mounted: 25×50mm oval, Elite Monsters: 40mm round, Large Monsters: 50mm round) and add a **Size** stat or tag (Small, Medium, Large) to unit profiles. This also future-proofs the rules for monsters that should block LOS, occupy more space, etc.

### 30. Ability Targeting — No Range/LOS Framework
**[Clarity] [Depth]**

Section 8 describes ability *types* (Instant, Buff, Debuff, Reaction, Blast) but provides no framework for how non-Blast abilities target. Do Buffs require LOS? What's the default range? Can you Buff a model across the entire map? The rules say "affects friendly units within range" — but what range?

**Suggestion:** Each ability on a unit card should specify its range and targeting. But the core rules should provide defaults: *"Unless stated otherwise, abilities require Line of Sight and have a maximum range of 12". Buff/Aura abilities that affect 'friendly models within X inches' are measured from the caster and do not require LOS."*

### 31. Round 1 Alpha Strike — No Protection
**[Balance]**

With deployment zones only 3-5" deep on a 21-30" table, the gap between armies is 11-20". A fast unit (MOV 8+) can Rush 16" on turn 1 and be in charge range by turn 2. Ranged units can shoot immediately. There's no "first turn protection" — the player who activates first can potentially cripple a key model before it ever acts.

**Suggestion:** Consider a "Cautious Advance" rule for Round 1: *"During Round 1, models may not Charge, and ranged attacks suffer an additional -1 to hit."* This represents the fog of war as armies close the distance, and prevents feel-bad moments where a player loses a Hero before it activates. Alternatively, limit Round 1 to Move and Rush actions only.

### 32. Terrain Placement — DECIDED
**[Depth]**

~~No restrictions on terrain placement.~~

**Decision:** Terrain placement uses **set maps** — pre-designed terrain layouts provided with each scenario or battle size. Players don't alternate placing terrain; they use the prescribed layout. Details to be clarified in scenario/map supplements.

---

## SUMMARY — Status Tracker

**DECIDED (rule text drafted):**
- ✅ **A.** No defensive strikes — attacker only (Major Change)
- ✅ **B.** Initiative repurposed as dodge — defender's INI higher = -1 to hit (Major Change)
- ✅ **C.** Taunt reworked — mark enemy within 6", they must charge/fight tank next activation (Major Change)
- ✅ **#1** Dogpile — superseded by no defensive strikes
- ✅ **#2** Heavy Weapon -1 INI
- ✅ **#6** Simultaneous death — superseded by no defensive strikes
- ✅ **#10** Abilities — one per activation, Spell (Shoot) replaces ranged attack (REVISED)
- ✅ **#11** Reactions — trigger when enemy leaves engagement range
- ✅ **#12** Dispel expanded — Counterspell for Instant/Blast at 3 Mana, 4+
- ✅ **#15** Hills — -1 MOV, measure flat
- ✅ **#16** Forests — ground markers define boundary
- ✅ **#17** Ruins — marker approach, directional cover
- ✅ **#18** Buildings — not adding garrison rules
- ✅ **#19** Flying — Fly keyword drafted (separate document)
- ✅ **#22** Rout — fleeing toward deployment edge, can rally
- ✅ **#23** Hero Morale — keep at 9, Command Aura doesn't apply to self (REVISED)
- ✅ **#27** Destroyed triggers — engagement zone vanishes, summons removed, Morale triggered, on-death effects allowed
- ✅ **#32** Terrain placement — set maps, clarified later

**DEFERRED (will be clear when units exist):**
- ⏸️ **#3** Ranged STR & Armor Piercing clarity
- ⏸️ **#4** Decisive Blow stacking clarity
- ⏸️ **#5** Cleave wound roll clarity
- ⏸️ **#7** Opportunity Attack balance
- ⏸️ **#8** Fight → Shoot restrictions
- ⏸️ **#9** Flanking + ranged interaction

**STILL OPEN:**
- ❓ **#13** Mana economy doesn't scale
- ❓ **#14** Summoned unit edge cases
- ❓ **#20** Morale cascade too frequent
- ❓ **#21** Waver too punishing for melee models
- ❓ **#24** Objectives — binary/uncontested
- ❓ **#25** Assassination degenerate strategy
- ❓ **#26** Annihilation tiebreaker
- ❓ **#28** Line of Sight too vague
- ❓ **#29** No base size / size categories
- ❓ **#30** Ability targeting — no range/LOS framework
- ❓ **#31** Round 1 alpha strike

**NOTE:** All references to specific units, weapons, and abilities (Blademasters, Gryphon Riders, Spell Breakers, etc.) should be removed from the core rules. Unit-specific content belongs in the Army Books, which haven't been created yet. The core rules should only describe mechanics, keywords, and systems.
