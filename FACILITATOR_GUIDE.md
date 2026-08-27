# Facilitator guide — keep out of the participant handout

## Before the session

1. Confirm `npm install`, `npm test`, and `npm run lint` work on the room network.
2. Give each team a fresh copy of the repository.
3. Ask teams not to open `facilitator/` until the debugging phase.
4. Put the six review questions from the README on screen throughout the lab.

## Facilitation cues

- At 10 minutes: collect an architecture explanation before allowing edits.
- At 20 minutes: require an explicit plan and default/migration decision.
- At 45 minutes: stop feature work and inject the bug, even if the feature is incomplete.
- During AI review: require a fresh session/context. Give it only requirements, diff, and check output.
- During human review: have both AI sessions closed or ignored for ten minutes.

## Bug injection

Apply the provided patch from the repository root:

```bash
git apply facilitator/duplicate-id-bug.patch
```

If teams are not using Git, make the one-line change shown in the patch manually. Tell them only:

> A user reports that after deleting one starter task, adding a task, and later deleting that new task, an unrelated task can disappear too. Reproduce, diagnose, add a regression test, and fix it. Do not assume the report is perfectly worded.

Why it works: the injected ID generator derives identity from the current list length. Deleting a task makes a later ID reusable, so two tasks can share an ID. React key reuse and ID-based deletion then produce confusing symptoms. The implementation looks reasonable at a glance and often escapes happy-path tests.

If a team gets stuck, reveal hints one at a time:

1. Inspect the task list after each operation, not only the screen.
2. Compare stable identity with array size.
3. Try the sequence delete → create → delete.

The clean fix is to restore collision-resistant IDs (for example `crypto.randomUUID()`) and add a regression test around uniqueness after deletion and creation.

## Scoring (20 points)

| Area | Points | What earns full credit |
| --- | ---: | --- |
| Correctness | 5 | Level 1 works; baseline behavior preserved |
| Engineering judgment | 5 | Small design, explicit assumptions, useful tests |
| Debugging | 4 | Evidence-based root cause plus regression test |
| Review quality | 4 | AI finding dispositions plus a human-only finding |
| Explanation | 2 | Team can explain failure and final design clearly |

Do not award presentation polish more points than correctness.

## 60-second closing competition

Ask: **“What was the most convincing mistake your AI made?”**

Reward specificity, subtlety, and detection method—not the flashiest feature.
