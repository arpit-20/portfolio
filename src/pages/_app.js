import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
// import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}