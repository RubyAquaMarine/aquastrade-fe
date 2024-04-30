## css

- remove font-size: px
- remove margins with px
- - basically remove all px unless its a specific component sized for all devices
- - columns, heading, etc , use em, rem, , VW VH, and % instead of px

## Toast

Update: I forgot the `containerId` : string or number within the `const toastId  = toast.info()` || `toast.isActive(toastId); `

- technically there should only be one <ToastContainer> within the whole project.
- - right now, I tried to use the containerID for each page , and components would share that one containerID such as `<ToastContainer containerId={"TokenApprove"} /> ` : add an ID to toast notify and with `if(!toast.isActive("TokenApprove"))` send alert , but that didn't work
- - Not using `containerId`

# useAMMRouter

# wagmi updated

- https://www.npmjs.com/package/wagmi/v/2.5.20

# NextJS API

- a button on the airdrop page that fetches the data from the api

/src/app/api/route.ts
