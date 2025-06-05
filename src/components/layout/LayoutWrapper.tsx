import {Layout} from "@components/layout/Layout.tsx";
import {Outlet} from "react-router-dom";

export const LayoutWrapper = () => (
    <Layout>
        <Outlet />
    </Layout>
);