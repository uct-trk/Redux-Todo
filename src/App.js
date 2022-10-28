import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AppContent } from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import style from './styles/modules/app.module.scss'

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>Todo List</PageTitle> 
        <div className={style.app__wrapper}>
          <AppHeader/>
        <AppContent/>
        </div>
      </div>
      <Toaster position='bottom-right' toastOptions={{
        style: {
          fontSize: '1.4rem'
        }
      }}/>
    </>
  );
}

export default App;
