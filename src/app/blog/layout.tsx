import { AuthContextProvider } from "../_utils/auth-context";
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      
      <AuthContextProvider>
        
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
          {/* <div className="w-full flex-none md:w-64">
            <SideNav />
          </div> */}
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </AuthContextProvider>
    );
  }