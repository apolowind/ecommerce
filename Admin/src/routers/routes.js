import React, { Suspense, lazy } from "react";
import { Layout } from 'antd';
import { withRouter } from "react-router";
import Footer from '../components/layout/footer/footer';
import Header from '../components/layout/header/header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import NotFound from '../components/notFound/notFound';
import Sidebar from '../components/layout/sidebar/sidebar';
import LoadingScreen from '../components/loading/loadingScreen';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

const { Content } = Layout;

const Login = lazy(() => {
    return Promise.all([
        import('../pages/Login/login'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});


const DotGiamGiaList = lazy(() => {
    return Promise.all([
        import('../pages/Admin/DotGiamGiaList.js'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const DotGiamGiaDetail = lazy(() => {
    return Promise.all([
        import('../pages/Admin/DotGiamGiaDetail.js'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const AccountManagement = lazy(() => {
    return Promise.all([
        import('../pages/AccountManagement/accountManagement'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Notification = lazy(() => {
    return Promise.all([
        import('../pages/Notifications/notification'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});


const ProductList = lazy(() => {
    return Promise.all([
        import('../pages/ProductList/productList'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const CategoryList = lazy(() => {
    return Promise.all([
        import('../pages/CategoryList/categoryList'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const DashBoard = lazy(() => {
    return Promise.all([
        import('../pages/DashBoard/dashBoard'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const NewsList = lazy(() => {
    return Promise.all([
        import('../pages/News/news'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Profile = lazy(() => {
    return Promise.all([
        import('../pages/Profile/profile'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const ChangePassword = lazy(() => {
    return Promise.all([
        import('../pages/ChangePassword/changePassword'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const OrderList = lazy(() => {
    return Promise.all([
        import('../pages/OrderList/orderList'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const OrderDetail = lazy(() => {
    return Promise.all([
        import('../pages/OrderDetail/orderDetail'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const Suppliers = lazy(() => {
    return Promise.all([
        import('../pages/Suppliers/suppliers'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
})

const Hang = lazy(() => {
    return Promise.all([
        import('../pages/Admin/HangManagement.js'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
})

const ResetPassword = lazy(() => {
    return Promise.all([
        import('../pages/ResetPassword/resetPassword'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const LoaiSanPham = lazy(() => {
    return Promise.all([
        import('../pages/Admin/LoaiSanPhamManagement.js'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const NhaCungCapManagement = lazy(() => {
    return Promise.all([
        import('../pages/Admin/NhaCungCapManagement.js'),
        new Promise(resolve => setTimeout(resolve, 0))
    ])
        .then(([moduleExports]) => moduleExports);
});

const RouterURL = withRouter(({ location }) => {

    const LoginContainer = () => (
        <div>
            <PublicRoute exact path="/">
                <Suspense fallback={<LoadingScreen />}>
                    <Login />
                </Suspense>
            </PublicRoute>
            <PublicRoute exact path="/news-list">
                <NewsList />
            </PublicRoute>
            <PublicRoute exact path="/login">
                <Login />
            </PublicRoute>
            <PublicRoute exact path="/reset-password/:id">
                <ResetPassword />
            </PublicRoute>
        </div>
    )

    const DefaultContainer = () => (
        <PrivateRoute>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout >
                    <Header />
                    <Content style={{ marginLeft: 230, width: 'calc(100% - 230px)', marginTop: 50 }}>
                        <PrivateRoute exact path="/dash-board">
                            <Suspense fallback={<LoadingScreen />}>
                                <DashBoard />
                            </Suspense>
                        </PrivateRoute>
                        <PrivateRoute exact path="/profile">
                            <Suspense fallback={<LoadingScreen />}>
                                <Profile />
                            </Suspense>
                        </PrivateRoute>
                        <PrivateRoute exact path="/notfound">
                            <NotFound />
                        </PrivateRoute>

                        <PrivateRoute exact path="/account-management">
                            <Suspense fallback={<LoadingScreen />}>
                                <AccountManagement />
                            </Suspense>
                        </PrivateRoute>

                        <PrivateRoute exact path="/notfound">
                            <NotFound /></PrivateRoute>


                        <PrivateRoute exact path="/nha-cung-cap-management">
                            <Suspense fallback={<LoadingScreen />}>
                                <NhaCungCapManagement />
                            </Suspense>
                        </PrivateRoute>
                        <PrivateRoute exact path="/product-list">
                            <Suspense fallback={<LoadingScreen />}>
                                <ProductList />
                            </Suspense>
                        </PrivateRoute>
                        <PrivateRoute exact path="/loai-san-pham">
                            <Suspense fallback={<LoadingScreen />}>
                                <LoaiSanPham />
                            </Suspense>
                        </PrivateRoute>
                        <PrivateRoute exact path="/dot-giam-gia">
                            <Suspense fallback={<LoadingScreen />}>
                                <DotGiamGiaList />
                            </Suspense>
                        </PrivateRoute>
                        <PrivateRoute exact path="/order-list">
                            <Suspense fallback={<LoadingScreen />}>
                                <OrderList />
                            </Suspense>
                        </PrivateRoute>
                        <PrivateRoute exact path="/order-details/:id">
                            <Suspense fallback={<LoadingScreen />}>
                                <OrderDetail />
                            </Suspense>
                        </PrivateRoute>

                        <PrivateRoute exact path="/change-password/:id">
                            <Suspense fallback={<LoadingScreen />}>
                                <ChangePassword />
                            </Suspense>
                        </PrivateRoute>

                        <PrivateRoute exact path="/hang">
                            <Suspense fallback={<LoadingScreen />}>
                                <Hang />
                            </Suspense>
                        </PrivateRoute>

                        <PrivateRoute exact path="/dot-giam-gia/:madgg">
                            <Suspense fallback={<LoadingScreen />}>
                                <DotGiamGiaDetail />
                            </Suspense>
                        </PrivateRoute>
                        
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </PrivateRoute >
    )

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LoginContainer />
                    </Route>
                    <Route exact path="/login">
                        <LoginContainer />
                    </Route>
                    <Route exact path="/dot-giam-gia">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/reset-password/:id">
                        <LoginContainer />
                    </Route>
                    <Route exact path="/dash-board">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/change-password/:id">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/account-create">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/account-management">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/nha-cung-cap-management">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/product-list">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/loai-san-pham">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/profile">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/order-list">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/order-details/:id">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/hang">
                        <DefaultContainer />
                    </Route>
                    <Route exact path="/dot-giam-gia/:madgg">
                        <DefaultContainer />
                    </Route>

                    
                    <Route exact path="/reset-password/:id">
                        <LoginContainer />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
})

export default RouterURL;
