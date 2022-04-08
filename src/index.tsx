import React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import LoginPage from "./pages/LoginPage/LoginPage";
import { SiteToaster } from "./components/SiteToaster/SiteToaster";
import HomePage from "./pages/HomePage/HomePage";
import BooksPage from "./pages/BooksPage/BooksPage";
import MembersPage from "./pages/MembersPage/MembersPage";
import App from "./components/App/App";
import RequestsPage from "./pages/RequestsPage/RequestsPage";
import ReturnsPage from "./pages/ReturnsPage/ReturnsPage";
import IssuesPage from "./pages/IssuesPage/IssuesPage";
import StatsPage from "./pages/StatsPage/StatsPage";
import { store } from "./store";
import BooksAddPage from "./pages/BooksPage/BooksAddPage/BooksAddPage";
import BooksListPage from "./pages/BooksPage/BooksListPage/BooksListPage";
import { injectStore } from "api";
import MembersAddPage from "pages/MembersPage/MembersAddPage/MembersAddPage";
import MembersListPage from "pages/MembersPage/MembersListPage/MembersListPage";
import IssuesAddPage from "pages/IssuesPage/IssuesAddPage/IssuesAddPage";

injectStore(store);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SiteToaster />
            <BrowserRouter>
                <App>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/books/add" element={<BooksAddPage />} />
                        <Route path="/books/edit/:id" element={<BooksAddPage edit={true} />} />
                        <Route path="/books/list" element={<BooksListPage />} />
                        <Route path="/members" element={<MembersPage />} />
                        <Route path="/members/add" element={<MembersAddPage />} />
                        <Route path="/members/edit/:id" element={<MembersAddPage edit={true} />} />
                        <Route path="/members/list" element={<MembersListPage />} />
                        <Route path="/issues" element={<IssuesPage />} />
                        <Route path="/issues/add" element={<IssuesAddPage />} />
                        <Route path="/issues/list" element={<IssuesPage />} />
                        <Route path="/returns" element={<ReturnsPage />} />
                        <Route path="/requests" element={<RequestsPage />} />
                        <Route path="/stats" element={<StatsPage />} />
                    </Routes>
                </App>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
