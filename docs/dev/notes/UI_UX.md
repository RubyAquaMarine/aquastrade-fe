# UI

- https://ui.shadcn.com/
- - https://www.npmjs.com/package/tailwind-merge
- - https://www.npmjs.com/package/class-variance-authority
- - yarn add cmdk
- - yarn add @tanstack/react-table

- https://www.framer.com/motion/three-introduction/

- use this for the different Order types on the Perps page : https://ui.shadcn.com/docs/components/drawer

# UX : spinning buttons

```
 <span className={styles.spinner_padding}>
                      {isConnecting ? (
                        <span>
                          {" "}
                          {<FaSpinner className={styles.spinner_icon} />}
                        </span>
                      ) : (
                        <span> </span>
                      )}
                    </span>

```

# MUI

https://mui.com/material-ui/getting-started/installation/

Icons

https://mui.com/material-ui/material-icons/

- 24x24px viewport
- add to imoprt name
  `Outlined, Rounded, Two-tone, and Sharp`

nav bar - https://mui.com/material-ui/react-app-bar/#elevate-app-bar

back to top - https://mui.com/material-ui/react-app-bar/#back-to-top

dashboard - https://mui.com/material-ui/react-card/#complex-interaction

menu - import LegendToggleOutlinedIcon from '@mui/icons-material/LegendToggleOutlined';

flip - import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

email - import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';

gear - import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

- color
  `<HomeIcon sx={{ color: pink[500] }} />`

- font
  `<HomeIcon fontSize="large" />
<HomeIcon sx={{ fontSize: 40 }} />`
