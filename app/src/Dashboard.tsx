/**
 * Dashboard — generated from project/Dashboard.dc.html.
 *
 * The markup below is the design's own DOM, element for element, with its
 * inline style values untouched. Only React syntax forced any change:
 * hyphenated SVG attributes are camelCased, `style` strings became style
 * objects, the design's `style-hover` attributes became the :hover rules in
 * dashboard.css, and the {{ }} bindings read from the values computed below —
 * the same arithmetic the design's DCLogic.renderVals() performed.
 *
 * Regenerate with: node scripts/generate-dashboard.mjs
 */
import { useState } from 'react'
import { ImageSlot } from './ImageSlot'
import './dashboard.css'

export type DashboardProps = {
  /** design prop: text, default 'Michael' */
  userName?: string
  /** design prop: range 0–100, default 75 */
  dailyGoalPercent?: number
}

export function Dashboard({ userName = 'Michael', dailyGoalPercent = 75 }: DashboardProps) {
  const [favorite, setFavorite] = useState(false)

  const pct = Math.max(0, Math.min(100, dailyGoalPercent))
  const c = 2 * Math.PI * 76
  const percentLabel = Math.round(pct)
  const ringDash = ((c * pct) / 100).toFixed(1) + ' ' + c.toFixed(1)
  const heartFill = favorite ? '#D97B2E' : 'none'
  const toggleFavorite = () => setFavorite((f) => !f)

  return (
    <>
      <div
        style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", color: "#22201C", background: "#FBFAF6" }}
      >
        <aside
          style={{ width: "258px", flex: "none", background: "#FFFFFF", borderRight: "1px solid #ECE7DC", display: "flex", flexDirection: "column", padding: "26px 20px 18px", gap: "26px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "11px", paddingLeft: "6px" }}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1E6B45"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <path d="M12 21c0-7 3-12 9-14-1 9-4 13-9 14z" fill="#2E8B57" stroke="none" />
              <path d="M12 21C7 19 3 14 3 6c5 1 8 5 9 9" fill="#1E6B45" stroke="none" />
              <path d="M12 21v-8" />
            </svg>
            <div>
              <div
                style={{ fontFamily: "'Source Serif 4',serif", fontSize: "20px", fontWeight: "700", color: "#16452F", letterSpacing: "-0.2px" }}
              >
                ScripturePath
              </div>
              <div style={{ fontSize: "11px", color: "#8B8579", marginTop: "1px" }}>
                Study. Grow. Live.
              </div>
            </div>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", background: "#16452F", color: "#FFFFFF", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V20h14V9.5" />
              </svg>
              Dashboard
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", color: "#3F3B34", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
              className="hv-1"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C7566"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="16" rx="3" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              My Plan
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", color: "#3F3B34", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
              className="hv-2"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C7566"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z" />
                <path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z" />
              </svg>
              Bible Library
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", color: "#3F3B34", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
              className="hv-3"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C7566"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
              </svg>
              Study Tools
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", color: "#3F3B34", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
              className="hv-4"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C7566"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17l6-6 4 3 8-8" />
                <path d="M16 6h5v5" />
              </svg>
              Progress
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", color: "#3F3B34", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
              className="hv-5"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C7566"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
              </svg>
              Notes &amp; Highlights
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", color: "#3F3B34", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
              className="hv-6"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C7566"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4l2.5 5.2 5.5.8-4 3.9 1 5.6-5-2.9-5 2.9 1-5.6-4-3.9 5.5-.8z" />
              </svg>
              Favorites
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", color: "#3F3B34", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
              className="hv-7"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C7566"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="8" r="3" />
                <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
                <path d="M16 6.5a2.8 2.8 0 0 1 0 5.4M17 14.5c2.4.6 4 2.3 4 4.5" />
              </svg>
              Community
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 16px", borderRadius: "11px", color: "#3F3B34", fontSize: "14.5px", fontWeight: "500", cursor: "pointer" }}
              className="hv-8"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5C7566"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v2.5M12 18.5V21M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3" />
              </svg>
              Settings
            </div>
          </nav>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{ border: "1px solid #ECE7DC", borderRadius: "14px", padding: "17px 18px 15px", background: "#FFFDF9" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: "15.5px", fontWeight: "600", color: "#22201C" }}>
                  Verse of the Day
                </div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E89B3C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2.5v2M12 19.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6" />
                </svg>
              </div>
              <div style={{ fontSize: "14px", lineHeight: "1.55", color: "#3F3B34", textWrap: "pretty" }}>
                Your word is a lamp to my feet and a light to my path.
              </div>
              <div style={{ fontSize: "12.5px", color: "#8B8579", marginTop: "11px" }}>
                Psalm 119:105
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0", justifyContent: "space-between", marginTop: "16px" }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  stroke="#D97B2E"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  onClick={toggleFavorite}
                  style={{ cursor: "pointer" }}
                  fill={heartFill}
                >
                  <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
                </svg>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5C7566"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  style={{ cursor: "pointer" }}
                >
                  <circle cx="18" cy="5.5" r="2.5" />
                  <circle cx="6" cy="12" r="2.5" />
                  <circle cx="18" cy="18.5" r="2.5" />
                  <path d="M8.3 10.8 15.7 6.8M8.3 13.2l7.4 4" />
                </svg>
              </div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "1px solid #ECE7DC", cursor: "pointer" }}
            >
              <div
                style={{ width: "42px", height: "42px", flex: "none", borderRadius: "50%", overflow: "hidden", background: "#EEEAE0" }}
              >
                <ImageSlot id="avatar" shape="circle" placeholder="Avatar" style={{ width: "42px", height: "42px" }} />
              </div>
              <div style={{ flex: "1" }}>
                <div style={{ fontSize: "14.5px", fontWeight: "600", color: "#22201C" }}>
                  {userName}
                </div>
                <div style={{ fontSize: "12.5px", color: "#8B8579" }}>
                  Edit Profile
                </div>
              </div>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B8579"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9.5l6 6 6-6" />
              </svg>
            </div>
          </div>
        </aside>
        <main
          style={{ flex: "1", minWidth: "1120px", padding: "34px 44px 44px", display: "flex", flexDirection: "column", gap: "26px" }}
        >
          <header style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            <div style={{ flex: "1", minWidth: "0" }}>
              <h1
                style={{ margin: "0", fontFamily: "'Source Serif 4',serif", fontSize: "31px", fontWeight: "600", letterSpacing: "-0.4px", color: "#16452F", whiteSpace: "nowrap" }}
              >
                Good morning, {userName} 👋
              </h1>
              <div style={{ marginTop: "8px", fontSize: "14.5px", color: "#6E6A62" }}>
                Keep seeking. Keep growing. God is with you.
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "4px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px", width: "256px", height: "46px", padding: "0 16px", background: "#FFFFFF", border: "1px solid #ECE7DC", borderRadius: "11px" }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8B8579"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l4.5 4.5" />
                </svg>
                <input
                  placeholder="Search..."
                  style={{ flex: "1", border: "none", outline: "none", background: "transparent", fontSize: "14px", color: "#22201C" }}
                />
              </div>
              <div style={{ position: "relative", cursor: "pointer", padding: "4px" }}>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3F3B34"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" />
                  <path d="M10 19a2.2 2.2 0 0 0 4 0" />
                </svg>
                <div
                  style={{ position: "absolute", top: "3px", right: "3px", width: "8px", height: "8px", borderRadius: "50%", background: "#E07A2F", border: "1.5px solid #FBFAF6" }}
                />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "9px", height: "46px", padding: "0 20px", background: "#16452F", color: "#FFFFFF", borderRadius: "11px", fontSize: "14.5px", fontWeight: "600", cursor: "pointer" }}
                className="hv-9"
              >
                New Study
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
            </div>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
            <section
              style={{ background: "#FFFFFF", border: "1px solid #ECE7DC", borderRadius: "16px", padding: "24px 26px 26px" }}
            >
              <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: "18px", fontWeight: "600", color: "#22201C" }}>
                Today's Progress
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "26px", marginTop: "20px" }}>
                <div style={{ position: "relative", width: "172px", height: "172px", flex: "none" }}>
                  <svg width="172" height="172" viewBox="0 0 172 172" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="86" cy="86" r="76" fill="none" stroke="#EDEAE1" strokeWidth="15" />
                    <circle
                      cx="86"
                      cy="86"
                      r="76"
                      fill="none"
                      stroke="#16452F"
                      strokeWidth="15"
                      strokeLinecap="round"
                      strokeDasharray={ringDash}
                    />
                  </svg>
                  <div
                    style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                  >
                    <div
                      style={{ fontFamily: "'Source Serif 4',serif", fontSize: "38px", fontWeight: "600", color: "#16452F", lineHeight: "1" }}
                    >
                      {percentLabel}
                      <span style={{ fontSize: "20px" }}>
                        %
                      </span>
                    </div>
                    <div style={{ fontSize: "12.5px", color: "#8B8579", marginTop: "6px" }}>
                      Daily Goal
                    </div>
                  </div>
                </div>
                <div
                  style={{ flex: "1", minWidth: "0", borderLeft: "1px solid #ECE7DC", paddingLeft: "26px", display: "flex", flexDirection: "column", gap: "18px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3F3B34"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                    <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#3F3B34" }}>
                        Time Studied
                        <span style={{ fontWeight: "700", color: "#22201C" }}>
                          25 min
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#3F3B34" }}>
                        Verses Studied
                        <span style={{ fontWeight: "700", color: "#22201C" }}>
                          12
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ borderTop: "1px solid #ECE7DC", paddingTop: "16px", fontSize: "14px", lineHeight: "1.55", color: "#3F3B34", textWrap: "pretty" }}
                  >
                    Keep it up! You're building something that lasts.
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "50px", background: "#16452F", color: "#FFFFFF", borderRadius: "11px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}
                    className="hv-10"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" />
                      <path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" />
                    </svg>
                    Continue Study
                  </div>
                </div>
              </div>
            </section>
            <section
              style={{ background: "#FFFFFF", border: "1px solid #ECE7DC", borderRadius: "16px", padding: "24px 26px 26px" }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: "18px", fontWeight: "600", color: "#22201C" }}>
                  Weekly Progress
                </div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#D97B2E" }}>
                  4 of 7 days
                </div>
              </div>
              <div style={{ marginTop: "10px", fontSize: "14px", color: "#6E6A62" }}>
                You're on fire! 🔥 Keep showing up.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "8px", marginTop: "26px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "11px" }}>
                  <div
                    style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E8862E", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#3F3B34" }}>
                    Mon
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "11px" }}>
                  <div
                    style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E8862E", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#3F3B34" }}>
                    Tue
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "11px" }}>
                  <div
                    style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E8862E", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#3F3B34" }}>
                    Wed
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "11px" }}>
                  <div
                    style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E8862E", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#3F3B34" }}>
                    Thu
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "11px" }}>
                  <div
                    style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#FFFFFF", border: "1.8px solid #DAD5C9" }}
                  />
                  <div style={{ fontSize: "12.5px", color: "#3F3B34" }}>
                    Fri
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "11px" }}>
                  <div
                    style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#FFFFFF", border: "1.8px solid #EAE5DA" }}
                  />
                  <div style={{ fontSize: "12.5px", color: "#8B8579" }}>
                    Sat
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "11px" }}>
                  <div
                    style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#FFFFFF", border: "1.8px solid #EAE5DA" }}
                  />
                  <div style={{ fontSize: "12.5px", color: "#8B8579" }}>
                    Sun
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "26px", padding: "16px 20px", background: "#FDF3E7", borderRadius: "12px" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E8862E"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="8.5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M12 12l7-7" />
                </svg>
                <div style={{ flex: "1" }}>
                  <div style={{ fontSize: "14.5px", fontWeight: "600", color: "#22201C" }}>
                    Weekly Goal
                  </div>
                  <div style={{ fontSize: "13px", color: "#6E6A62", marginTop: "2px" }}>
                    5 days per week
                  </div>
                </div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#3F3B34", cursor: "pointer" }} className="hv-11">
                  Edit Goal
                </div>
              </div>
            </section>
            <section
              style={{ background: "#FFFFFF", border: "1px solid #ECE7DC", borderRadius: "16px", padding: "24px 26px 26px" }}
            >
              <div
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid #ECE7DC" }}
              >
                <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: "18px", fontWeight: "600", color: "#22201C" }}>
                  Continue Your Plan
                </div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#D97B2E", cursor: "pointer" }}>
                  View Plan
                </div>
              </div>
              <div style={{ display: "flex", gap: "22px", marginTop: "22px" }}>
                <ImageSlot
                  id="plan-cover"
                  shape="rounded"
                  radius="12"
                  placeholder="Plan cover"
                  style={{ width: "94px", height: "140px", flex: "none" }}
                />
                <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: "20px", fontWeight: "600", color: "#22201C" }}>
                    Peace for Anxious Hearts
                  </div>
                  <div style={{ fontSize: "14px", color: "#6E6A62", marginTop: "5px" }}>
                    Philippians · Guided, Level 2
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "22px" }}>
                    <div style={{ flex: "1", height: "8px", borderRadius: "99px", background: "#EDEAE1", overflow: "hidden" }}>
                      <div style={{ width: "60%", height: "100%", borderRadius: "99px", background: "#16452F" }} />
                    </div>
                    <div style={{ fontSize: "13.5px", fontWeight: "600", color: "#3F3B34" }}>
                      60%
                    </div>
                  </div>
                  <div style={{ fontSize: "13.5px", color: "#3F3B34", marginTop: "14px" }}>
                    Next: Philippians 4:4–9
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto", paddingTop: "18px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "9px", height: "44px", padding: "0 22px", background: "#16452F", color: "#FFFFFF", borderRadius: "10px", fontSize: "14.5px", fontWeight: "600", cursor: "pointer" }}
                      className="hv-12"
                    >
                      Continue
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 4l12 8-12 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              style={{ background: "#FFFFFF", border: "1px solid #ECE7DC", borderRadius: "16px", padding: "24px 26px 26px" }}
            >
              <div
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid #ECE7DC" }}
              >
                <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: "18px", fontWeight: "600", color: "#22201C" }}>
                  Your Stats
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "14px", fontWeight: "500", color: "#3F3B34", cursor: "pointer" }}
                >
                  This Month
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8B8579"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9.5l6 6 6-6" />
                  </svg>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "22px" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px", padding: "18px", border: "1px solid #EFEBE2", borderRadius: "12px" }}
                >
                  <div
                    style={{ width: "44px", height: "44px", flex: "none", borderRadius: "11px", background: "#EAF1EC", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1E6B45"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" />
                      <path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: "'Source Serif 4',serif", fontSize: "24px", fontWeight: "600", color: "#22201C", lineHeight: "1.1" }}
                    >
                      8
                    </div>
                    <div style={{ fontSize: "13px", color: "#6E6A62", marginTop: "4px" }}>
                      Chapters Studied
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px", padding: "18px", border: "1px solid #EFEBE2", borderRadius: "12px" }}
                >
                  <div
                    style={{ width: "44px", height: "44px", flex: "none", borderRadius: "11px", background: "#FDF1E4", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E8862E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: "'Source Serif 4',serif", fontSize: "24px", fontWeight: "600", color: "#22201C", lineHeight: "1.1" }}
                    >
                      3h 15m
                    </div>
                    <div style={{ fontSize: "13px", color: "#6E6A62", marginTop: "4px" }}>
                      Time Studied
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px", padding: "18px", border: "1px solid #EFEBE2", borderRadius: "12px" }}
                >
                  <div
                    style={{ width: "44px", height: "44px", flex: "none", borderRadius: "11px", background: "#FDF6E7", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D9A22E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: "'Source Serif 4',serif", fontSize: "24px", fontWeight: "600", color: "#22201C", lineHeight: "1.1" }}
                    >
                      14
                    </div>
                    <div style={{ fontSize: "13px", color: "#6E6A62", marginTop: "4px" }}>
                      Notes Created
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px", padding: "18px", border: "1px solid #EFEBE2", borderRadius: "12px" }}
                >
                  <div
                    style={{ width: "44px", height: "44px", flex: "none", borderRadius: "11px", background: "#FDF6E7", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D9A22E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 4l2.5 5.2 5.5.8-4 3.9 1 5.6-5-2.9-5 2.9 1-5.6-4-3.9 5.5-.8z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: "'Source Serif 4',serif", fontSize: "24px", fontWeight: "600", color: "#22201C", lineHeight: "1.1" }}
                    >
                      7
                    </div>
                    <div style={{ fontSize: "13px", color: "#6E6A62", marginTop: "4px" }}>
                      Highlights
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              style={{ background: "#FFFFFF", border: "1px solid #ECE7DC", borderRadius: "16px", padding: "24px 26px 12px" }}
            >
              <div
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid #ECE7DC" }}
              >
                <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: "18px", fontWeight: "600", color: "#22201C" }}>
                  Recent Activity
                </div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#D97B2E", cursor: "pointer" }}>
                  View All
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 0", borderBottom: "1px solid #F2EFE7", cursor: "pointer" }}
                >
                  <div
                    style={{ width: "44px", height: "44px", flex: "none", borderRadius: "11px", background: "#EAF1EC", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1E6B45"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" />
                      <path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" />
                    </svg>
                  </div>
                  <div style={{ flex: "1", minWidth: "0" }}>
                    <div style={{ fontSize: "14.5px", fontWeight: "600", color: "#22201C" }}>
                      Read Philippians 4:1–7
                    </div>
                    <div style={{ fontSize: "13px", color: "#8B8579", marginTop: "4px" }}>
                      Today, 8:30 AM
                    </div>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A09A8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.5 6l6 6-6 6" />
                  </svg>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 0", borderBottom: "1px solid #F2EFE7", cursor: "pointer" }}
                >
                  <div
                    style={{ width: "44px", height: "44px", flex: "none", borderRadius: "11px", background: "#FDF6E7", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D9A22E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
                    </svg>
                  </div>
                  <div style={{ flex: "1", minWidth: "0" }}>
                    <div style={{ fontSize: "14.5px", fontWeight: "600", color: "#22201C" }}>
                      Highlighted Philippians 4:6
                    </div>
                    <div style={{ fontSize: "13px", color: "#8B8579", marginTop: "4px" }}>
                      Today, 8:15 AM
                    </div>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A09A8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.5 6l6 6-6 6" />
                  </svg>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 0", cursor: "pointer" }}>
                  <div
                    style={{ width: "44px", height: "44px", flex: "none", borderRadius: "11px", background: "#EAEFF6", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3D6491"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="3.5" width="16" height="17" rx="3" />
                      <path d="M8 9h8M8 13h8M8 17h4" />
                    </svg>
                  </div>
                  <div style={{ flex: "1", minWidth: "0" }}>
                    <div style={{ fontSize: "14.5px", fontWeight: "600", color: "#22201C" }}>
                      Added a note on Philippians 4:6
                    </div>
                    <div style={{ fontSize: "13px", color: "#8B8579", marginTop: "4px" }}>
                      Yesterday, 10:45 PM
                    </div>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A09A8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.5 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </section>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <section
                style={{ background: "#FFFFFF", border: "1px solid #ECE7DC", borderRadius: "16px", padding: "24px 26px 26px" }}
              >
                <div
                  style={{ fontFamily: "'Source Serif 4',serif", fontSize: "18px", fontWeight: "600", color: "#22201C", paddingBottom: "20px", borderBottom: "1px solid #ECE7DC" }}
                >
                  Tools Quick Access
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginTop: "22px" }}>
                  <div
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "20px 8px", border: "1px solid #EFEBE2", borderRadius: "12px", cursor: "pointer" }}
                    className="hv-13"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1E6B45"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z" />
                      <path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z" />
                    </svg>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#3F3B34", textAlign: "center" }}>
                      Study Bible
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "20px 8px", border: "1px solid #EFEBE2", borderRadius: "12px", cursor: "pointer" }}
                    className="hv-14"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D9A22E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 4h9l3 3v13H6z" />
                      <path d="M9 9h6M9 13h6M9 17h3" />
                    </svg>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#3F3B34", textAlign: "center" }}>
                      Commentaries
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "20px 8px", border: "1px solid #EFEBE2", borderRadius: "12px", cursor: "pointer" }}
                    className="hv-15"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3D6491"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 21s6.5-6.2 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21z" />
                      <circle cx="12" cy="10" r="2.3" />
                    </svg>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#3F3B34", textAlign: "center" }}>
                      Bible Maps
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "20px 8px", border: "1px solid #EFEBE2", borderRadius: "12px", cursor: "pointer" }}
                    className="hv-16"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E8862E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3.5h8l4 4v13H6z" />
                      <path d="M9.5 11.5h5M9.5 15h3" />
                    </svg>
                    <div style={{ fontSize: "13px", fontWeight: "500", color: "#3F3B34", textAlign: "center" }}>
                      Dictionary
                    </div>
                  </div>
                </div>
              </section>
              <section
                style={{ display: "flex", alignItems: "center", gap: "24px", background: "#123A28", borderRadius: "16px", padding: "26px 30px" }}
              >
                <ImageSlot
                  id="plant"
                  shape="rounded"
                  radius="10"
                  placeholder="Illustration"
                  style={{ width: "104px", height: "104px", flex: "none" }}
                />
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: "20px", fontWeight: "600", color: "#FFFFFF" }}>
                    Stay rooted in the Word
                  </div>
                  <div style={{ fontSize: "14px", lineHeight: "1.55", color: "#C8D8CD", marginTop: "8px", textWrap: "pretty" }}>
                    The more time you spend in God's Word, the more it transforms your life.
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "46px", padding: "0 22px", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: "10px", color: "#FFFFFF", fontSize: "14.5px", fontWeight: "600", cursor: "pointer", flex: "none" }}
                  className="hv-17"
                >
                  Explore Plans
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
