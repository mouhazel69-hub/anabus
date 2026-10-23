import { Navigate, Route, Routes } from 'react-router-dom';
import Design from './ecrans/Design';

// Les routes de l'application. Les écrans arrivent étape par étape.
export default function App() {
  return (
    <Routes>
      <Route path="/design" element={<Design />} />
      <Route path="*" element={<Navigate to="/design" replace />} />
    </Routes>
  );
}
