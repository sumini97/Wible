import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./router/main/Home/Home";
import Login from "./router/user/Login";
import SignupContainer from "./router/user/SignupContainer";
import Search from "./router/main/Search/Search";
import Detail from "./router/wine/Detail";
import Survey from "./router/survey/Survey";
import SurveyResult from "./router/survey/SurveyResult";
import MyPage from "./router/user/MyPage/index";
import UserReview from "./router/user/MyPage/UserReview";
import UserInfo from "./router/user/MyPage/UserInfo";
import UserLike from "./router/user/MyPage/UserLike";
import FoodSearch from "./router/main/FoodSearch/FoodSearch";
import WineInfo from "./router/main/Info/WineInfo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts/login" element={<Login />} />
          <Route path="/accounts/signup" element={<SignupContainer />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route index element={<UserReview />} />
            <Route path="like" />
            <Route path="userInfo" />
          </Route>
          <Route path="/foodSearch" element={<FoodSearch />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:wineSeq" element={<Detail />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey/result" element={<SurveyResult />} />
          <Route path="/wineinfo" element={<WineInfo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
