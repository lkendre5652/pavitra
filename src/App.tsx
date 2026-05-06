/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero } from './pages/Hero';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ProfileEdit } from './pages/ProfileEdit';
import { SuccessStories } from './pages/SuccessStories';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/success-stories" element={<SuccessStories />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

