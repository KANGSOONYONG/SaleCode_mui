import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Navigator';
import Content from './Content';
import Header from './Header';
import Home from './Home';
import CodeDetail from './CodeDetail';
import LoginPage from './LoginPage';
import Signup from './Signup';
import CreateList from './CreateList';

import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Paperbase() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/youtuber/:youtuber" element={<Home onDrawerToggle={handleDrawerToggle} />} />
              <Route path="/createList/:youtuber" element={<CreateList />} />
              <Route path="/login" element={<LoginPage onDrawerToggle={handleDrawerToggle} />} />
              <Route path="/signup" element={<Signup onDrawerToggle={handleDrawerToggle} />}  />
            </Routes>
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
          <CodeDetail />
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    </BrowserRouter> 
  );
}



// -----------------------------------------------------
// import React, { Component }  from 'react';
// // import Header from './component/Header';
// // import Youtuber from './component/Youtuber';
// // import CodeDetail from './component/CodeDetail';
// // import GlobalStyle from './style/GlobalStyle'
// import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom'

// // import EmptyPage from './component/EmptyPage';
// // import Footer from './component/Footer';
// // import CreateYoutuber from './component/CreateYoutuber';
// // import CreateList from './component/CreateList';
// // import LoginPage from './component/LoginPage';
// // import Signup from './component/Signup';
// import Header from './component/Header';
// import Home from './component/Home';
// import Content from './component/Content';
// import Navigator from './component/Navigator';
// import Paperbase from './component/Paperbase';
// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//           {/* <GlobalStyle /> */}
//           <Paperbase />
//             {/* <Route path="youtuber" element={<CodeDetail />}>
//               <Route path=":youtuber" element={<CodeDetail />} />
//             </Route> */}

//             {/* <Route path="/youtuber/:youtuber" element={<CodeDetail />} />
//             <Route path="/createYoutuber" element={<CreateYoutuber/>} />
//             <Route path="/createList/:youtuber" element={<CreateList />}  />
//             <Route path="/login" element={<LoginPage />}  />
//             <Route path="/signup" element={<Signup />}  />
//             <Route path="" element={(
//               <Outlet />
//                 )}>
//               <Route element={<EmptyPage />} />
//             </Route>
//           <Footer /> */}
//       </div>
//      </BrowserRouter> 
//   );
// }

// export default App;
