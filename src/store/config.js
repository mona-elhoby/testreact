
// const userToken = localStorage.getItem('userInfo')
// ? JSON.parse(localStorage?.getItem('userInfo'))
// : null

// export const api_url = "http://192.168.55.254:3000/api";
export const api_url = "http://vlaw.thefuturevision.com:3000/api";

export const token = null;

// export const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhYmFzZSI6MSwidXNlciI6MSwiY29tcGFueSI6eyJDT01fSURfUEsiOjEyLCJDT01fTkFNRSI6Iti02LHZg9ipINin2YTYsdik2YrYpyDYp9mE2YXYs9iq2YLYqNmE2YrYqSDZhNij2YbYuNmF2Kkg2KfZhNmD2YXYqNmK2YjYqtixINmI2KfZhNi02KjZg9in2KoiLCJDT01fVVNFUk5BTUUiOiJGdXR1cmVWaXNpb24ifSwiaWF0IjoxNjYxMzM5MDUyLCJleHAiOjE2NjMwNjcwNTJ9.S8gqQRomDLQvRO2zqS6gdPyhX87OKOwLFca3H_AnL6w'

export const axiosConfig = {
        'Content-Type': 'application/json',
        Authorization: token,
};

// remove duplicate object in array workChart.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i)

 