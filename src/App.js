import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/slice/CounterSlice'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Toaster } from 'react-hot-toast';
import ProfileScreen from './screens/ProfileScreen';
import ProductScreen from './screens/ProductScreen';
import OrderScreen from './screens/OrderScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CouponScreen from './screens/CouponScreen';
import ManageCategoryScreen from './screens/ManageCategoryScreen';
import ManageSubCategoryScreen from './screens/ManageSubCategoryScreen';
import ManageProductScreen from './screens/ManageProductScreen';
import ChatScreen from './screens/ChatScreen';

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <BrowserRouter>
        <Toaster />
      <Routes>
        <Route path="/">
          <Route index element={<HomeScreen />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="products" element={<ProductScreen />} />
          <Route path="order" element={<OrderScreen />} />
          <Route path="productDetail" element={<ProductDetailScreen />} />
          <Route path="cart" element={<CartScreen />} />
          <Route path="manageCoupon" element={<CouponScreen />} />
          <Route path="manageCategory" element={<ManageCategoryScreen />} />
          <Route path="manageSubCategory" element={<ManageSubCategoryScreen />} />
          <Route path="manageProduct" element={<ManageProductScreen />} />
          <Route path="chat" element={<ChatScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
