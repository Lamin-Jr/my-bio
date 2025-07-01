import {Layout} from "@components/layout/Layout.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "@components/layout/Footer.tsx";

export const LayoutWrapper = () => (
    <Layout>
        <Outlet />
        <Footer />
    </Layout>
);