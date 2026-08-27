# Taskroom: Advanced AI Coding Agent Lab

This repository is a deliberately small, unfamiliar codebase for an advanced vibecoding session. The app currently creates and deletes student tasks. Your job is to extend it while treating AI as an engineering collaborator—not an autocomplete machine.

## Success criteria

By the end, your team must have used AI to:

1. explain an unfamiliar codebase;
2. write an implementation plan before editing;
3. implement a meaningful feature;
4. diagnose a failure introduced by the facilitator;
5. review generated code in a separate AI session;
6. make a human-only review finding; and
7. record one convincing thing the AI got wrong.

Passing tests are necessary, but not sufficient. Every teammate should be able to explain the code that ships.

## Start here

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal. Before changing anything, run:

```bash
npm test
npm run lint
```

## The challenge

### Level 1 — Feature (required)

Add all of the following:

- a priority on every task: low, medium, or high;
- an optional deadline;
- filtering by priority;
- a clear visual state for overdue tasks; and
- tests for the new domain behavior.

Decide how old tasks receive a default priority. Write that decision down.

### Level 2 — Architecture (choose one)

Make tasks survive a refresh without breaking create or delete:

- local storage (recommended if time is short),
- a small local API/backend, or
- a hosted database such as Supabase or Firebase.

Document the failure behavior. What happens when storage is unavailable, corrupt, or slow?

### Level 3 — Agentic workflow (required process)

Use separate AI contexts for distinct roles:

```text
Human → Planner → Implementer → Test/lint → Reviewer
                  ↑                         ↓
                  └──────── fixes ──────────┘
                              ↓
                        Human approval
```

Do not let the reviewer inherit the implementer’s reasoning. Give it the diff, requirements, and test output, then ask it to find correctness, accessibility, maintainability, and unnecessary-complexity issues.

## Session plan (95–105 minutes)

| Phase | Time | Required artifact |
| --- | ---: | --- |
| Reconnaissance | 10 min | Architecture notes and risky areas |
| Planning | 10 min | Ordered plan with tests and assumptions |
| Implementation | 25 min | Level 1 working; Level 2 started |
| Injected bug | 15 min | Diagnosis with evidence, then fix |
| AI review | 15 min | Reviewer findings and dispositions |
| Human review | 10 min | One issue both AI sessions missed |
| Demo | 10–15 min | Feature, failure, and lesson |

## The rule: explain every major change

Your team may only accept a change if someone can answer:

- Why is this file changing?
- What does this function do?
- What assumptions did the agent make?
- How could this break?
- Did the agent introduce unnecessary complexity?
- How would you test it?

Record answers in [`LAB_NOTES.md`](./LAB_NOTES.md). Short, specific answers beat polished essays.

## Suggested first prompts

Reconnaissance:

> Inspect this repository without editing it. Explain the runtime architecture, state flow, domain rules, test strategy, and the smallest set of files likely to change for priority, deadlines, filtering, and persistence. Cite exact files and call out uncertainty.

Planning:

> Write an implementation plan only. Include data-model changes, migration/default behavior for existing tasks, UI states, persistence failure modes, and tests. Prefer the smallest coherent design. Do not edit files yet.

Review:

> Review this diff against the lab requirements. Look for incorrect assumptions, state/data migration bugs, date and timezone problems, accessibility regressions, stale state, data loss, weak tests, and unnecessary abstraction. Rank findings by severity and cite exact lines. Do not rewrite the feature.

## Definition of done

- `npm test` and `npm run lint` pass.
- Create and delete still work.
- Level 1 requirements work by keyboard and mouse.
- Refresh behavior matches your documented Level 2 decision.
- Reviewer feedback is either fixed or explicitly rejected with a reason.
- `LAB_NOTES.md` contains at least one AI mistake and one human-only finding.
- Every teammate can demo one failure and explain its root cause.

Final lightning round: **What was the most convincing mistake your AI made?** You have 60 seconds.
