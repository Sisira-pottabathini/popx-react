import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

const PhoneShell = ({ children, title }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-[280px] h-[600px] bg-white border border-gray-300 shadow-sm overflow-hidden flex flex-col">
      {title ? (
        <div className="px-4 py-2 border-b border-gray-300 text-sm text-gray-600 font-medium">{title}</div>
      ) : null}
      <div className="p-4 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  </div>
);

const PrimaryButton = ({ children, disabled, className = "", ...rest }) => (
  <button
    disabled={disabled}
    className={
      "w-full px-3 py-2 text-white text-sm font-medium " +
      (disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-violet-600 hover:bg-violet-700 transition") +
      " " + className
    }
    {...rest}
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, className = "", ...rest }) => (
  <button
    className={"w-full px-4 py-3 font-medium mt-2 bg-violet-100 text-violet-700 " + className}
    {...rest}
  >
    {children}
  </button>
);

const Input = ({ label, required, type = "text", ...rest }) => (
  <label className="block">
    <div className="text-xs text-gray-700 mb-1">
      {label}
      {required && <span className="text-rose-500">*</span>}
    </div>
    <input
      type={type}
      className="w-full border-0 border-b border-gray-300 px-0 py-1 text-sm focus:outline-none focus:border-b-violet-500 rounded-none bg-transparent"
      {...rest}
    />
  </label>
);

const Welcome = () => (
  <PhoneShell>
    {/* Empty space to push content to bottom */}
    <div className="flex-1"></div>
    
    <div className="mt-auto">
      <h1 className="text-xl font-semibold text-gray-900 mb-2 text-left">Welcome to PopX</h1>
      <p className="text-xs text-gray-500 mb-6 text-left leading-4">
        Lorem ipsum dolor sit amet,<br />
        consectetur adipiscing elit.
      </p>

      <Link to="/create">
        <PrimaryButton className="rounded-none">Create Account</PrimaryButton>
      </Link>
      <Link to="/login">
        <SecondaryButton className="rounded-none">Already Registered? Login</SecondaryButton>
      </Link>
    </div>
  </PhoneShell>
);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canLogin = email.length > 0 && password.length > 0;
  const navigate = useNavigate();

  return (
    <PhoneShell>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Signin to your<br/>PopX account</h1>
        <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      
      <div className="space-y-4 flex-1">
        <Input label="Email Address" placeholder="Enter email address" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input label="Password" type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      
      <div className="mt-auto">
        <PrimaryButton disabled={!canLogin} onClick={()=>navigate('/account')}>Login</PrimaryButton>
      </div>
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
      {/* Header with exact spacing */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
          Create your<br/>PopX account
        </h1>
      </div>

      {/* Form fields with exact spacing */}
      <div className="space-y-3 flex-1">
        <Input label="Full Name" required placeholder="Marry Doe" value={form.name} onChange={onChange('name')} />
        <Input label="Phone number" required placeholder="Marry Doe" value={form.phone} onChange={onChange('phone')} />
        <Input label="Email address" required placeholder="Marry Doe" value={form.email} onChange={onChange('email')} />
        <Input label="Password" required placeholder="Marry Doe" type="password" value={form.password} onChange={onChange('password')} />
        <Input label="Company name" placeholder="Marry Doe" value={form.company} onChange={onChange('company')} />
        {/* Radio buttons section */}
        <div className="mt-2">
          <div className="text-xs text-gray-700 mb-1 font-medium">Are you an Agency?*</div>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-1 text-xs text-gray-700">
              <input 
                type="radio" 
                name="agency" 
                className="w-3 h-3 accent-violet-600" 
                checked={form.agency === 'yes'} 
                onChange={() => setForm({...form, agency: 'yes'})} 
              />
              Yes
            </label>
            <label className="inline-flex items-center gap-1 text-xs text-gray-700">
              <input 
                type="radio" 
                name="agency" 
                className="w-3 h-3 accent-violet-600" 
                checked={form.agency === 'no'} 
                onChange={() => setForm({...form, agency: 'no'})} 
              />
              No
            </label>
          </div>
        </div>
      </div>

      {/* Button with exact spacing */}
      <div className="mt-3">
        <PrimaryButton disabled={!ready} onClick={() => navigate('/account')}>
          Create Account
        </PrimaryButton>
      </div>
    </PhoneShell>
  );
};

const Account = () => (
  <PhoneShell title="Account Settings">
    <div className="flex items-start gap-3 mb-4">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop"
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0 bg-violet-600 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
            <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">Marry Doe</div>
        <div className="text-xs text-gray-500">Marry@Gmail.Com</div>
      </div>
    </div>

    <p className="text-[11px] leading-5 text-gray-600">
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
