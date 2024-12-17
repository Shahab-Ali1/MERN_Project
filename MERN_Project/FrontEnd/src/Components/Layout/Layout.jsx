import React from 'react';
import Header from '../GenericFiles/UI/Header';
import Sidebar from '../GenericFiles/UI/Sidebar';
import Footer from '../GenericFiles/UI/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sideBarWidth bg-gray-100 shadow-md hidden sm:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-2 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
