import { useState, useEffect } from "react";
import { MCQ, LONG_QA } from "./data.js";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ─── DATA ────────────────────────────────────────────────────────────────────

const UNITS = [
  { id: 1, label: "Unit I", title: "Data Pre-processing", icon: "📊" },
  { id: 2, label: "Unit II", title: "Feature Engineering", icon: "🔧" },
  { id: 3, label: "Unit III", title: "Classification Models", icon: "🤖" },
  { id: 4, label: "Unit IV", title: "Regression", icon: "📈" },
  { id: 5, label: "Unit V", title: "Ensemble Learning", icon: "🌲" },
  { id: 6, label: "Unit VI", title: "Unsupervised Learning", icon: "🔮" },
  { id: 7, label: "Mixed", title: "Long Answer Questions", icon: "📝" },
];

function ProgressBar({ current, total, color }) {
  return (
    <div style={{ background: "#e8ecf4", borderRadius: 8, height: 6, overflow: "hidden" }}>
      <div style={{
        width: `${(current / total) * 100}%`,
        height: "100%",
        background: color || "#5b7cff",
        borderRadius: 8,
        transition: "width 0.4s ease"
      }} />
    </div>
  );
}

function MCQSection({ unitId }) {
  const questions = MCQ[unitId] || [];
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const total = questions.length;
  const q = questions[current];
  const selected = answers[current];
  const score = Object.entries(answers).filter(([i, v]) => questions[parseInt(i)]?.ans === v).length;
  const answered = Object.keys(answers).length;

  function select(optIdx) {
    if (selected !== undefined) return;
    setAnswers(prev => ({ ...prev, [current]: optIdx }));
  }

  function getColor(optIdx) {
    if (selected === undefined) return null;
    if (optIdx === q.ans) return "#16a34a";
    if (optIdx === selected && selected !== q.ans) return "#dc2626";
    return null;
  }

  function getBg(optIdx) {
    const c = getColor(optIdx);
    if (!c) return selected !== undefined ? "#f5f6fa" : undefined;
    return c === "#16a34a" ? "#dcfce7" : "#fee2e2";
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>
          Q {current + 1} / {total}  ·  Score: {score}/{answered || "—"}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setCurrent(Math.max(0, current - 1))}
            style={{ padding: "5px 14px", borderRadius: 8, border: "1.5px solid #d1d5db", background: current === 0 ? "#f3f4f6" : "#fff", cursor: current === 0 ? "default" : "pointer", fontSize: 13, fontWeight: 600, color: current === 0 ? "#9ca3af" : "#374151" }}>
            ← Prev
          </button>
          <button onClick={() => setCurrent(Math.min(total - 1, current + 1))}
            style={{ padding: "5px 14px", borderRadius: 8, border: "1.5px solid #d1d5db", background: current === total - 1 ? "#f3f4f6" : "#fff", cursor: current === total - 1 ? "default" : "pointer", fontSize: 13, fontWeight: 600, color: current === total - 1 ? "#9ca3af" : "#374151" }}>
            Next →
          </button>
        </div>
      </div>

      <ProgressBar current={current + 1} total={total} color="#5b7cff" />

      <div style={{ marginTop: 24, background: "#fff", borderRadius: 14, border: "1.5px solid #e5e7eb", padding: "22px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#5b7cff", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Q {current + 1}
        </div>
        <p style={{ fontSize: 15.5, fontWeight: 500, color: "#1e293b", lineHeight: 1.65, marginBottom: 20 }}>{q.q}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt, i) => {
            const c = getColor(i);
            const bg = getBg(i);
            return (
              <button key={i} onClick={() => select(i)}
                style={{
                  textAlign: "left", padding: "12px 16px", borderRadius: 10,
                  border: `1.5px solid ${c || "#e5e7eb"}`,
                  background: bg || "#fafbff",
                  cursor: selected !== undefined ? "default" : "pointer",
                  fontSize: 14, color: c ? (c === "#16a34a" ? "#15803d" : "#b91c1c") : "#374151",
                  fontWeight: selected !== undefined && (i === q.ans || i === selected) ? 600 : 400,
                  transition: "all 0.2s", lineHeight: 1.5,
                  display: "flex", alignItems: "center", gap: 10
                }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: c ? (c === "#16a34a" ? "#16a34a" : "#dc2626") : "#e8ecf4", color: c ? "#fff" : "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {c ? (c === "#16a34a" ? "✓" : "✗") : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== undefined && (
          <div style={{ marginTop: 16, background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 10, padding: "13px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {selected === q.ans ? "✓ Correct!" : "✗ Incorrect"}
            </div>
            <p style={{ fontSize: 13.5, color: "#166534", lineHeight: 1.6, margin: 0 }}>{q.exp}</p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 16 }}>
        {questions.map((_, i) => {
          const a = answers[i];
          const cor = a !== undefined && questions[i].ans === a;
          const wrong = a !== undefined && questions[i].ans !== a;
          return (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: 28, height: 28, borderRadius: 6, border: `1.5px solid ${i === current ? "#5b7cff" : cor ? "#16a34a" : wrong ? "#dc2626" : "#e5e7eb"}`, background: i === current ? "#eff3ff" : cor ? "#dcfce7" : wrong ? "#fee2e2" : "#f9fafb", fontSize: 11, fontWeight: 700, color: i === current ? "#5b7cff" : cor ? "#16a34a" : wrong ? "#dc2626" : "#9ca3af", cursor: "pointer" }}>
              {i + 1}
            </button>
          );
        })}
      </div>

      {answered > 0 && (
        <div style={{ marginTop: 20, padding: "14px 20px", borderRadius: 12, background: "linear-gradient(135deg, #eff3ff, #f0fdf4)", border: "1.5px solid #c7d2fe", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#3730a3" }}>Progress: {answered}/{total} answered</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: score / answered >= 0.7 ? "#16a34a" : "#dc2626" }}>
            Score: {score}/{answered} ({Math.round((score / answered) * 100)}%)
          </span>
        </div>
      )}
    </div>
  );
}

function LongSection() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: 20, padding: "16px 20px", background: "linear-gradient(135deg, #f0f4ff, #faf0ff)", borderRadius: 12, border: "1.5px solid #c7d2fe" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#4338ca", marginBottom: 4 }}>📝 30 Long Answer Questions</div>
        <div style={{ fontSize: 13, color: "#6366f1" }}>Exam-level answers covering all 6 units. Click any question to expand the full answer.</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {LONG_QA.map((item, i) => (
          <div key={i} style={{ borderRadius: 12, border: `1.5px solid ${open === i ? "#818cf8" : "#e5e7eb"}`, overflow: "hidden", background: "#fff", boxShadow: open === i ? "0 2px 16px rgba(99,102,241,0.08)" : "none" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", padding: "15px 18px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: open === i ? "#6366f1" : "#e8ecf4", color: open === i ? "#fff" : "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 600, color: open === i ? "#4338ca" : "#1e293b", lineHeight: 1.5 }}>{item.q}</span>
              <span style={{ marginLeft: "auto", fontSize: 16, color: open === i ? "#6366f1" : "#9ca3af", flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
            </button>
            {open === i && (
              <div style={{ borderTop: "1.5px solid #e0e4f4", padding: "18px 20px 20px", background: "#fafbff", textAlign: "left" }}>
                <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, fontFamily: "inherit", textAlign: "left" }} className="markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline ? (
                          <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, '')}
                            style={vscDarkPlus}
                            language={match ? match[1] : 'javascript'}
                            PreTag="div"
                            customStyle={{ borderRadius: "8px", margin: "14px 0", fontSize: "13px", padding: "16px" }}
                          />
                        ) : (
                          <code {...props} className={className} style={{ background: "#e5e7eb", padding: "2px 6px", borderRadius: "4px", fontSize: "13px", color: "#b91c1c" }}>
                            {children}
                          </code>
                        )
                      },
                      p({node, ...props}) {
                        return <p style={{ marginBottom: "12px" }} {...props} />
                      },
                      ul({node, ...props}) {
                        return <ul style={{ marginBottom: "12px", paddingLeft: "24px" }} {...props} />
                      },
                      ol({node, ...props}) {
                        return <ol style={{ marginBottom: "12px", paddingLeft: "24px" }} {...props} />
                      },
                      li({node, ...props}) {
                        return <li style={{ marginBottom: "6px" }} {...props} />
                      },
                      table({node, ...props}) {
                        return (
                          <div style={{ overflowX: "auto", margin: "16px 0" }}>
                            <table style={{ minWidth: "100%", borderCollapse: "collapse", border: "1px solid #e5e7eb", textAlign: "left" }} {...props} />
                          </div>
                        )
                      },
                      th({node, ...props}) {
                        return <th style={{ padding: "10px", borderBottom: "2px solid #e5e7eb", backgroundColor: "#f3f4f6", fontWeight: 600 }} {...props} />
                      },
                      td({node, ...props}) {
                        return <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }} {...props} />
                      }
                    }}
                  >
                    {item.a}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeUnit, setActiveUnit] = useState(1);
  const unit = UNITS.find(u => u.id === activeUnit);

  return (
    <div style={{ minHeight: "100vh", background: "#f1f3f9", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)", padding: "0 0 0 0", boxShadow: "0 4px 24px rgba(67,56,202,0.25)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "22px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, backdropFilter: "blur(10px)" }}>🎓</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>CSE274 ML Practice Quiz</div>
              <div style={{ fontSize: 12.5, color: "rgba(199,210,254,0.85)", marginTop: 1 }}>300 MCQs (50/unit) + 30 Long Answers · All 6 Units</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 0 }}>
            {UNITS.map(u => (
              <button key={u.id} onClick={() => setActiveUnit(u.id)}
                style={{
                  padding: "9px 16px", borderRadius: "10px 10px 0 0", border: "none",
                  background: activeUnit === u.id ? "#fff" : "rgba(255,255,255,0.08)",
                  color: activeUnit === u.id ? "#4338ca" : "rgba(199,210,254,0.8)",
                  fontWeight: activeUnit === u.id ? 700 : 500,
                  fontSize: 12.5, cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all 0.18s", backdropFilter: "blur(10px)",
                  display: "flex", alignItems: "center", gap: 6
                }}>
                <span>{u.icon}</span>
                <span>{u.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}>
            {unit.icon}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em" }}>{unit.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b", letterSpacing: "-0.02em" }}>{unit.title}</div>
          </div>
          {activeUnit <= 6 && (
            <div style={{ marginLeft: "auto", background: "#eff3ff", borderRadius: 20, padding: "5px 14px", fontSize: 12.5, fontWeight: 700, color: "#4338ca", border: "1.5px solid #c7d2fe" }}>
              50 MCQs
            </div>
          )}
        </div>

        {activeUnit <= 6 ? <MCQSection key={activeUnit} unitId={activeUnit} /> : <LongSection />}
      </div>
    </div>
  );
}