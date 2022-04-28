import Header from './components/Header';
import Body from './components/Body'
import Breadcrumbs from './components/Breadcrumbs';

function App() {
  return (
    <div className="flex flex-col min-h-screen font-medium">
      <Header />
      <main className="flex-grow bg-image-pattern bg-cover">
        <Breadcrumbs />
        <div className="container pt-20">
          <div className="max-w-3xl mx-auto">
            <Body />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
