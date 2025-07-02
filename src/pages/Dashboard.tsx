import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { fetchCryptoData } from '../features/crypto/CryptoSlice';
import { CryptoTable } from '../components/CryptoTable';
//import CryptoTableNew from '../components/CryptoTableNew';
//import StockTable from '../components/StockTable';

export const Dashboard = () => {
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(fetchCryptoData());
    }, [dispatch]);
  
    return (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-900">
        <CryptoTable />
        
        
</div>
    );
  };
