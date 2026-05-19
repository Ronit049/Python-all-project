import { useState } from "react";

const LANG_COLORS = {
  JavaScript:"#f7df1e",TypeScript:"#3178c6",Python:"#3572a5",Java:"#b07219",
  Go:"#00add8",Rust:"#dea584","C++":"#f34b7d",C:"#888",Ruby:"#701516",
  PHP:"#4f5d95",Swift:"#fa7343",Kotlin:"#a97bff",Shell:"#89e051",
  Dart:"#00b4ab",HTML:"#e34c26",CSS:"#563d7c",Vue:"#41b883","C#":"#178600",
};
const lc = l => LANG_COLORS[l] || "#4d9fff";

function Card({ title, children, style }) {
  return (
    <div style={{ background:"#121820", border:"1px solid rgba(0,229,160,0.18)", borderRadius:10, padding:"1.2rem", ...style }}>
      <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#00e5a0", marginBottom:"0.9rem", display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ width:5, height:5, background:"#00e5a0", borderRadius:"50%", display:"inline-block", flexShrink:0 }}/>
        {title}
      </div>
      {children}
    </div>
  );
}

function ScoreRing({ score }) {
  const color = score >= 70 ? "#00e5a0" : score >= 45 ? "#ffb340" : "#ff5f70";
  const r = 36, cx = 44, cy = 44, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ position:"relative", width:88, height:88, flexShrink:0 }}>
      <svg width="88" height="88">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2230" strokeWidth="8"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:22, fontWeight:900, color, lineHeight:1 }}>{score}</span>
        <span style={{ fontSize:9, color:"#4a5a70", letterSpacing:1 }}>/ 100</span>
      </div>
    </div>
  );
}

function BarRow({ label, value, max }) {
  const pct = Math.round((value / max) * 100);
  const c = pct >= 70 ? "#00e5a0" : pct >= 40 ? "#ffb340" : "#ff5f70";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, fontSize:11 }}>
      <span style={{ color:"#7a8fa6", width:145, flexShrink:0 }}>{label}</span>
      <div style={{ flex:1, height:4, background:"#1a2230", borderRadius:2, overflow:"hidden" }}>
        <div style={{ width:pct+"%", height:"100%", background:c, borderRadius:2 }}/>
      </div>
      <span style={{ color:"#4a5a70", width:22, textAlign:"right" }}>{value}</span>
    </div>
  );
}

function LangBar({ name, pct }) {
  const c = lc(name);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, fontSize:11 }}>
      <span style={{ width:7, height:7, borderRadius:"50%", background:c, flexShrink:0 }}/>
      <span style={{ color:"#e8edf5", width:95, flexShrink:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{name}</span>
      <div style={{ flex:1, height:4, background:"#1a2230", borderRadius:2, overflow:"hidden" }}>
        <div style={{ width:pct+"%", height:"100%", background:c, borderRadius:2 }}/>
      </div>
      <span style={{ color:"#4a5a70", width:38, textAlign:"right" }}>{pct.toFixed(1)}%</span>
    </div>
  );
}

function Tip({ type, text }) {
  const map = {
    warn:{ bg:"rgba(255,179,64,.12)", color:"#ffb340", label:"WARN" },
    good:{ bg:"rgba(0,229,160,.1)",   color:"#00e5a0", label:"GOOD" },
    info:{ bg:"rgba(77,159,255,.1)",  color:"#4d9fff", label:"INFO" },
  };
  const s = map[type] || map.info;
  return (
    <div style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:"1px solid #1a2230", fontSize:11, lineHeight:1.6, color:"#7a8fa6" }}>
      <span style={{ color:s.color, flexShrink:0 }}>→</span>
      <span>
        <span style={{ display:"inline-block", padding:"1px 6px", borderRadius:3, fontSize:9, letterSpacing:1, fontWeight:700, background:s.bg, color:s.color, marginRight:6, verticalAlign:"middle" }}>{s.label}</span>
        {text}
      </span>
    </div>
  );
}

function RepoItem({ name, description, stars, forks, language, url }) {
  return (
    <div style={{ padding:"9px 0", borderBottom:"1px solid #1a2230" }}>
      <a href={url||`https://github.com/${name}`} target="_blank" rel="noreferrer"
        style={{ fontSize:12, color:"#00e5a0", fontWeight:700, textDecoration:"none" }}>{name}</a>
      <div style={{ fontSize:11, color:description?"#7a8fa6":"#3a4a5a", margin:"3px 0", lineHeight:1.4 }}>
        {description||"no description"}
      </div>
      <div style={{ display:"flex", gap:12, fontSize:10, color:"#4a5a70" }}>
        {stars!=null && <span>⭐ {Number(stars).toLocaleString()}</span>}
        {forks!=null && <span>🍴 {Number(forks).toLocaleString()}</span>}
        {language && <span style={{ color:lc(language) }}>{language}</span>}
      </div>
    </div>
  );
}

function Dots() {
  return (
    <>
      <style>{`@keyframes bl{0%,80%,100%{opacity:.2}40%{opacity:1}}`}</style>
      {[0,150,300].map(d=>(
        <span key={d} style={{ display:"inline-block", animation:`bl 1.2s ${d}ms infinite`, opacity:.2 }}>.</span>
      ))}
    </>
  );
}

function AISection({ text }) {
  const headers = ["DEVELOPER PERSONA","CONTRIBUTION ANALYSIS","README SUGGESTIONS","STAR-WORTHY PROJECT IDEAS","90-DAY GROWTH PLAN"];
  const lines = text.split("\n");
  return (
    <div style={{ fontSize:11, color:"#7a8fa6", lineHeight:1.9 }}>
      {lines.map((line, i) => {
        const trimmed = line.trim().toUpperCase();
        const isHeader = headers.some(h => trimmed === h || trimmed.startsWith(h));
        return isHeader
          ? <div key={i} style={{ color:"#00e5a0", fontWeight:700, marginTop:i===0?0:"1rem", marginBottom:2 }}>{line.trim()}</div>
          : <div key={i}>{line}</div>;
      })}
    </div>
  );
}

async function callClaude(prompt, useSearch) {
  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{ role:"user", content: prompt }],
  };
  if (useSearch) body.tools = [{ type:"web_search_20250305", name:"web_search" }];
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify(body),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return (d.content||[]).map(c => c.text||"").join("").trim();
}

function safeParseJSON(text) {
  const clean = text.replace(/```json|```/g,"").trim();
  // find first { or [
  const start = clean.search(/[\[{]/);
  const end = Math.max(clean.lastIndexOf("}"), clean.lastIndexOf("]"));
  if (start === -1 || end === -1) return null;
  try { return JSON.parse(clean.slice(start, end+1)); } catch { return null; }
}

function calcScore(profile, repos) {
  const hasBio  = profile?.bio && profile.bio.length > 10;
  const hasBlog = profile?.blog && profile.blog.length > 4;
  const hasLoc  = !!profile?.location;
  const p = Math.min(25,(hasBio?8:0)+(hasBlog?5:0)+(hasLoc?4:0)+4+(profile?.public_repos>20?4:0));
  const totalStars = (repos||[]).reduce((a,r)=>a+(Number(r.stars)||0),0);
  const stars  = Math.min(25,Math.round(Math.log(totalStars+2)/Math.log(5000)*25));
  const withDesc = (repos||[]).filter(r=>r.description?.length>5).length;
  const docs   = repos?.length ? Math.min(20,Math.round(withDesc/repos.length*20)) : 0;
  const withT  = (repos||[]).filter(r=>r.topics?.length>0).length;
  const topics = repos?.length ? Math.min(15,Math.round(withT/repos.length*15)) : 0;
  const activity = Math.min(15, (profile?.public_repos||0)>5?10:5);
  return { total:p+stars+docs+topics+activity, profile:p, stars, docs, topics, activity };
}

function buildTips(profile, repos, username) {
  const tips = [];
  if (!profile?.bio||profile.bio.length<20) tips.push({type:"warn",text:"Add a compelling bio describing what you build and your expertise."});
  if (!profile?.blog) tips.push({type:"info",text:"Add a website or portfolio link to boost discoverability."});
  if (!profile?.location) tips.push({type:"info",text:"Add your location to appear in regional developer searches."});
  const noDesc=(repos||[]).filter(r=>!r.description||r.description.length<5).length;
  if(noDesc>2) tips.push({type:"warn",text:`${noDesc} repos lack descriptions — add keyword-rich ones for search ranking.`});
  const noTopics=(repos||[]).filter(r=>!r.topics?.length).length;
  if(noTopics>2) tips.push({type:"warn",text:`${noTopics} repos have no topics — tags make you appear in GitHub Explore.`});
  tips.push({type:"warn",text:`Create a repo named "${username}" — it shows as your profile README.`});
  if(!tips.length) tips.push({type:"good",text:"Profile looks solid — keep shipping!"});
  return tips.slice(0,6);
}

export default function App() {
  const [username, setUsername]   = useState("");
  const [status,   setStatus]     = useState({ msg:"ready_", color:"#4a5a70" });
  const [loading,  setLoading]    = useState(false);
  const [data,     setData]       = useState(null);
  const [aiText,   setAiText]     = useState(null);
  const [aiLoad,   setAiLoad]     = useState(false);

  async function analyze() {
    const uname = username.trim().replace(/^@/,"");
    if (!uname) { setStatus({msg:"⚠ enter a github username",color:"#ff5f70"}); return; }
    setLoading(true); setData(null); setAiText(null);
    setStatus({msg:`> searching GitHub for @${uname}…`,color:"#00e5a0"});
    try {
      // Fetch all three in parallel via Claude web search
      const [profileTxt, reposTxt, langsTxt] = await Promise.all([
        callClaude(
          `Go to https://github.com/${uname} and return ONLY a JSON object with: name, bio, location, company, blog, followers (number), following (number), public_repos (number), avatar_url. Return raw JSON only, no explanation.`,
          true
        ),
        callClaude(
          `Go to https://github.com/${uname}?tab=repositories and list the top repositories. Return ONLY a JSON array of up to 8 objects each with: name (string), description (string or null), stars (number), forks (number), language (string or null), topics (array of strings), url (string). Sort by stars. Return raw JSON only.`,
          true
        ),
        callClaude(
          `Search GitHub for ${uname}'s most used programming languages. Return ONLY a JSON object where keys are language names and values are usage percentages (numbers 0-100, summing to 100). Up to 8 languages. Raw JSON only.`,
          true
        ),
      ]);

      const profile = safeParseJSON(profileTxt);
      const repos   = safeParseJSON(reposTxt);
      const langs   = safeParseJSON(langsTxt);

      if (!profile && !repos) throw new Error(`Could not find data for @${uname}. Check the username and try again.`);

      setStatus({msg:`✓ @${uname} · analysis complete`,color:"#00e5a0"});
      setData({ username:uname, profile, repos: Array.isArray(repos)?repos:[], langs });
      setLoading(false);

      // AI deep analysis
      setAiLoad(true);
      const topL = langs ? Object.entries(langs).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([l])=>l).join(", ") : "unknown";
      const topR = Array.isArray(repos) ? repos.slice(0,5).map(r=>`${r.name}(⭐${r.stars||0})`).join(", ") : "none";
      const aiPrompt = `Analyze this GitHub profile. Plain text only, no markdown, no asterisks.

@${uname} | ${profile?.name||uname} | ${profile?.public_repos||"?"} repos | ${profile?.followers||"?"} followers
Bio: ${profile?.bio||"none"} | Location: ${profile?.location||"none"}
Top languages: ${topL}
Top repos: ${topR}

Write these 5 sections with the header on its own line:
DEVELOPER PERSONA
CONTRIBUTION ANALYSIS
README SUGGESTIONS
STAR-WORTHY PROJECT IDEAS
90-DAY GROWTH PLAN

2-3 sentences per section. Be specific to their stack and stats. No filler.`;
      const ai = await callClaude(aiPrompt, false);
      setAiText(ai);
    } catch(e) {
      setStatus({msg:"✗ "+e.message, color:"#ff5f70"});
      setLoading(false);
    }
    setAiLoad(false);
  }

  const score    = data ? calcScore(data.profile, data.repos) : null;
  const tips     = data ? buildTips(data.profile, data.repos, data.username) : [];
  const langList = data?.langs ? Object.entries(data.langs).sort((a,b)=>b[1]-a[1]).slice(0,8) : [];
  const topRepos = data?.repos?.slice(0,5) || [];
  const maxStars = Math.max(...topRepos.map(r=>Number(r.stars)||0), 1);

  return (
    <div style={{ background:"#0b0f14", minHeight:"100vh", fontFamily:"'Courier New',monospace", color:"#e8edf5", padding:"1.5rem" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>

        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ fontSize:"1.7rem", fontWeight:900, color:"#00e5a0", letterSpacing:-1 }}>// github analyzer</div>
          <div style={{ fontSize:10, color:"#4a5a70", letterSpacing:2, textTransform:"uppercase", marginTop:4 }}>quality score · language dna · ai insights</div>
        </div>

        <div style={{ display:"flex", gap:8, marginBottom:"0.8rem" }}>
          <input value={username} onChange={e=>setUsername(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&!loading&&analyze()}
            placeholder="enter github username…"
            style={{ flex:1, background:"#121820", border:"1px solid rgba(0,229,160,0.3)", borderRadius:8, padding:"11px 14px", fontFamily:"'Courier New',monospace", fontSize:13, color:"#e8edf5", outline:"none" }}/>
          <button onClick={analyze} disabled={loading}
            style={{ background:loading?"#1a2230":"#00e5a0", border:"none", borderRadius:8, padding:"11px 22px", fontFamily:"'Courier New',monospace", fontSize:12, fontWeight:700, color:loading?"#4a5a70":"#000", cursor:loading?"not-allowed":"pointer", whiteSpace:"nowrap" }}>
            {loading ? "Loading…" : "Analyze →"}
          </button>
        </div>
        <div style={{ fontSize:11, color:status.color, marginBottom:"1.2rem", minHeight:18 }}>{status.msg}</div>

        {data && (<>

          {/* Profile */}
          <Card title="Profile" style={{ marginBottom:"1rem" }}>
            <div style={{ display:"flex", gap:"1rem", alignItems:"center", flexWrap:"wrap" }}>
              {data.profile?.avatar_url && (
                <img src={data.profile.avatar_url} alt="avatar"
                  style={{ width:64, height:64, borderRadius:"50%", border:"2px solid #00e5a0", flexShrink:0 }}/>
              )}
              <div>
                <div style={{ fontWeight:900, fontSize:"1.05rem" }}>{data.profile?.name||data.username}</div>
                <div style={{ fontSize:11, color:"#00e5a0", margin:"2px 0 6px" }}>@{data.username}</div>
                <div style={{ fontSize:11, color:data.profile?.bio?"#7a8fa6":"#3a4a5a", lineHeight:1.5 }}>
                  {data.profile?.bio||"no bio set"}
                </div>
                <div style={{ display:"flex", gap:14, marginTop:8, flexWrap:"wrap", fontSize:11, color:"#4a5a70" }}>
                  {data.profile?.public_repos!=null&&<span><b style={{color:"#e8edf5"}}>{data.profile.public_repos}</b> repos</span>}
                  {data.profile?.followers!=null&&<span><b style={{color:"#e8edf5"}}>{Number(data.profile.followers).toLocaleString()}</b> followers</span>}
                  {data.profile?.location&&<span><b style={{color:"#e8edf5"}}>{data.profile.location}</b></span>}
                  {data.profile?.company&&<span><b style={{color:"#e8edf5"}}>{data.profile.company}</b></span>}
                </div>
              </div>
            </div>
          </Card>

          {/* Score */}
          <Card title="Repo Quality Score" style={{ marginBottom:"1rem" }}>
            <div style={{ display:"flex", gap:"1.5rem", alignItems:"center", flexWrap:"wrap" }}>
              <ScoreRing score={score.total}/>
              <div style={{ flex:1, minWidth:200 }}>
                <BarRow label="Profile Completeness" value={score.profile}  max={25}/>
                <BarRow label="Star Power"            value={score.stars}    max={25}/>
                <BarRow label="Documentation"         value={score.docs}     max={20}/>
                <BarRow label="Topic Tags"            value={score.topics}   max={15}/>
                <BarRow label="Activity Level"        value={score.activity} max={15}/>
              </div>
            </div>
          </Card>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <Card title="Language DNA" style={{ marginBottom:0 }}>
              {langList.length > 0
                ? langList.map(([l,p])=><LangBar key={l} name={l} pct={Number(p)}/>)
                : <div style={{ color:"#3a4a5a", fontSize:11 }}>no language data</div>}
            </Card>

            <Card title="Star Distribution" style={{ marginBottom:0 }}>
              {topRepos.length > 0 ? topRepos.map(r=>(
                <div key={r.name} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#7a8fa6", marginBottom:3 }}>
                    <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"70%" }}>{r.name}</span>
                    <span style={{ color:"#ffb340" }}>⭐ {Number(r.stars||0).toLocaleString()}</span>
                  </div>
                  <div style={{ height:5, background:"#1a2230", borderRadius:3, overflow:"hidden" }}>
                    <div style={{ width:((Number(r.stars)||0)/maxStars*100)+"%", height:"100%", background:"rgba(0,229,160,0.65)", borderRadius:3 }}/>
                  </div>
                </div>
              )) : <div style={{ color:"#3a4a5a", fontSize:11 }}>no repo data</div>}
            </Card>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
            <Card title="Star-Worthy Repos" style={{ marginBottom:0 }}>
              {topRepos.map((r,i)=><RepoItem key={i} {...r} url={r.url||`https://github.com/${data.username}/${r.name}`}/>)}
            </Card>
            <Card title="Profile Tips" style={{ marginBottom:0 }}>
              {tips.map((t,i)=><Tip key={i} {...t}/>)}
            </Card>
          </div>

          <Card title="AI Deep Analysis">
            {aiLoad
              ? <div style={{ fontSize:11, color:"#4a5a70", display:"flex", alignItems:"center", gap:4 }}>Analyzing with Claude <Dots/></div>
              : aiText
                ? <AISection text={aiText}/>
                : <div style={{ color:"#3a4a5a", fontSize:11 }}>waiting…</div>}
          </Card>

        </>)}
      </div>
    </div>
  );
}