let URL_BACKEND = "";

if (process.env.NODE_ENV !== 'production') {
    URL_BACKEND = "http://localhost:3002"
}else{
    URL_BACKEND = "https://salaxer-1cea4.uc.r.appspot.com";
}
export default URL_BACKEND;