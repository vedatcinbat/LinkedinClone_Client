import React, {ReactNode} from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="w-full flex flex-col min-h-screen">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="w-full main-content flex-1 overflow-y-auto">
                {children}
            </div>
            <div className="bg-gray-800 text-white p-4 text-center absolute bottom-0 w-full">
                <Footer />
            </div>
        </div>
    )
}

export default Layout;
