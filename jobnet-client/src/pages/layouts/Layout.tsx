import React, {ReactNode} from "react";
import Navbar from "../../components/common/Navbar";
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {

    return (
        <div className="w-full flex flex-col min-h-screen">
            <div className="navbar">
                <Navbar />
            </div>
            <main className="w-full main-content">
                {children}
            </main>
        </div>
    )
}

export default Layout;
