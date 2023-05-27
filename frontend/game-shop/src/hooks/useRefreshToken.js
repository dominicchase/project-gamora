// import { useState } from "react";

// export const useRefreshToken = () => {
//   // TODO: use contxt or redux
//   const [auth, setAuth] = useState();

//   const handleRefresh = async () => {
//     refresh("http://localhost3000:/api/users/refresh")
//       .then((res) => res.json())
//       .then((data) =>
//         setAuth((prevState) => {
//           console.log(JSON.stringify(prevState));
//           console.log(data);
//           return { ...prevState, accessToken: data.accessToken };
//         })
//       );

//     // TODO: return refresh token
//   };

//   return <div>Hi</div>;
// };
