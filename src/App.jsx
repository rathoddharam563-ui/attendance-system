import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import {
  LogOut,
  CheckCircle,
  XCircle,
  User,
  ShieldCheck,
  Calendar,
  Clock,
  ChevronDown,
  LayoutDashboard,
  GraduationCap,
  Users,
  Search,
  LogIn,
  BookOpen,
  ArrowLeft,
  Layers,
  Lock,
  Key,
  Trash2,
  UserPlus,
  Sparkles,
  FileBarChart,
  Phone,
  MapPin,
  Contact2,
  X,
  Zap,
  Activity,
  Radio,
  Cpu,
  Dna,
  PartyPopper,
  Orbit,
  Download,
  History
} from 'lucide-react';

// --- Firebase Configuration ---  // add your data in it//
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID" 
};


// --- Constants & Unique Credentials ---
const ADMIN_ID = "rathod_admin_unique";
const ADMIN_PW = "dharam_secure_pass_2024";

const SEMESTERS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
const DIVISIONS = ["Division A", "Division B", "Division C", "Division D"];

const STREAM_DATA = {
  "BCA": ["C++ Programming", "Java Programming", "PHP Web Development", "Python for Data Science", "Networking", "Web Technologies"],
  "BBA": ["Principles of Management", "Business Economics", "Marketing Management", "Human Resource Management", "Financial Accounting"],
  "BSW": ["Social Work Practice", "Psychology for Social Workers", "Community Development", "Social Legislation", "NGO Management"],
  "MCA": ["Advanced Java", "Cloud Computing", "AI & Machine Learning", "Mobile App Development", "Software Architecture"],
  "MBA": ["Strategic Management", "Organizational Behavior", "Supply Chain Logistics", "International Business", "Corporate Finance"],
  "BCOM": ["Corporate Accounting", "Income Tax Laws", "Cost Accounting", "Auditing", "Business Law"],
  "MCOM": ["Advanced Financial Management", "International Accounting", "E-Commerce", "Statistical Analysis", "Business Research Methods"]
};

const STREAMS = Object.keys(STREAM_DATA);

const INITIAL_STUDENTS = [
  { id: 101, name: "Arjun Sharma", fatherName: "Rajesh Sharma", phone: "9876543210", address: "Sector 15, Gandhinagar" },
  { id: 102, name: "Priya Patel", fatherName: "Suresh Patel", phone: "9123456789", address: "Satellite Area, Ahmedabad" },
  { id: 103, name: "Rahul Verma", fatherName: "Manoj Verma", phone: "8877665544", address: "Vastrapur, Ahmedabad" },
  { id: 104, name: "Anjali Gupta", fatherName: "Vijay Gupta", phone: "9900112233", address: "Adajan, Surat" },
];

// --- Cosmic Nuclear Style System ---
const glassStyle = "backdrop-blur-3xl bg-white/5 border border-white/10 shadow-2xl hover:border-lime-400/30 transition-all duration-500";
const cosmicInput = "bg-black/40 border border-white/5 text-violet-50 placeholder-white/20 focus:border-lime-400/40 focus:bg-black/60 transition-all outline-none text-xs";
const cosmicBtn = "bg-gradient-to-br from-violet-600 to-indigo-700 hover:from-lime-500 hover:to-lime-600 text-white shadow-lg active:scale-95 transition-all duration-500 font-bold uppercase tracking-wider";

// --- 3D Spatial Component ---
const SpatialCard = ({ children, className = "", onClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return; // Disable tilt on mobile for better UX
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onClick}
      className={`${glassStyle} rounded-2xl p-4 md:p-5 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.1s ease-out, border 0.3s ease'
      }}
    >
      {children}
    </div>
  );
};

// --- Confetti Animation ---
const Confetti = () => {
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#A3E635', '#7C3AED', '#06B6D4', '#F43F5E'][Math.floor(Math.random() * 4)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

// --- Footer Component ---
const AppFooter = () => (
  <footer className="mt-auto py-6 px-4 text-center opacity-40 hover:opacity-100 transition-opacity duration-700">
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2 mb-1">
        <div className="hidden sm:block h-[1px] w-8 bg-gradient-to-r from-transparent to-lime-400/50"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
          Created by <span className="text-lime-400">Dharam Rathod</span>
        </p>
        <div className="hidden sm:block h-[1px] w-8 bg-gradient-to-l from-transparent to-lime-400/50"></div>
      </div>
      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-violet-400">
        &copy; {new Date().getFullYear()} Dharam Presence. All Rights Reserved.
      </p>
    </div>
  </footer>
);

const App = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [teacherIdentity, setTeacherIdentity] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState('teacher');
  const [teacherView, setTeacherView] = useState('marking');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPwInput, setAdminPwInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [selectedStream, setSelectedStream] = useState(STREAMS[0]);
  const [selectedSemester, setSelectedSemester] = useState(SEMESTERS[0]);
  const [selectedDivision, setSelectedDivision] = useState(DIVISIONS[0]);
  const [selectedSubject, setSelectedSubject] = useState(STREAM_DATA[STREAMS[0]][0]);
  const [students, setStudents] = useState(INITIAL_STUDENTS.map(s => ({ ...s, status: null })));
  const [newStudent, setNewStudent] = useState({ name: '', id: '', fatherName: '', phone: '', address: '' });
  const [records, setRecords] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [viewingProfile, setViewingProfile] = useState(null);

  useEffect(() => {
    setSelectedSubject(STREAM_DATA[selectedStream][0]);
  }, [selectedStream]);

  const playSfx = (freq = 440, type = 'sine', duration = 0.1) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) { }
  };

  const playPartyChime = () => {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => playSfx(freq, 'triangle', 0.6), i * 150);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBootProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsBooting(false), 500);
          return 100;
        }
        return p + 4;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    init();
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = collection(db, 'artifacts', appId, 'public', 'data', 'attendance_records');
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setRecords(data);
    });
    return () => unsub();
  }, [user]);

  const handleTeacherLogin = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      showToast("Access Denied: Identify Yourself", "error");
      return;
    }
    setTeacherIdentity({ name: String(nameInput) });
    setShowConfetti(true);
    playPartyChime();
    setTimeout(() => setShowConfetti(false), 5000);
    showToast(`Welcome Prof. ${nameInput}`);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setTeacherIdentity(null);
    setIsAdminAuthenticated(false);
    setTeacherView('marking');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminIdInput === ADMIN_ID && adminPwInput === ADMIN_PW) {
      setIsAdminAuthenticated(true);
      playSfx(1000, 'square', 0.1);
      showToast("Security Clearance Granted");
    } else {
      setAdminError("Verification Failed");
    }
  };

  const markStatus = (id, status) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: String(status) } : s));
    playSfx(status === 'present' ? 880 : 330, 'sine', 0.05);
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    playSfx(200, 'sine', 0.1);
  };

  const addNewStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.id) return;
    setStudents(prev => [...prev, { ...newStudent, status: null }]);
    setNewStudent({ name: '', id: '', fatherName: '', phone: '', address: '' });
    showToast("Registry Updated");
  };

  const submitToAdmin = async () => {
    if (students.some(s => s.status === null)) {
      showToast("Marking Incomplete", "error");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        teacherName: String(teacherIdentity.name),
        stream: String(selectedStream),
        semester: String(selectedSemester),
        division: String(selectedDivision),
        subject: String(selectedSubject),
        date: new Date().toLocaleDateString(),
        timestamp: serverTimestamp(),
        attendance: students.map(s => ({ ...s, status: String(s.status) })),
        totalPresent: Number(students.filter(s => s.status === 'present').length),
        totalStudents: Number(students.length)
      };
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'attendance_records'), payload);
      showToast("Data Synced Successfully");
      setStudents(prev => prev.map(s => ({ ...s, status: null })));
    } catch (err) { showToast("Sync Error", "error"); }
    finally { setSubmitting(false); }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message: String(message), type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredRecords = records.filter(r => {
    const s = searchTerm.toLowerCase();
    return String(r.teacherName || "").toLowerCase().includes(s) || String(r.subject || "").toLowerCase().includes(s);
  });

  const teacherHistory = records.filter(r => String(r.teacherName).toLowerCase() === String(teacherIdentity?.name || "").toLowerCase());

  if (isBooting) return (
    <div className="h-screen bg-[#05050A] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden relative font-sans text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.25),transparent_70%)] animate-pulse"></div>
      <div className="relative z-10 w-full max-w-xs">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-violet-600/10 rounded-2xl border border-violet-500/40 flex items-center justify-center animate-bounce shadow-[0_0_50px_rgba(139,92,246,0.3)]">
            <Orbit className="text-lime-400 animate-spin-slow" size={32} />
          </div>
        </div>
        <h1 className="text-xl font-black tracking-[0.5em] text-white uppercase italic mb-6">DHARAM PRESENCE</h1>
        <div className="w-full bg-white/5 h-0.5 rounded-full overflow-hidden mb-3 text-left">
          <div className="h-full bg-lime-400 transition-all duration-300 shadow-[0_0_10px_rgba(163,230,53,0.8)]" style={{ width: `${bootProgress}%` }}></div>
        </div>
        <div className="flex justify-between text-[8px] text-violet-400 uppercase font-black tracking-widest px-1">
          <span>Initializing</span>
          <span>{bootProgress}%</span>
        </div>
      </div>
    </div>
  );

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#020205] text-violet-50 font-sans selection:bg-lime-500/30 overflow-x-hidden text-[12px]">
      {showConfetti && <Confetti />}

      {/* --- CGI DYNAMIC BACKGROUND --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="bubble-sphere bg-violet-600/15 w-[50vw] h-[50vw] top-[-10%] left-[-10%] animate-bubble-1 blur-[100px]"></div>
        <div className="bubble-sphere bg-emerald-600/10 w-[40vw] h-[40vw] bottom-[-10%] right-[-5%] animate-bubble-2 blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(violet 1px, transparent 1px), linear-gradient(90deg, violet 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
      </div>

      <div className="flex-grow flex flex-col relative z-10 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">
        {!teacherIdentity ? (
          /* --- LOGIN --- */
          <div className="flex-grow flex items-center justify-center p-2">
            <SpatialCard className="max-w-xs w-full text-center border-white/5 p-6 md:p-8">
              <div className="mb-6 flex justify-center">
                <div className="w-14 h-14 bg-black/40 rounded-full flex items-center justify-center border border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
                  <Radio className="text-lime-400 animate-pulse" size={20} />
                </div>
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-white mb-0.5 italic uppercase leading-none">Dharam Presence</h1>
              <p className="text-violet-500 font-bold uppercase tracking-[0.4em] text-[7px] mb-10">Neural Interface v3.5</p>

              <form onSubmit={handleTeacherLogin} className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-900 group-focus-within:text-lime-400 transition-colors" size={14} />
                  <input
                    type="text" autoFocus value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Identity Name"
                    className={`${cosmicInput} w-full py-3.5 pl-10 pr-4 rounded-xl font-bold text-center text-sm`}
                  />
                </div>
                <button type="submit" className={`${cosmicBtn} w-full py-3.5 rounded-xl text-[9px] flex items-center justify-center gap-2`}>
                  <LogIn size={14} /> Authenticate Link
                </button>
              </form>
            </SpatialCard>
          </div>
        ) : (
          /* --- SYSTEM INTERFACE --- */
          <div className="w-full flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-700">
            <nav className={`${glassStyle} rounded-2xl px-4 md:px-6 py-2.5 flex items-center justify-between sticky top-4 z-50 border-white/5`}>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 bg-violet-600 rounded-lg">
                  <Activity size={14} className="text-white" />
                </div>
                <h2 className="font-black text-[10px] md:text-[11px] uppercase tracking-tighter text-white italic leading-none">DHARAM <span className="text-lime-400">PRESENCE</span></h2>
              </div>

              <div className="flex bg-black/50 p-1 rounded-xl border border-white/5">
                <button onClick={() => { setDepartment('teacher'); setSelectedRecord(null); }} className={`px-4 md:px-6 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${department === 'teacher' ? 'bg-violet-600 text-white' : 'text-slate-500'}`}>Teacher</button>
                <button onClick={() => setDepartment('admin')} className={`px-4 md:px-6 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${department === 'admin' ? 'bg-violet-600 text-white' : 'text-slate-500'}`}><Lock size={10} /> Admin</button>
              </div>

              <button onClick={handleLogout} className="p-2 hover:bg-rose-500/20 rounded-full text-slate-500 transition-all">
                <LogOut size={16} />
              </button>
            </nav>

            <main className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {department === 'teacher' ? (
                <>
                  {/* Left Sidebar Stacks on mobile */}
                  <div className="lg:col-span-3 flex flex-col gap-5">
                    <SpatialCard>
                      <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center font-black text-xs text-violet-400 uppercase">
                          {String(teacherIdentity.name).charAt(0)}
                        </div>
                        <h3 className="font-black text-white text-[11px] truncate uppercase">Prof. {String(teacherIdentity.name)}</h3>
                      </div>

                      <div className="flex flex-row lg:flex-col gap-2 mb-6">
                        <button onClick={() => setTeacherView('marking')} className={`flex-1 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${teacherView === 'marking' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                          <BookOpen size={12} /> Roll Call
                        </button>
                        <button onClick={() => setTeacherView('history')} className={`flex-1 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${teacherView === 'history' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                          <History size={12} /> Archive
                        </button>
                      </div>

                      {teacherView === 'marking' && (
                        <div className="space-y-3 pt-3 border-t border-white/5">
                          <div>
                            <label className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Stream</label>
                            <select value={selectedStream} onChange={(e) => setSelectedStream(e.target.value)} className={`${cosmicInput} w-full py-2 px-3 rounded-lg font-bold text-[10px]`}>
                              {STREAMS.map(s => <option key={s} value={s} className="bg-[#050508]">{String(s)}</option>)}
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Semester</label>
                              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className={`${cosmicInput} w-full py-2 px-3 rounded-lg font-bold text-[10px]`}>
                                {SEMESTERS.map(x => <option key={String(x)} value={String(x)} className="bg-[#050508]">{String(x)}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Division</label>
                              <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)} className={`${cosmicInput} w-full py-2 px-3 rounded-lg font-bold text-[10px]`}>
                                {DIVISIONS.map(x => <option key={String(x)} value={String(x)} className="bg-[#050508]">{String(x)}</option>)}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Subject</label>
                            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className={`${cosmicInput} w-full py-2 px-3 rounded-lg font-bold text-[10px]`}>
                              {STREAM_DATA[selectedStream].map(sub => <option key={sub} value={sub} className="bg-[#050508]">{String(sub)}</option>)}
                            </select>
                          </div>
                        </div>
                      )}
                    </SpatialCard>

                    {teacherView === 'marking' && (
                      <SpatialCard className="bg-lime-400/5">
                        <h4 className="text-[7px] font-black uppercase text-lime-400 mb-3 flex items-center gap-2"><UserPlus size={10} /> Add Node</h4>
                        <form onSubmit={addNewStudent} className="space-y-2">
                          <input type="text" placeholder="Student Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className={`${cosmicInput} w-full py-2 px-3 rounded-lg text-[9px] font-bold`} />
                          <input type="number" placeholder="Roll No" value={newStudent.id} onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })} className={`${cosmicInput} w-full py-2 px-3 rounded-lg text-[9px] font-bold`} />
                          <button type="submit" className={`${cosmicBtn} w-full py-2 rounded-lg text-[7px]`}>Register</button>
                        </form>
                      </SpatialCard>
                    )}
                  </div>

                  {/* Right Main Area */}
                  <div className="lg:col-span-9">
                    {teacherView === 'marking' ? (
                      <div className={`${glassStyle} rounded-[32px] overflow-hidden flex flex-col h-full`}>
                        <div className="px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center bg-black/10 gap-6">
                          <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic">{String(selectedSubject)}</h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                              <span className="px-3 py-1 bg-lime-400/10 rounded-full text-[7px] font-black text-lime-400 border border-lime-400/20 uppercase tracking-widest">{String(selectedStream)}</span>
                              <span className="px-3 py-1 bg-violet-600/10 rounded-full text-[7px] font-black text-violet-400 border border-violet-400/20 uppercase tracking-widest">{String(selectedSemester)}</span>
                            </div>
                          </div>
                          <div className="text-center md:text-right">
                            <div className="text-4xl md:text-5xl font-black text-lime-400 leading-none">
                              {students.filter(s => s.status === 'present').length}<span className="text-lg text-slate-700">/{students.length}</span>
                            </div>
                            <p className="text-[7px] font-black text-violet-600 uppercase mt-2 tracking-widest italic">Presence Hub</p>
                          </div>
                        </div>

                        <div className="max-h-[500px] overflow-y-auto px-4 md:px-6 py-4 space-y-2 custom-scrollbar">
                          {students.length === 0 ? (
                            <div className="py-20 text-center opacity-20 uppercase font-black text-[10px]">No Nodes Active</div>
                          ) : (
                            students.map((s) => (
                              <div key={String(s.id)} className={`p-2.5 md:p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between transition-all duration-500 hover:bg-white/5 border border-transparent gap-4 ${s.status === 'present' ? 'bg-violet-600/5 ring-1 ring-violet-400/20' : s.status === 'absent' ? 'bg-rose-600/5 ring-1 ring-rose-400/30' : 'bg-black/20'}`}>
                                <div className="flex items-center gap-4 w-full">
                                  <button onClick={() => deleteStudent(s.id)} className="hidden sm:block opacity-0 group-hover:opacity-100 p-1.5 hover:bg-rose-600 rounded-lg text-slate-600 hover:text-white transition-all"><Trash2 size={12} /></button>
                                  <div onClick={() => setViewingProfile(s)} className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shadow-lg cursor-pointer ${s.status === 'present' ? 'bg-violet-600 text-white' : s.status === 'absent' ? 'bg-rose-600 text-white' : 'bg-black/60 border border-white/5 text-slate-700'}`}>
                                    {String(s.name).charAt(0)}
                                  </div>
                                  <div onClick={() => setViewingProfile(s)} className="cursor-pointer overflow-hidden text-left">
                                    <h3 className="text-sm font-black text-white group-hover:text-lime-400 transition-colors uppercase italic truncate">{String(s.name)}</h3>
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-1">ID: #{String(s.id)}</p>
                                  </div>
                                  <button onClick={() => deleteStudent(s.id)} className="sm:hidden ml-auto p-1.5 hover:bg-rose-600 rounded-lg text-slate-600 hover:text-white"><Trash2 size={12} /></button>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                  <button onClick={() => markStatus(s.id, 'present')} className={`flex-1 sm:flex-none px-6 md:px-8 py-2 md:py-2.5 rounded-full font-black text-[8px] uppercase tracking-widest border transition-all ${s.status === 'present' ? 'bg-violet-600 border-violet-400 text-white' : 'border-white/5 text-slate-600'}`}>Present</button>
                                  <button onClick={() => markStatus(s.id, 'absent')} className={`flex-1 sm:flex-none px-6 md:px-8 py-2 md:py-2.5 rounded-full font-black text-[8px] uppercase tracking-widest border transition-all ${s.status === 'absent' ? 'bg-rose-600 border-rose-400 text-white' : 'border-white/5 text-slate-600'}`}>Absent</button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="p-6 bg-black/30 border-t border-white/5 mt-auto">
                          <button disabled={submitting} onClick={submitToAdmin} className={`${cosmicBtn} w-full py-4 rounded-2xl text-xs italic`}>
                            {submitting ? "Transmitting..." : "Sync Core Registry"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Archive View */
                      <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
                          <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">Record Archive</h2>
                          <p className="text-[9px] font-black text-violet-500 tracking-widest uppercase bg-white/5 px-4 py-1.5 rounded-full">User: {String(teacherIdentity.name)}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {teacherHistory.length === 0 ? (
                            <div className="col-span-full py-20 text-center opacity-40 uppercase font-black italic tracking-widest">No Logs Found</div>
                          ) : (
                            teacherHistory.map((r) => (
                              <SpatialCard key={r.id} onClick={() => setSelectedRecord(r)}>
                                <div className="flex justify-between items-start mb-4">
                                  <div className="overflow-hidden pr-4">
                                    <h3 className="font-black text-white text-sm italic uppercase leading-none truncate">{String(r.subject)}</h3>
                                    <p className="text-[7px] text-lime-400 font-bold uppercase tracking-widest mt-2">{String(r.stream)} • {String(r.division)}</p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <span className="text-lime-400 font-black text-lg">{String(r.totalPresent)}</span>
                                  </div>
                                </div>
                                <div className="pt-3 border-t border-white/5 flex justify-between text-[7px] font-black text-slate-600 uppercase tracking-widest">
                                  <span>{String(r.date)}</span>
                                  <span className="text-violet-500">{r.timestamp?.toDate ? r.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Syncing'}</span>
                                </div>
                              </SpatialCard>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* --- ADMIN --- */
                <div className="lg:col-span-12 w-full">
                  {!isAdminAuthenticated ? (
                    <div className="max-w-xs mx-auto mt-10 md:mt-20 p-1 rounded-3xl bg-gradient-to-br from-violet-600 to-lime-500 shadow-2xl">
                      <div className="bg-black p-8 rounded-[22px] text-center backdrop-blur-3xl">
                        <Lock size={28} className="text-lime-400 mx-auto mb-4" />
                        <h2 className="text-lg font-black text-white uppercase italic mb-8 tracking-widest">Admin Hub</h2>
                        <form onSubmit={handleAdminLogin} className="space-y-4">
                          <input type="text" placeholder="ID" value={adminIdInput} onChange={(e) => setAdminIdInput(e.target.value)} className={`${cosmicInput} w-full py-3 px-4 rounded-xl text-center`} />
                          <input type="password" placeholder="Pass" value={adminPwInput} onChange={(e) => setAdminPwInput(e.target.value)} className={`${cosmicInput} w-full py-3 px-4 rounded-xl text-center`} />
                          {adminError && <p className="text-rose-500 font-black text-[7px] uppercase pt-2 animate-pulse">{String(adminError)}</p>}
                          <button type="submit" className={`${cosmicBtn} w-full py-3.5 rounded-xl text-[9px] mt-4`}>Identify</button>
                        </form>
                      </div>
                    </div>
                  ) : selectedRecord ? (
                    /* Admin Record View */
                    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
                      <button onClick={() => setSelectedRecord(null)} className="mb-4 flex items-center gap-2 text-violet-400 font-black uppercase text-[8px] tracking-widest hover:text-white group">
                        <ArrowLeft size={14} /> Grid View
                      </button>
                      <div className={`${glassStyle} rounded-[40px] overflow-hidden`}>
                        <div className="p-6 md:p-10 bg-black/20 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                          <div className="flex flex-col md:flex-row items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-black text-4xl shadow-xl">
                              {String(selectedRecord.teacherName).charAt(0)}
                            </div>
                            <div>
                              <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic leading-none">{String(selectedRecord.teacherName)}</h2>
                              <p className="text-[10px] font-black text-violet-400 uppercase mt-2 tracking-widest">{String(selectedRecord.stream)} • {String(selectedRecord.subject)}</p>
                            </div>
                          </div>
                          <div className="px-10 py-5 bg-black/40 rounded-3xl text-center border border-white/5 backdrop-blur-2xl">
                            <div className="text-5xl font-black text-lime-400 leading-none">{String(selectedRecord.totalPresent)}</div>
                            <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mt-1">Verified</p>
                          </div>
                        </div>
                        <div className="p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {selectedRecord.attendance.map((s, i) => (
                            <div key={i} className={`${glassStyle} p-3 rounded-xl flex items-center justify-between`}>
                              <span className="font-black text-white text-[10px] truncate uppercase italic">{String(s.name)}</span>
                              {String(s.status) === 'present' ? <CheckCircle size={14} className="text-lime-400" /> : <XCircle size={14} className="text-rose-500" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Admin Master List */
                    <div className="animate-in fade-in duration-1000 w-full">
                      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                        <div className="text-center md:text-left">
                          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic opacity-80 leading-none">Dharam <span className="text-lime-400">Presence</span></h2>
                          <p className="text-[8px] font-black text-violet-600 uppercase tracking-[0.4em] mt-2 ml-1 italic">Master Archive Feed</p>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <div className="relative flex-grow md:flex-none">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-900 group-focus-within:text-lime-400" size={14} />
                            <input
                              type="text" placeholder="Global Scan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                              className={`${cosmicInput} w-full md:w-[260px] py-2.5 pl-10 pr-6 rounded-full font-bold text-xs`}
                            />
                          </div>
                          <button onClick={() => showToast("Downloading Master Log...")} className="p-2.5 bg-white/5 rounded-full text-lime-400 border border-white/5 hover:bg-lime-400 hover:text-black transition-all">
                            <Download size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredRecords.map((r) => (
                          <SpatialCard key={r.id} onClick={() => setSelectedRecord(r)}>
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-10 h-10 flex-shrink-0 bg-slate-900 rounded-xl border border-violet-500/30 flex items-center justify-center font-black text-xl text-violet-400">
                                {String(r.teacherName).charAt(0)}
                              </div>
                              <div className="overflow-hidden text-left">
                                <h3 className="font-black text-white text-sm truncate uppercase italic leading-none">{String(r.teacherName)}</h3>
                                <p className="text-[8px] text-lime-400 font-black uppercase tracking-widest mt-1.5">{String(r.stream)}</p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                              <span className="text-slate-600 font-black text-[8px] uppercase">{String(r.date)}</span>
                              <span className="text-lime-400 font-black text-[8px] uppercase tracking-widest bg-lime-400/5 px-2 py-0.5 rounded-lg border border-lime-400/10">{String(r.totalPresent)} P</span>
                            </div>
                          </SpatialCard>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* --- REFINED POP-UP MODAL: PROFILE --- */}
      {viewingProfile && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-[100px] animate-in fade-in duration-500">
          <div className={`${glassStyle} w-full max-w-sm rounded-[32px] overflow-hidden border-white/5 shadow-2xl scale-90 sm:scale-100`}>
            <div className="bg-gradient-to-b from-violet-950/40 to-black p-8 text-center border-b border-white/5">
              <button onClick={() => setViewingProfile(null)} className="absolute top-6 right-6 text-slate-600 hover:text-lime-400 transition-all"><X size={20} /></button>
              <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white/5 animate-float">
                <span className="text-3xl font-black text-white">{String(viewingProfile.name).charAt(0)}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">{String(viewingProfile.name)}</h3>
              <p className="text-lime-400 font-black uppercase tracking-[1em] text-[7px] mt-4 opacity-60">Identity Node</p>
            </div>
            <div className="p-8 space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Father's Node</p>
                  <p className="font-black text-white text-xs truncate">{String(viewingProfile.fatherName || 'Unregistered')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Digital Link</p>
                  <p className="font-black text-white text-xs">{String(viewingProfile.phone || 'Offline')}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex gap-3 shadow-inner">
                <MapPin size={12} className="text-lime-400 shrink-0" />
                <p className="text-[10px] font-bold text-slate-400 leading-tight italic">"{String(viewingProfile.address || 'Geo-Locked.')}"</p>
              </div>
            </div>
            <div className="p-6 text-center bg-black/40">
              <button onClick={() => setViewingProfile(null)} className={`${cosmicBtn} px-10 py-2.5 rounded-lg text-[8px] italic`}>Dismiss Scan</button>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER SECTION --- */}
      <AppFooter />

      {/* Celebration Toast */}
      {toast && (
        <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-10 py-5 rounded-full shadow-[0_30px_100px_rgba(0,0,0,1)] text-white flex items-center gap-6 transition-all z-[300] animate-in fade-in slide-in-from-bottom-20 backdrop-blur-[100px] border border-white/10 ${toast.type === 'success' ? 'bg-violet-600/90' : 'bg-rose-600/90'}`}>
          <PartyPopper size={24} className="text-lime-400 animate-bounce" />
          <span className="font-black text-2xl md:text-3xl tracking-tighter uppercase italic drop-shadow-xl">{String(toast.message)}</span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;900&display=swap');
        * { font-family: 'Outfit', sans-serif; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
        .confetti-piece { position: absolute; width: 6px; height: 10px; opacity: 0.8; top: -10px; animation: confetti-fall linear forwards; border-radius: 2px; }
        @keyframes confetti-fall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes bubbleMove1 { 0% { transform: translate(0px, 0px) scale(1) rotate(0deg); } 50% { transform: translate(10%, 15%) scale(1.15) rotate(8deg); } 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); } }
        @keyframes bubbleMove2 { 0% { transform: translate(0px, 0px) scale(1.1) rotate(0deg); } 50% { transform: translate(-10%, -15%) scale(1) rotate(-8deg); } 100% { transform: translate(0px, 0px) scale(1.1) rotate(0deg); } }
        .animate-bubble-1 { animation: bubbleMove1 20s ease-in-out infinite; }
        .animate-bubble-2 { animation: bubbleMove2 25s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 15s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.2); border-radius: 50px; }
        .bubble-sphere { position: absolute; border-radius: 50%; }
        .leading-none { line-height: 1; }
      `}} />
    </div>
  );
};

export default App;