import React from 'react';
// import Header from './component/Header';
// import Youtuber from './component/Youtuber';
// import CodeDetail from './component/CodeDetail';
// import GlobalStyle from './style/GlobalStyle'
// import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom'

// import EmptyPage from './component/EmptyPage';
// import Footer from './component/Footer';
// import CreateYoutuber from './component/CreateYoutuber';
// import CreateList from './component/CreateList';
// import LoginPage from './component/LoginPage';
// import Signup from './component/Signup';
// import Header from './component/Header';
// import Home from './component/Home';
// import Content from './component/Content';
// import Navigator from './component/Navigator';
import Paperbase from './component/Paperbase';

function App() {
  return (
      <div className="App">
          <Paperbase />
          {/* <Routes>
            <Route path="/youtuber/:youtuber" element={<CodeDetail />} />
          </Routes> */}
            {/* <Route path="youtuber" element={<CodeDetail />}>
              <Route path=":youtuber" element={<CodeDetail />} />
            </Route> */}

            {/* <Route path="/youtuber/:youtuber" element={<CodeDetail />} />
            <Route path="/createYoutuber" element={<CreateYoutuber/>} />
            <Route path="/createList/:youtuber" element={<CreateList />}  />
            <Route path="/login" element={<LoginPage />}  />
            <Route path="/signup" element={<Signup />}  />
            <Route path="" element={(
              <Outlet />
                )}>
              <Route element={<EmptyPage />} />
            </Route>
          <Footer /> */}
      </div>
  );
}

export default App;