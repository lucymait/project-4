// import React, { useState, useEffect } from 'react'
// import ReactDOM from 'react-dom'
// import 'bulma'

// const Borough = () => {
//   const [data, setData] = useState([])

//   useEffect(() => {
//     fetch('/api/fitness/borough')
//       .then(resp => resp.json())
//       .then(resp => setData(resp))
//   }, [])

//   return <>
//     <section className="section">
//       <h1 className="title">Pick a Borough</h1>
//       <div className="container">
//         <div className="columns is-multiline">
//           {data.map((borough) => {
//             return <div className="column is-one-third" key={borough.id}>
//               <div className="card">
//                 <div className="card-content">
//                   <h2 className="subtitle">{borough.name}</h2>
//                 </div>
//                 <div className="card-image">
//                   <figure className="card-image is-3by3">
//                     <img src={borough.image} className="borough-image"></img>
//                   </figure>
//                 </div>
//               </div>
//             </div>
//           })}
//         </div>
//       </div>
//     </section>
//   </>


// }

// export default Borough