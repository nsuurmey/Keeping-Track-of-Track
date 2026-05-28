const STORAGE_KEY = "trackMeetState";

const DEFAULT_STATE = {
  version: 1,
  currentIndex: null,
  statuses: {},
  lastAction: null,
};

// ── Storage ────────────────────────────────────────────────────────────────

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private browsing, quota exceeded) — fail silently
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function snapshot(state) {
  return {
    currentIndex: state.currentIndex,
    statuses: { ...state.statuses },
  };
}

function nextActiveIndex(events, statuses, fromIndex) {
  for (let i = fromIndex; i < events.length; i++) {
    const status = statuses[events[i].id] ?? "pending";
    if (status !== "scratched") return i;
  }
  return null;
}

// ── Mutations (pure — return new state, caller must saveState) ─────────────

export function startMeet(state, events) {
  if (state.currentIndex !== null) return state;
  const firstActive = nextActiveIndex(events, state.statuses, 0);
  if (firstActive === null) return state;
  return {
    ...state,
    currentIndex: firstActive,
    statuses: { ...state.statuses, [events[firstActive].id]: "running" },
    lastAction: snapshot(state),
  };
}

export function markComplete(state, events) {
  if (state.currentIndex === null) return state;
  const current = events[state.currentIndex];
  const newStatuses = { ...state.statuses, [current.id]: "done" };
  const nextIndex = nextActiveIndex(events, newStatuses, state.currentIndex + 1);
  if (nextIndex !== null) {
    newStatuses[events[nextIndex].id] = "running";
  }
  return {
    ...state,
    currentIndex: nextIndex,
    statuses: newStatuses,
    lastAction: snapshot(state),
  };
}

export function skipEvent(state, events) {
  if (state.currentIndex === null) return state;
  const current = events[state.currentIndex];
  const newStatuses = { ...state.statuses, [current.id]: "scratched" };
  const nextIndex = nextActiveIndex(events, newStatuses, state.currentIndex + 1);
  if (nextIndex !== null) {
    newStatuses[events[nextIndex].id] = "running";
  }
  return {
    ...state,
    currentIndex: nextIndex,
    statuses: newStatuses,
    lastAction: snapshot(state),
  };
}

export function undo(state, events) {
  if (!state.lastAction) return state;
  const restored = {
    ...state,
    currentIndex: state.lastAction.currentIndex,
    statuses: { ...state.lastAction.statuses },
    lastAction: null,
  };
  // re-apply running status for restored current index
  if (restored.currentIndex !== null) {
    const currentId = events[restored.currentIndex].id;
    if (!restored.statuses[currentId] || restored.statuses[currentId] === "done") {
      restored.statuses[currentId] = "running";
    }
  }
  return restored;
}

export function resetMeet() {
  return { ...DEFAULT_STATE };
}

// ── Read-only derived view ─────────────────────────────────────────────────

export function computeView(state, events, comingUpCount = 5) {
  const notStarted = state.currentIndex === null && !hasMeetBegun(state, events);

  const runningEvent =
    state.currentIndex !== null ? events[state.currentIndex] : null;

  const upcomingEvents = [];
  const doneEvents = [];

  for (let i = 0; i < events.length; i++) {
    const ev = events[i];
    const status = state.statuses[ev.id] ?? "pending";
    if (status === "done" || status === "scratched") {
      doneEvents.push({ event: ev, status });
    } else if (i !== state.currentIndex) {
      upcomingEvents.push({ event: ev, status });
    }
  }

  const upNext = upcomingEvents[0] ?? null;
  const coming = upcomingEvents.slice(1, comingUpCount);

  const totalActive = events.filter(
    (ev) => (state.statuses[ev.id] ?? "pending") !== "scratched"
  ).length;

  const doneCount = doneEvents.filter((d) => d.status === "done").length;
  const runningNumber = doneCount + (runningEvent ? 1 : 0);

  return {
    notStarted,
    runningEvent,
    runningNumber,
    totalActive,
    upNext,
    coming,
    doneEvents,
    canUndo: !!state.lastAction,
    meetFinished: !notStarted && runningEvent === null,
  };
}

function hasMeetBegun(state, events) {
  return events.some(
    (ev) => (state.statuses[ev.id] ?? "pending") !== "pending"
  );
}
