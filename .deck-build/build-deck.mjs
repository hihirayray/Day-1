import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT = "/Users/raytsai/Desktop/VibeCoding Lab/Day 1/Advanced_AI_Coding_Agent_Lab.pptx";
const PREVIEW = "/Users/raytsai/Desktop/VibeCoding Lab/Day 1/taskroom-preview.png";
const W = 1280;
const H = 720;
const C = {
  canvas: "#FFFFFF",
  ink: "#151A17",
  muted: "#666E69",
  panel: "#F0F1EC",
  rule: "#BFC4BE",
  forest: "#174F3C",
  lime: "#CBF36B",
  orange: "#F07545",
  softGreen: "#EAF2E8",
};
const FONT = "Helvetica Neue";

function addText(slide, text, x, y, w, h, size = 24, opts = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name: opts.name,
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    fontSize: size,
    typeface: FONT,
    color: opts.color ?? C.ink,
    bold: opts.bold ?? false,
    alignment: opts.align ?? "left",
    verticalAlignment: opts.valign ?? "top",
    autoFit: opts.autoFit ?? "shrinkText",
    insets: opts.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return shape;
}

function addBox(slide, x, y, w, h, fill = C.panel, opts = {}) {
  return slide.shapes.add({
    geometry: opts.geometry ?? "rect",
    name: opts.name,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: opts.line ?? { style: "solid", fill: opts.lineColor ?? "none", width: opts.lineWidth ?? 0 },
    borderRadius: opts.radius,
  });
}

function addRule(slide, x, y, w, color = C.rule, width = 1) {
  return slide.shapes.add({
    geometry: "line",
    position: { left: x, top: y, width: w, height: 0 },
    fill: "none",
    line: { style: "solid", fill: color, width },
  });
}

function addHeader(slide, title, n, eyebrow = "ADVANCED TRACK") {
  addText(slide, eyebrow, 48, 34, 480, 26, 15, { bold: true, color: C.forest });
  addText(slide, title, 48, 72, 1120, 74, 44, { bold: true });
  addText(slide, String(n).padStart(2, "0"), 1174, 674, 54, 20, 14, { align: "right", color: C.muted });
}

function addNotes(slide, talk, timing) {
  slide.speakerNotes.textFrame.setText(`${timing ? `Timing: ${timing}\n\n` : ""}${talk}\n\n[Sources]\n- Internal workshop brief and local Taskroom codebase; no external sources.`);
  slide.speakerNotes.setVisible(true);
}

function addBulletList(slide, items, x, y, w, lineHeight = 58, accent = C.forest) {
  items.forEach((item, i) => {
    const yy = y + i * lineHeight;
    addBox(slide, x, yy + 7, 13, 13, accent, { geometry: "ellipse" });
    addText(slide, item, x + 30, yy, w - 30, lineHeight - 4, 23, { color: C.ink });
  });
}

const p = Presentation.create({ slideSize: { width: W, height: H } });

// 1 — Cover, Codex Grid slide-01-inspired sparse stacked type.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addText(s, "VIBECODING LAB · ADVANCED TRACK", 48, 40, 620, 28, 15, { bold: true, color: C.forest });
  addText(s, "Build an AI coding\nagent workflow", 48, 175, 980, 210, 70, { bold: true });
  addRule(s, 48, 472, 1180, C.ink, 2);
  addText(s, "Inspect → plan → implement → debug → review → defend", 48, 506, 980, 52, 26, { color: C.muted });
  addText(s, "Taskroom starter project", 48, 626, 500, 28, 18, { bold: true, color: C.forest });
  addNotes(s, "Open by setting the expectation: this is not a prompting contest. The output is working software plus evidence that the team understood and challenged what the AI produced.", "2 minutes");
}

// 2 — Central premise.
{
  const s = p.slides.add();
  s.background.fill = C.forest;
  addText(s, "TODAY’S STANDARD", 48, 42, 400, 26, 15, { bold: true, color: C.lime });
  addText(s, "Fast code is not the goal.", 48, 150, 1110, 90, 58, { bold: true, color: "#FFFFFF" });
  addText(s, "Controlled, explainable, tested code is.", 48, 270, 1090, 150, 58, { bold: true, color: C.lime });
  addText(s, "You will be rewarded for finding subtle failure—not for shipping the flashiest feature.", 48, 546, 1040, 72, 24, { color: "#DDE8E2" });
  addText(s, "02", 1174, 674, 54, 20, 14, { align: "right", color: "#A9C1B6" });
  addNotes(s, "Ask for a show of hands: who has accepted AI-generated code because the demo worked once? Use that tension to frame the lab around control and evidence.", "2 minutes");
}

// 3 — Baseline with real app screenshot.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "Your starting point is intentionally incomplete", 3, "THE CODEBASE");
  const bytes = await fs.readFile(PREVIEW);
  s.images.add({
    blob: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    contentType: "image/png",
    alt: "Taskroom student task dashboard starter app",
    fit: "cover",
    position: { left: 48, top: 168, width: 730, height: 455 },
    geometry: "roundRect",
    borderRadius: 14,
  });
  addText(s, "Already works", 826, 180, 330, 36, 24, { bold: true, color: C.forest });
  addBulletList(s, ["Create a task", "Delete a task", "Validate task titles"], 826, 232, 360, 52);
  addText(s, "Missing on purpose", 826, 418, 330, 36, 24, { bold: true, color: C.orange });
  addText(s, "Priority · deadlines · filters\npersistence · overdue states", 826, 466, 350, 96, 22, { color: C.muted });
  addNotes(s, "Point participants to README.md, not to individual source files. Their first job is discovering the architecture. Confirm the baseline checks pass before teams begin.", "3 minutes");
}

// 4 — Session timeline, Codex Grid timeline reference.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "The work moves through seven engineering gates", 4, "TODAY’S RUN");
  addRule(s, 72, 354, 1136, C.ink, 2);
  const phases = [
    ["10", "Inspect", "Architecture map"],
    ["10", "Plan", "Tests + assumptions"],
    ["25", "Build", "Level 1 feature"],
    ["15", "Debug", "Injected failure"],
    ["15", "AI review", "Fresh context"],
    ["10", "Human", "Find the miss"],
    ["15", "Demo", "Defend choices"],
  ];
  phases.forEach((phase, i) => {
    const x = 72 + i * 162;
    addBox(s, x, 345, 18, 18, i === 3 ? C.orange : C.ink, { geometry: "ellipse" });
    addText(s, `${phase[0]} min`, x, 286, 130, 28, 18, { bold: true, color: i === 3 ? C.orange : C.forest });
    addText(s, phase[1], x, 390, 140, 34, 23, { bold: true });
    addText(s, phase[2], x, 438, 138, 70, 17, { color: C.muted });
  });
  addText(s, "Plan before code. Review after tests. Human approval stays last.", 72, 576, 1000, 52, 28, { bold: true });
  addNotes(s, "Keep the clock visible. At minute 45, stop feature work and begin debugging even if some teams are incomplete. The constraint is part of the exercise.", "2 minutes");
}

// 5 — Reconnaissance.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "Inspect the system before proposing changes", 5, "GATE 1 · RECONNAISSANCE");
  addText(s, "Ask your agent to explain", 48, 176, 430, 40, 25, { bold: true, color: C.forest });
  addBulletList(s, ["Runtime architecture", "State and data flow", "Existing domain rules", "Test strategy", "Smallest likely change surface"], 48, 238, 500, 62);
  addBox(s, 664, 172, 544, 388, C.panel);
  addText(s, "Your artifact", 704, 210, 420, 38, 24, { bold: true });
  addText(s, "An architecture explanation with exact file references, risky areas, and explicit uncertainty.", 704, 274, 430, 112, 28, { bold: true });
  addRule(s, 704, 420, 420, C.rule, 1);
  addText(s, "No edits yet.", 704, 458, 420, 48, 24, { bold: true, color: C.orange });
  addNotes(s, "Do not accept a tour that only lists filenames. Ask teams to explain which component owns state and where domain validation lives. Require cited files.", "10 minutes");
}

// 6 — Planning.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "A useful plan names decisions—not just steps", 6, "GATE 2 · PLANNING");
  const cols = [
    ["Data", "Priority type\nDeadline representation\nDefaults for old tasks"],
    ["Behavior", "Filter semantics\nOverdue definition\nEmpty and error states"],
    ["Evidence", "Unit tests\nFailure modes\nRegression coverage"],
  ];
  cols.forEach((col, i) => {
    const x = 48 + i * 402;
    addText(s, `0${i + 1}`, x, 196, 70, 54, 34, { bold: true, color: C.forest });
    addText(s, col[0], x, 270, 330, 40, 28, { bold: true });
    addText(s, col[1], x, 332, 330, 154, 22, { color: C.muted });
  });
  addBox(s, 48, 548, 1160, 72, C.lime);
  addText(s, "The plan must include what happens when storage is missing, corrupt, or slow.", 78, 568, 1090, 38, 24, { bold: true });
  addNotes(s, "Before allowing edits, check that each team has made a default-priority decision and identified a persistence failure mode. A list of files without tradeoffs is not a plan.", "10 minutes");
}

// 7 — Level 1.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "Level 1: make task urgency visible and usable", 7, "BUILD · FEATURE");
  addText(s, "Required behavior", 48, 178, 420, 36, 24, { bold: true, color: C.forest });
  addBulletList(s, ["Low / medium / high priority", "Optional deadline", "Filter by priority", "Clear overdue state", "Tests for new domain behavior"], 48, 238, 520, 63);
  addText(s, "The trap", 710, 178, 420, 36, 24, { bold: true, color: C.orange });
  addText(s, "A feature can look right and still be wrong at the boundaries.", 710, 240, 450, 112, 34, { bold: true });
  addRule(s, 710, 392, 430, C.rule, 1);
  addText(s, "Probe empty values, long titles, deadline equality, timezone assumptions, and deleting while filtered.", 710, 430, 450, 132, 22, { color: C.muted });
  addNotes(s, "Encourage a thin vertical slice before styling. If teams disagree about overdue semantics, require them to document the chosen definition and test it.", "Part of 25-minute build");
}

// 8 — Level 2.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "Level 2: persistence is a failure-mode exercise", 8, "BUILD · ARCHITECTURE");
  addText(s, "Choose one", 48, 176, 250, 34, 24, { bold: true, color: C.forest });
  const choices = [
    ["Local storage", "Fastest route. Handle parse errors and stale schema."],
    ["Local API", "Define async loading, writes, and server failure."],
    ["Hosted database", "Handle credentials, latency, and unavailable network."],
  ];
  choices.forEach((c, i) => {
    const y = 236 + i * 124;
    addText(s, c[0], 48, y, 300, 34, 27, { bold: true });
    addText(s, c[1], 366, y, 500, 62, 21, { color: C.muted });
    addRule(s, 48, y + 84, 812, C.rule, 1);
  });
  addBox(s, 930, 176, 278, 414, C.forest);
  addText(s, "Refresh is\nnot enough.", 962, 220, 220, 100, 38, { bold: true, color: C.lime });
  addText(s, "Explain data ownership, migration, and degraded behavior.", 962, 360, 214, 156, 23, { color: "#FFFFFF" });
  addNotes(s, "Level 2 is stretch work if time is short. Local storage is acceptable, but teams must still define corruption and migration behavior. Avoid letting hosted setup consume the whole lab.", "Part of 25-minute build");
}

// 9 — Agentic workflow diagram. Connectors are created before nodes.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "Level 3: separate roles so review has teeth", 9, "BUILD · AGENTIC WORKFLOW");
  const xs = [62, 246, 430, 614, 798, 982];
  for (let i = 0; i < xs.length - 1; i++) {
    s.shapes.add({
      geometry: "rightArrow",
      position: { left: xs[i] + 135, top: 326, width: 48, height: 24 },
      fill: C.rule,
      line: { style: "solid", fill: "none", width: 0 },
    });
  }
  const roles = ["Human", "Planner", "Implement", "Test / lint", "Reviewer", "Fix + approve"];
  roles.forEach((role, i) => {
    addBox(s, xs[i], 270, 136, 136, i === 4 ? C.lime : i === 0 || i === 5 ? C.forest : C.panel, { radius: 14 });
    addText(s, role, xs[i] + 12, 308, 112, 60, 21, { bold: true, align: "center", valign: "middle", color: i === 0 || i === 5 ? "#FFFFFF" : C.ink });
  });
  addText(s, "Fresh context", 806, 438, 120, 26, 16, { bold: true, color: C.orange, align: "center" });
  addText(s, "Give the reviewer requirements + diff + check output—not the implementer’s reasoning.", 164, 526, 950, 68, 28, { bold: true, align: "center" });
  addNotes(s, "Teams may use any AI coding tool. The process requirement is role separation. A second tab with copied reasoning is weaker than a reviewer receiving only evidence.", "2 minutes");
}

// 10 — Quality gate questions.
{
  const s = p.slides.add();
  s.background.fill = C.forest;
  addText(s, "THE NON-NEGOTIABLE RULE", 48, 42, 480, 26, 15, { bold: true, color: C.lime });
  addText(s, "Do not accept code you cannot defend.", 48, 92, 1120, 82, 46, { bold: true, color: "#FFFFFF" });
  const qs = [
    "Why is this file changing?",
    "What does this function do?",
    "What assumptions did the agent make?",
    "How could this break?",
    "Is there unnecessary complexity?",
    "How would you test it?",
  ];
  qs.forEach((q, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    addText(s, `0${i + 1}`, 48 + col * 610, 226 + row * 120, 54, 32, 18, { bold: true, color: C.lime });
    addText(s, q, 112 + col * 610, 218 + row * 120, 500, 58, 25, { bold: true, color: "#FFFFFF" });
  });
  addText(s, "10", 1174, 674, 54, 20, 14, { align: "right", color: "#A9C1B6" });
  addNotes(s, "Keep this slide visible during implementation. Randomly ask a teammate—not only the person driving—to answer one question about a major change.", "Use throughout");
}

// 11 — Debug prompt, solution only in notes.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "Deleting one task can remove another", 11, "GATE 4 · DEBUGGING");
  addBox(s, 48, 174, 1160, 166, C.panel);
  addText(s, "Reported sequence", 82, 204, 300, 32, 21, { bold: true, color: C.orange });
  addText(s, "Delete a starter task → add a new task → later delete the new task", 82, 254, 1040, 48, 29, { bold: true });
  const steps = [
    ["1", "Reproduce", "Do not trust the wording."],
    ["2", "Collect evidence", "Inspect identity and state."],
    ["3", "Explain root cause", "Name the broken invariant."],
    ["4", "Add regression test", "Then fix the code."],
  ];
  steps.forEach((step, i) => {
    const x = 48 + i * 290;
    addText(s, step[0], x, 404, 46, 44, 31, { bold: true, color: C.forest });
    addText(s, step[1], x + 54, 404, 210, 36, 23, { bold: true });
    addText(s, step[2], x + 54, 458, 202, 62, 18, { color: C.muted });
  });
  addNotes(s, "Apply facilitator/duplicate-id-bug.patch before showing this slide. The injected generator uses tasks.length + 1. After deletion, IDs can be reused; duplicate IDs cause React key confusion and ID-based deletion removes both matching records. Reveal hints only as needed: inspect state after each operation; compare identity with list size; try delete → create → delete. Require a regression test before the fix.", "15 minutes");
}

// 12 — Review protocol.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "The second AI reviews evidence, not intent", 12, "GATE 5 · AI REVIEW");
  addText(s, "Give the reviewer", 48, 182, 470, 36, 24, { bold: true, color: C.forest });
  addBulletList(s, ["Requirements", "Final diff", "Test + lint output", "Known assumptions"], 48, 242, 450, 66);
  addText(s, "Ask it to hunt", 668, 182, 470, 36, 24, { bold: true, color: C.orange });
  addBulletList(s, ["Correctness gaps", "Date / timezone errors", "Accessibility regressions", "Data loss and stale state", "Weak tests or needless abstraction"], 668, 242, 500, 60, C.orange);
  addText(s, "Every finding gets fixed—or rejected with a reason.", 48, 592, 1080, 42, 27, { bold: true });
  addNotes(s, "Require a fresh AI context. Teams should write dispositions in LAB_NOTES.md. A confident review with no cited lines is not enough.", "15 minutes");
}

// 13 — Human review + demo.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addHeader(s, "Close the AI tabs. Now find what both missed.", 13, "GATES 6–7 · HUMAN REVIEW + DEMO");
  addBox(s, 48, 174, 530, 374, C.panel);
  addText(s, "Human-only review", 82, 210, 430, 38, 26, { bold: true });
  addText(s, "Read the diff. Exercise edge cases. Challenge defaults. Look for needless abstractions and behavior no test proves.", 82, 276, 422, 166, 25, { color: C.muted });
  addText(s, "Record one issue both AIs missed.", 82, 466, 422, 44, 22, { bold: true, color: C.orange });
  addText(s, "Demo in 3 moves", 664, 186, 410, 38, 26, { bold: true, color: C.forest });
  const demo = ["Show the feature", "Recreate the failure", "Defend the final design"];
  demo.forEach((d, i) => {
    addText(s, String(i + 1), 664, 258 + i * 104, 48, 48, 34, { bold: true, color: C.forest });
    addText(s, d, 734, 260 + i * 104, 420, 48, 25, { bold: true });
  });
  addText(s, "Tests passing is the floor—not the presentation.", 664, 570, 500, 42, 22, { color: C.muted });
  addNotes(s, "For the human review, ask teams to ignore both AI sessions for ten minutes. For demos, cut setup narration quickly: feature, failure, engineering judgment.", "10 minutes review + 10–15 minutes demos");
}

// 14 — Closing competition.
{
  const s = p.slides.add();
  s.background.fill = C.canvas;
  addText(s, "FINAL LIGHTNING ROUND", 48, 42, 500, 28, 15, { bold: true, color: C.forest });
  addText(s, "What was the most convincing mistake your AI made?", 48, 142, 1120, 180, 60, { bold: true });
  addBox(s, 48, 404, 170, 94, C.lime);
  addText(s, "60 sec", 48, 424, 170, 48, 34, { bold: true, align: "center" });
  addText(s, "Win on subtlety, specificity, and how you detected it—not presentation polish.", 270, 408, 860, 94, 28, { bold: true });
  addRule(s, 48, 566, 1160, C.ink, 2);
  addText(s, "Advanced vibecoding = control, evaluate, orchestrate.", 48, 596, 980, 44, 25, { color: C.forest, bold: true });
  addText(s, "14", 1174, 674, 54, 20, 14, { align: "right", color: C.muted });
  addNotes(s, "Give each team 60 seconds. Reward the most subtle, convincing failure and the strongest detection method. Close by reinforcing the permanent split: beginners build with AI; advanced participants control, evaluate, and orchestrate AI.", "5–10 minutes");
}

const pptx = await PresentationFile.exportPptx(p);
await pptx.save(OUT);
console.log(`Wrote ${OUT} with ${p.slides.items.length} slides`);
