// import dynamic from 'next/dynamic'

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../components/hello3'),
//   { ssr: false }
// )
export const storeUser = (data: any) => {
  if (!data) return;
  else return localStorage.setItem("charityUser", JSON.stringify(data));
};

export const checkUser = () => {
  let value = localStorage.getItem("charityUser");
  if (value) {
    return JSON.parse(value);
  } else return null;
};
export const removeUser = () => {
  return localStorage.removeItem("charityUser");
};
