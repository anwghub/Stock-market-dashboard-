// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import StockChart from "../components/StockChart";
// import BotButton from "../components/BotButton";
// import { getCompanies, getStockData } from "../services/stockService";

// export default function Dashboard() {
//   const [companies, setCompanies] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [stockPayload, setStockPayload] = useState({ data: [] });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getCompanies().then((data) => {
//       setCompanies(data);
//       if (data.length) setSelected(data[0].symbol);
//     });
//   }, []);

//   useEffect(() => {
//     if (!selected) return;
//     setLoading(true);
//     getStockData(selected, "6mo", "1d")
//       .then((res) => setStockPayload(res))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [selected]);

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="flex">
//         <aside className="w-72 bg-purple-900 text-white">
//           <Sidebar companies={companies} selectedSymbol={selected} onSelect={setSelected} />
//         </aside>

//         <main className="flex-1 p-6">
//           <div className="bg-white rounded-xl shadow p-4">
//             {loading ? (
//               <div className="py-20 text-center">Loading...</div>
//             ) : (
//               <>
//                 <div className="mb-4">
//                   <h2 className="text-xl font-bold">{selected}</h2>
//                   <div className="text-sm opacity-70">Showing recent daily closes</div>
//                 </div>
//                 <StockChart data={stockPayload.data} symbol={selected} />
//               </>
//             )}
//           </div>
//         </main>
//       </div>

//       <BotButton symbol={selected} />
//     </div>
//   );
// }
