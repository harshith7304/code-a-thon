// import React from 'react';
// import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
// import { useSelector } from 'react-redux';
// import img1 from 'src/assets/images/profile/user-1.jpg';
// import { IconPower } from '@tabler/icons';
// import {Link} from "react-router-dom";

// export const Profile = () => {
//   const customizer = useSelector((state) => state.customizer);
//   const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
//   const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
//   return (
//     <Box
//       display={'flex'}
//       alignItems="center"
//       gap={2}
//       sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
//     >
//       {!hideMenu ? (
//         <>
//           <Avatar alt="Remy Sharp" src={img1} />

//           <Box>
//             <Typography variant="h6"  color="textPrimary">Mathew</Typography>
//             <Typography variant="caption" color="textSecondary">Designer</Typography>
//           </Box>
//           <Box sx={{ ml: 'auto' }}>
//             <Tooltip title="Logout" placement="top">
//               <IconButton color="primary" component={Link} to="/admin/login" aria-label="logout" size="small">
//                 <IconPower size="20" />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </>
//       ) : (
//         ''
//       )}
//     </Box>
//   );
// };
// src/layouts/full/vertical/sidebar/SidebarProfile/Profile.js

import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons';
import useLogout from 'src/hooks/useLogout'; 

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const handleLogout = useLogout();

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />

          <Box>
            <Typography variant="h6" color="textPrimary">Ebani</Typography>
            <Typography variant="caption" color="textSecondary">Admin</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" onClick={handleLogout} aria-label="logout" size="small">
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
