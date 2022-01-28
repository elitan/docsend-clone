import { NhostAuthProvider } from "@nhost/react-auth";
import { nhost } from "./utils/nhost";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Dashboard } from "./components/Dashboard";
import { SignUp } from "./components/SignUp";
import { RequireAuth } from "./components/RequireAuth";
import { Layout } from "./components/Layout";
import { SignIn } from "./components/SignIn";
import { Docs } from "./components/Docs";
import { DocUpload } from "./components/DocUpload";
import { DocsBase } from "./components/DocsBase";
import { Doc } from "./components/Doc";
import { PublicDocument } from "./components/PublicDocumnet";

function App() {
  return (
    <BrowserRouter>
      <NhostAuthProvider nhost={nhost}>
        <AppRouter />
        <ToastContainer />
      </NhostAuthProvider>
    </BrowserRouter>
  );
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/d" element={<Outlet />}>
        <Route path=":id" element={<PublicDocument />} />
      </Route>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/docs" element={<DocsBase />}>
          <Route path="" element={<Docs />} />
          <Route path="new" element={<DocUpload />} />
          <Route path=":id" element={<Doc />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
