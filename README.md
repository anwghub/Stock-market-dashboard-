## StockFlow (Stock-Market-Dashboard)

### Live Demo
Check out the live version of StockFlow [here](https://stock-flow-final.vercel.app).

### Screenshot
![image alt](https://github.com/anwghub/StockFlow/blob/0434c5511cb2aab1644105ef9c756f581bae0993/screenshots.jpg)

### Development Approach
I followed a **modular and iterative approach** for building the StockFlow application. The project was divided into independent modules:  

- **Backend** (FastAPI) for handling data fetching and predictions  
- **Frontend** (React + Vite) for the user interface  
- **Service Layer** (Axios) for API communication  

This separation allowed me to work on each part independently and update them without affecting the rest of the system. Development was done in **small, manageable iterations**—starting with a minimal working version to fetch and display stock data, then gradually adding:  

- Next day stock prediction features(Using RandomForestRegressor Algorithm) 
- Dynamic sidebar  
- Chart visualizations  
- Chatbot button (it will redirect you to the prediction page for individual companies) 

I tested and refined each iteration before moving on to the next, which helped keep the app stable and ensured everything worked together smoothly.

### Technologies Used

**Backend:** FastAPI (Python), Uvicorn, yfinance (for stock data), scikit-learn (for predictions)  
**Frontend:** React, Vite, Tailwind CSS, Chart.js  
**Deployment:** Backend on Render, Frontend on Vercel  
**API Communication:** Axios for HTTP requests  

### Challenges Encountered
- Ensuring smooth data flow between backend and frontend, especially when handling prediction results alongside historical data in charts.  
- Managing **CORS policies** when connecting the deployed frontend with the backend, which required proper configuration.  
- Asset management issues during deployment (e.g., missing images in build), resolved by verifying file paths and imports.  
- Aligning **date formats** for chart rendering to ensure accurate plotting.
- Theme integration issues: I initially planned to use DaisyUI’s “cupcake” and “coffee” themes for automatic light/dark mode. However, due to a configuration conflict, the themes weren’t applied correctly. As a temporary solution, I kept the default Tailwind styles and documented this for future refinement.


**Note**: The prices shown are in the currency used by the stock’s main exchange. This could be USD, INR, EUR, or something else, depending on the stock. If you need to know the exact currency, you can get it from the ticker’s metadata in yfinance.

