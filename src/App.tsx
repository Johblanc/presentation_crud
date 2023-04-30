
import './App.css';
import { ProduitsProvider } from './Contexts/ProduitsProvider';
import { ProduitsSelect } from './Produits/components/ProduitsSelect';



function App() {
  return (
    
  <ProduitsProvider>
    <ProduitsSelect/>
  </ProduitsProvider>
  );
}

export default App;
