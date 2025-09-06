
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

const PhoneShell = ({ children, title }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-[320px] sm:w-[360px] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {title ? (
        <div className="px-4 py-3 border-b text-sm text-gray-600 font-medium">{title}</div>
      ) : null}
      <div className="p-4">{children}</div>
    </div>
  </div>
);

const PrimaryButton = ({ children, disabled, ...rest }) => (
  <button
    disabled={disabled}
    className={
      "w-full rounded-xl px-4 py-3 text-white font-medium mt-2 " +
      (disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-gradient-to-r from-[#6a00ff] to-[#8b5cf6] hover:opacity-95 transition")
    }
    {...rest}
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, ...rest }) => (
  <button
    className="w-full rounded-xl px-4 py-3 font-medium mt-2 bg-violet-100 text-violet-700"
    {...rest}
  >
    {children}
  </button>
);

const Input = ({ label, required, type = "text", ...rest }) => (
  <label className="block mb-3">
    <div className="text-xs text-violet-600 mb-1">
      {label}
      {required && <span className="text-rose-500"> *</span>}
    </div>
    <input
      type={type}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
      {...rest}
    />
  </label>
);

const Welcome = () => (
  <PhoneShell>
    <div className="mt-40" />
    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to PopX</h1>
    <p className="text-sm text-gray-500 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

    <Link to="/create">
      <PrimaryButton>Create Account</PrimaryButton>
    </Link>
    <Link to="/login">
      <SecondaryButton>Already Registered? Login</SecondaryButton>
    </Link>
  </PhoneShell>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canLogin = email.length > 0 && password.length > 0;
  const navigate = useNavigate();

  return (
    <PhoneShell>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Signin to your<br/>PopX account</h1>
      <p className="text-sm text-gray-500 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Input label="Email Address" placeholder="Enter email address" value={email} onChange={e=>setEmail(e.target.value)} />
      <Input label="Password" type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
      <PrimaryButton disabled={!canLogin} onClick={()=>navigate('/account')}>Login</PrimaryButton>
    </PhoneShell>
  );
};

const CreateAccount = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "yes",
  });
  const navigate = useNavigate();

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const ready = form.name && form.phone && form.email && form.password;

  return (
    <PhoneShell>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create your<br/>PopX account</h1>

      <Input label="Full Name" required placeholder="Marry Doe" value={form.name} onChange={onChange('name')} />
      <Input label="Phone number" required placeholder="Marry Doe" value={form.phone} onChange={onChange('phone')} />
      <Input label="Email address" required placeholder="Marry Doe" value={form.email} onChange={onChange('email')} />
      <Input label="Password" required placeholder="Marry Doe" type="password" value={form.password} onChange={onChange('password')} />
      <Input label="Company name" placeholder="Marry Doe" value={form.company} onChange={onChange('company')} />

      <div className="mb-3">
        <div className="text-xs text-violet-600 mb-2">Are you an Agency?</div>
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="agency" className="accent-violet-600" checked={form.agency==='yes'} onChange={()=>setForm({...form, agency:'yes'})} />
            Yes
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="agency" className="accent-violet-600" checked={form.agency==='no'} onChange={()=>setForm({...form, agency:'no'})} />
            No
          </label>
        </div>
      </div>

      <PrimaryButton disabled={!ready} onClick={()=>navigate('/account')}>Create Account</PrimaryButton>
    </PhoneShell>
  );
};

const Account = () => (
  <PhoneShell title="Account Settings">
    <div className="flex items-start gap-3">
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop"
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="text-sm font-medium text-gray-900">Marry Doe</div>
        <div className="text-xs text-gray-500">Marry@gmail.Com</div>
      </div>
      <div className="ml-auto mt-1" title="Verified">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-violet-600">
          <path fillRule="evenodd" d="M12 2a1 1 0 0 1 .707.293l2.121 2.12 2.829-.707a1 1 0 0 1 1.213.97l-.001 2.9 2.5 1.667a1 1 0 0 1 0 1.66l-2.5 1.667.001 2.9a1 1 0 0 1-1.213.97l-2.83-.707-2.12 2.12a1 1 0 0 1-1.415 0l-2.12-2.12-2.83.707a1 1 0 0 1-1.213-.97l.001-2.9-2.5-1.667a1 1 0 0 1 0-1.66l2.5-1.667-.001-2.9a1 1 0 0 1 1.213-.97l2.83.707 2.12-2.12A1 1 0 0 1 12 2zm2.828 8.121a1 1 0 1 0-1.414-1.414L11 11.121l-1.414-1.414a1 1 0 0 0-1.414 1.414L9.586 12.5l-1.414 1.414a1 1 0 1 0 1.414 1.414L11 13.914l1.414 1.414a1 1 0 0 0 1.414-1.414L12.414 12.5l1.414-1.414z"/>
        </svg>
      </div>
    </div>

    <p className="text-[11px] leading-5 text-gray-600 mt-4">
      Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut
      Labore Et Dolore Magna Aliquyam Erat, Sed Diam
    </p>

    <div className="h-72 mt-6 border-t border-dashed" />

    <Link to="/">
      <SecondaryButton>Back to Welcome</SecondaryButton>
    </Link>
  </PhoneShell>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}
