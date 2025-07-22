import {Layout} from "@components/layout/Layout.tsx";
import {Outlet} from "react-router";

export const LayoutWrapper = () => (
    <Layout>
        <Outlet/>
    </Layout>
);