import {BrowserRouter, Route, Routes} from "react-router-dom";

import MainPage from "../src/Pages/ProductPages/MainPage.tsx";
import FavoriteProducts from "@/Pages/ProductPages/FavoriteProducts.tsx";
import MyProfile from "@/Pages/UserPages/MyProfile.tsx";
import Chats from "@/Pages/ChatsPages/Chats.tsx";
import RegistrationPage from "@/Pages/UserPages/RegistrationPage.tsx";
import MyProducts from "@/Pages/ProductPages/MyProducts.tsx";
import AddProduct from "@/Pages/ProductPages/AddProduct.tsx";
import EditProductPage from "@/Pages/ProductPages/EditProductPage.tsx";
import AiService from "@/Pages/Services/AiService.tsx";
import ProductById from "@/Pages/ProductPages/ProductById.tsx";
import SearchPage from "@/Pages/ProductPages/SearchPage.tsx";
import ProductReviewsPage from "@/Pages/ReviewsPages/ProductReviewsPage.tsx";
import UserPage from "@/Pages/UserPages/UserPage.tsx";
import UserReviewsPage from "@/Pages/ReviewsPages/UserReviewsPage.tsx";
import SearchSellersPage from "@/Pages/SellersPages/SearchSellersPage.tsx";
import ChatWithUserPage from "@/Pages/MessengerPages/ChatWithUserPage.tsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            //nav bar routes
            <Route path={"/"} element={<MainPage/>}/>
            <Route path={"/favorites"} element={<FavoriteProducts/>}/>
            <Route path={"/profile"} element={<MyProfile/>}/>
            <Route path={"/chats"} element={<Chats/>}/>
            <Route path={"/ai-service"} element={<AiService/>}/>

            //my products routes
            <Route path={"/my-products"} element={<MyProducts/>}/>
            <Route path={"/my-products/add"} element={<AddProduct/>}/>
            <Route path={"/my-products/edit/:id"} element={<EditProductPage/>}/>

            //product routes
            <Route path={"/product/:id"} element={<ProductById/>}/>
            <Route path={"/search"} element={<SearchPage/>}/>

            //secure routes
            <Route path={"/registration"} element={<RegistrationPage/>}/>

            //reviews routes
            <Route path={"/product/reviews/:id"} element={<ProductReviewsPage/>}/>
            <Route path={"/users/reviews/:email"} element={<UserReviewsPage/>}/>

            //user routes
            <Route path={"/user/:email"} element={<UserPage/>}/>

            //sellers routes
            <Route path={"/search/sellers"} element={<SearchSellersPage/>}/>

            //messenger routes
            <Route path={"/chats/:userEmail"} element={<ChatWithUserPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
